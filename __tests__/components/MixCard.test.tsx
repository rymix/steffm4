import { render, screen } from "@testing-library/react";
import { MixCard } from "components/MixCard";
import { useMixcloud } from "contexts/mixcloud";

// Mock the context
jest.mock("contexts/mixcloud", () => ({
  useMixcloud: jest.fn(),
}));

// Mock child components
jest.mock("components/Download", () => {
  return function MockDownload() {
    return <div data-testid="download-component">Download</div>;
  };
});

jest.mock("components/Favourite", () => {
  return function MockFavourite() {
    return <div data-testid="favourite-component">Favourite</div>;
  };
});

jest.mock("components/Share", () => {
  return function MockShare() {
    return <div data-testid="share-component">Share</div>;
  };
});

const mockMixDetails = {
  name: "Test Mix Name",
  coverArtLarge: "test-cover-large.jpg",
  duration: "1:30:45",
  releaseDate: "2024-01-15",
  uploadedDate: "2024-01-20",
  notes: "This is a test mix with some notes",
  tags: ["house", "electronic", "deep"],
  category: "house",
  coverArtDate: "2024-01-01",
  coverArtSmall: "test-cover-small.jpg",
  fileName: "test-mix.mp3",
  listOrder: 1,
  mixcloudKey: "test-mix-key",
  shortName: "Test Mix",
  tracks: [],
};

const mockUseMixcloud = useMixcloud as jest.MockedFunction<typeof useMixcloud>;

describe("MixCard Component", () => {
  beforeEach(() => {
    mockUseMixcloud.mockReturnValue({
      mix: {
        categoryName: "House Music",
        details: mockMixDetails,
      },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render mix details correctly", () => {
    render(<MixCard />);

    expect(screen.getByText("Test Mix Name")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test mix with some notes"),
    ).toBeInTheDocument();
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
    expect(screen.getByText("1h 30m 45s")).toBeInTheDocument();
  });

  it("should render cover art with correct alt text", () => {
    render(<MixCard />);

    const coverImage = screen.getByAltText("Test Mix Name");
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute("src", "test-cover-large.jpg");
  });

  it("should render tags correctly", () => {
    render(<MixCard />);

    expect(screen.getByText("#house")).toBeInTheDocument();
    expect(screen.getByText("#electronic")).toBeInTheDocument();
    expect(screen.getByText("#deep")).toBeInTheDocument();
  });

  it("should render category when category prop is true", () => {
    render(<MixCard category />);

    expect(screen.getByText("House Music")).toBeInTheDocument();
  });

  it("should not render category when category prop is false", () => {
    render(<MixCard category={false} />);

    expect(screen.queryByText("House Music")).not.toBeInTheDocument();
  });

  it("should render uploaded date", () => {
    render(<MixCard />);

    expect(screen.getByText("Uploaded on 2024-01-20")).toBeInTheDocument();
  });

  it("should render interaction components", () => {
    render(<MixCard />);

    expect(screen.getByTestId("download-component")).toBeInTheDocument();
    expect(screen.getByTestId("favourite-component")).toBeInTheDocument();
    expect(screen.getByTestId("share-component")).toBeInTheDocument();
  });

  it("should show loading state when mix details are not available", () => {
    mockUseMixcloud.mockReturnValue({
      mix: {
        categoryName: "House Music",
        details: null,
      },
    } as any);

    render(<MixCard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should not render cover art when coverArtLarge is not provided", () => {
    mockUseMixcloud.mockReturnValue({
      mix: {
        categoryName: "House Music",
        details: {
          ...mockMixDetails,
          coverArtLarge: "",
        },
      },
    } as any);

    render(<MixCard />);

    expect(screen.queryByAltText("Test Mix Name")).not.toBeInTheDocument();
  });

  it("should handle empty tags array", () => {
    mockUseMixcloud.mockReturnValue({
      mix: {
        categoryName: "House Music",
        details: {
          ...mockMixDetails,
          tags: [],
        },
      },
    } as any);

    render(<MixCard />);

    // Should still render the component without tags
    expect(screen.getByText("Test Mix Name")).toBeInTheDocument();
    expect(screen.queryByText("#house")).not.toBeInTheDocument();
  });

  it("should handle missing notes", () => {
    mockUseMixcloud.mockReturnValue({
      mix: {
        categoryName: "House Music",
        details: {
          ...mockMixDetails,
          notes: "",
        },
      },
    } as any);

    render(<MixCard />);

    expect(screen.getByText("Test Mix Name")).toBeInTheDocument();
    expect(
      screen.queryByText("This is a test mix with some notes"),
    ).not.toBeInTheDocument();
  });
});
