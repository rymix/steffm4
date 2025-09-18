import { Progress } from "contexts/mixcloud/types";
import { BackgroundCategory, Category, Mix } from "db/types";
import {
  convertTimeToHumanReadable,
  convertTimeToSeconds,
  copyToClipboard,
  countAlphanumeric,
  debounce,
  getBackgroundCategoryObject,
  getCategoryIndex,
  getScaledFontSize,
  isCategoryObject,
  listenedStatus,
  mcKeyFormatter,
  mcKeyUnformatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
  pxToNum,
  removeParentheses,
  removeTextAfterComma,
  replaceSpacesWithNbsp,
  selectCoverArt,
  veryShortName,
} from "utils/functions";

// Mock navigator.clipboard for clipboard tests
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("Time Conversion Functions", () => {
  describe("convertTimeToSeconds", () => {
    it("should convert mm:ss format to seconds", () => {
      expect(convertTimeToSeconds("3:45")).toBe(225);
      expect(convertTimeToSeconds("10:30")).toBe(630);
    });

    it("should convert h:mm:ss format to seconds", () => {
      expect(convertTimeToSeconds("1:30:45")).toBe(5445);
      expect(convertTimeToSeconds("2:00:00")).toBe(7200);
    });

    it("should handle edge cases", () => {
      expect(convertTimeToSeconds("0:00")).toBe(0);
      expect(convertTimeToSeconds("0:01")).toBe(1);
    });
  });

  describe("convertTimeToHumanReadable", () => {
    it("should convert mm:ss format to human readable", () => {
      expect(convertTimeToHumanReadable("3:45")).toBe("3m 45s");
      expect(convertTimeToHumanReadable("10:30")).toBe("10m 30s");
    });

    it("should convert hh:mm:ss format to human readable", () => {
      expect(convertTimeToHumanReadable("1:30:45")).toBe("1h 30m 45s");
      expect(convertTimeToHumanReadable("2:00:00")).toBe("2h 00m 00s");
    });

    it("should use custom delimiter", () => {
      expect(convertTimeToHumanReadable("1:30:45", "-")).toBe("1h-30m-45s");
    });

    it("should return original string for invalid format", () => {
      expect(convertTimeToHumanReadable("invalid")).toBe("invalid");
    });
  });
});

describe("String Utility Functions", () => {
  describe("veryShortName", () => {
    it("should extract part after first dash", () => {
      expect(veryShortName("Artist - Song Title")).toBe("Song Title");
      expect(veryShortName("DJ - Mix - Part 1")).toBe("Mix");
    });

    it("should return original string if no dash", () => {
      expect(veryShortName("No Dash Here")).toBe("No Dash Here");
    });
  });

  describe("removeParentheses", () => {
    it("should remove parentheses and content", () => {
      expect(removeParentheses("Track Name (Remix)")).toBe("Track Name");
      expect(removeParentheses("Song (feat. Artist) Title")).toBe("SongTitle");
    });

    it("should handle multiple parentheses", () => {
      expect(removeParentheses("Track (Remix) (Extended)")).toBe("Track");
    });

    it("should return unchanged if no parentheses", () => {
      expect(removeParentheses("Clean Title")).toBe("Clean Title");
    });
  });

  describe("removeTextAfterComma", () => {
    it("should remove text after first comma", () => {
      expect(removeTextAfterComma("Artist, feat. Someone")).toBe("Artist");
      expect(removeTextAfterComma("Title, Extended Mix")).toBe("Title");
    });

    it("should return unchanged if no comma", () => {
      expect(removeTextAfterComma("No Comma")).toBe("No Comma");
    });
  });

  describe("countAlphanumeric", () => {
    it("should count alphanumeric characters", () => {
      expect(countAlphanumeric("Hello World 123")).toBe(13);
      expect(countAlphanumeric("Test!@#$123")).toBe(7);
    });

    it("should handle special characters", () => {
      expect(countAlphanumeric("!@#$%^&*()")).toBe(0);
    });
  });

  describe("replaceSpacesWithNbsp", () => {
    it("should replace spaces with non-breaking spaces", () => {
      expect(replaceSpacesWithNbsp("Hello World")).toBe("Hello\u00A0World");
    });
  });
});

describe("Mixcloud Functions", () => {
  describe("mcKeyFormatter", () => {
    it("should format mcKey with rymixxx prefix", () => {
      expect(mcKeyFormatter("test-mix")).toBe("/rymixxx/test-mix/");
      expect(mcKeyFormatter("/rymixxx/already-formatted/")).toBe(
        "/rymixxx/already-formatted/",
      );
    });
  });

  describe("mcKeyUnformatter", () => {
    it("should remove rymixxx prefix and slashes", () => {
      expect(mcKeyUnformatter("/rymixxx/test-mix/")).toBe("test-mix");
      expect(mcKeyUnformatter("plain-key")).toBe("plain-key");
    });
  });

  describe("mcKeyUrlFormatter", () => {
    it("should create mixcloud URL", () => {
      expect(mcKeyUrlFormatter("test-mix")).toBe(
        "https://www.mixcloud.com/rymixxx/test-mix/",
      );
    });
  });

  describe("mcWidgetUrlFormatter", () => {
    it("should create widget URL", () => {
      const result = mcWidgetUrlFormatter("test-mix");
      expect(result).toContain(
        "https://player-widget.mixcloud.com/widget/iframe/",
      );
      expect(result).toContain("feed=");
    });
  });
});

describe("Helper Functions", () => {
  describe("debounce", () => {
    jest.useFakeTimers();

    it("should debounce function calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });

  describe("pxToNum", () => {
    it("should convert pixel values to numbers", () => {
      expect(pxToNum("16px")).toBe(16);
      expect(pxToNum("100")).toBe(100);
      expect(pxToNum()).toBe(0);
    });
  });

  describe("isCategoryObject", () => {
    it("should validate category objects", () => {
      expect(isCategoryObject({ code: "test" })).toBe(true);
      expect(isCategoryObject({})).toBe(false);
      expect(isCategoryObject(null)).toBeFalsy();
      expect(isCategoryObject("string")).toBe(false);
    });
  });

  describe("selectCoverArt", () => {
    it("should prefer local over remote", () => {
      expect(selectCoverArt("local.jpg", "remote.jpg")).toBe("local.jpg");
      expect(selectCoverArt("", "remote.jpg")).toBe("remote.jpg");
      expect(selectCoverArt("local.jpg", "")).toBe("local.jpg");
    });
  });

  describe("getBackgroundCategoryObject", () => {
    const categories: BackgroundCategory[] = [
      {
        code: "cat1",
        name: "Category 1",
        folder: "folder1",
        type: "type1",
        order: 1,
      },
      {
        code: "cat2",
        name: "Category 2",
        folder: "folder2",
        type: "type2",
        order: 2,
      },
    ];

    it("should find category by code", () => {
      const result = getBackgroundCategoryObject("cat1", categories);
      expect(result?.name).toBe("Category 1");
    });

    it("should return undefined for non-existent code", () => {
      const result = getBackgroundCategoryObject("nonexistent", categories);
      expect(result).toBeUndefined();
    });
  });

  describe("getScaledFontSize", () => {
    it("should scale font size based on character count", () => {
      expect(getScaledFontSize("ab", 5, 20, 12, 24)).toBe(24); // Below min
      expect(getScaledFontSize("abcdefghijklmnopqrst", 5, 20, 12, 24)).toBe(12); // Above max

      // Test middle range
      const midResult = getScaledFontSize("abcdefghijk", 5, 20, 12, 24);
      expect(midResult).toBeGreaterThan(12);
      expect(midResult).toBeLessThan(24);
    });
  });

  describe("getCategoryIndex", () => {
    const categories: Category[] = [
      {
        index: 1,
        code: "cat1",
        name: "Category 1",
        shortName: "C1",
        x: 0,
        y: 0,
      },
      {
        index: 2,
        code: "cat2",
        name: "Category 2",
        shortName: "C2",
        x: 0,
        y: 0,
      },
    ];

    it("should return category index", () => {
      expect(getCategoryIndex(categories, "cat2")).toBe(2);
    });

    it("should return 1 for non-existent category", () => {
      expect(getCategoryIndex(categories, "nonexistent")).toBe(1);
      expect(getCategoryIndex(categories, null)).toBe(1);
    });
  });
});

describe("listenedStatus", () => {
  const mockMix: Mix = {
    mixcloudKey: "test-mix",
    name: "Test Mix",
    category: "house",
    coverArtDate: "2024-01-01",
    coverArtLarge: "large.jpg",
    coverArtSmall: "small.jpg",
    duration: "60:00",
    fileName: "test.mp3",
    listOrder: 1,
    notes: "Test notes",
    releaseDate: "2024-01-01",
    uploadedDate: "2024-01-01",
    shortName: "Test",
    tags: ["house", "electronic"],
    tracks: [],
  };

  const mockProgress: Progress[] = [
    { mcKey: "test-mix", complete: true, seconds: 3600 },
    {
      mcKey: "partial-mix",
      complete: false,
      seconds: 1800,
    },
  ];

  it("should return 'active' for currently playing mix", () => {
    expect(listenedStatus("test-mix", mockMix, mockProgress)).toBe("active");
  });

  it("should return 'listened' for completed mix", () => {
    expect(listenedStatus("other-mix", mockMix, mockProgress)).toBe("listened");
  });

  it("should return 'partial' for partially listened mix", () => {
    const partialMix = { ...mockMix, mixcloudKey: "partial-mix" };
    expect(listenedStatus("other-mix", partialMix, mockProgress)).toBe(
      "partial",
    );
  });

  it("should return 'unlistened' for new mix", () => {
    const newMix = { ...mockMix, mixcloudKey: "new-mix" };
    expect(listenedStatus("other-mix", newMix, mockProgress)).toBe(
      "unlistened",
    );
  });
});

describe("copyToClipboard", () => {
  it("should use navigator.clipboard when available", async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });
    Object.assign(globalThis, { isSecureContext: true });

    copyToClipboard("test text");

    expect(mockWriteText).toHaveBeenCalledWith("test text");
  });

  it("should fallback to document.execCommand when clipboard not available", () => {
    Object.assign(navigator, { clipboard: undefined });
    const mockExecCommand = jest.fn().mockReturnValue(true);
    Object.assign(document, { execCommand: mockExecCommand });

    // Mock DOM methods
    const mockTextArea = {
      value: "",
      style: {},
      focus: jest.fn(),
      select: jest.fn(),
      remove: jest.fn(),
    };
    jest.spyOn(document, "createElement").mockReturnValue(mockTextArea as any);
    jest.spyOn(document.body, "appendChild").mockImplementation();

    copyToClipboard("test text");

    expect(mockTextArea.value).toBe("test text");
    expect(mockExecCommand).toHaveBeenCalledWith("copy");
  });
});
