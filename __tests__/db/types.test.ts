import type {
  Background,
  BackgroundCategory,
  Category,
  Mix,
  Track,
} from "db/types";

describe("Database Types", () => {
  describe("Track type", () => {
    it("should have required properties", () => {
      const track: Track = {
        artistName: "Test Artist",
        coverArtDate: "2024-01-01",
        coverArtLarge: "large.jpg",
        coverArtSmall: "small.jpg",
        localCoverArtLarge: "local-large.jpg",
        localCoverArtSmall: "local-small.jpg",
        publisher: "Test Publisher",
        sectionNumber: 1,
        startTime: "00:30",
        trackName: "Test Track",
      };

      expect(track.artistName).toBe("Test Artist");
      expect(track.sectionNumber).toBe(1);
      expect(track.trackName).toBe("Test Track");
    });

    it("should allow optional remixArtistName", () => {
      const track: Track = {
        artistName: "Test Artist",
        coverArtDate: "2024-01-01",
        coverArtLarge: "large.jpg",
        coverArtSmall: "small.jpg",
        localCoverArtLarge: "local-large.jpg",
        localCoverArtSmall: "local-small.jpg",
        publisher: "Test Publisher",
        sectionNumber: 1,
        startTime: "00:30",
        trackName: "Test Track",
        remixArtistName: "Remix Artist",
      };

      expect(track.remixArtistName).toBe("Remix Artist");
    });
  });

  describe("Category type", () => {
    it("should have required properties", () => {
      const category: Category = {
        index: 1,
        code: "house",
        name: "House Music",
        shortName: "House",
        x: 0,
        y: 0,
      };

      expect(category.code).toBe("house");
      expect(category.name).toBe("House Music");
      expect(category.index).toBe(1);
    });
  });

  describe("Mix type", () => {
    it("should have required properties", () => {
      const mix: Mix = {
        category: "house",
        coverArtDate: "2024-01-01",
        coverArtLarge: "large.jpg",
        coverArtSmall: "small.jpg",
        duration: "60:00",
        fileName: "test.mp3",
        listOrder: 1,
        mixcloudKey: "test-mix",
        name: "Test Mix",
        releaseDate: "2024-01-01",
        uploadedDate: "2024-01-01",
        shortName: "Test",
        tags: ["house", "electronic"],
        tracks: [],
      };

      expect(mix.name).toBe("Test Mix");
      expect(mix.category).toBe("house");
      expect(mix.tags).toEqual(["house", "electronic"]);
      expect(mix.tracks).toEqual([]);
    });

    it("should allow optional notes", () => {
      const mix: Mix = {
        category: "house",
        coverArtDate: "2024-01-01",
        coverArtLarge: "large.jpg",
        coverArtSmall: "small.jpg",
        duration: "60:00",
        fileName: "test.mp3",
        listOrder: 1,
        mixcloudKey: "test-mix",
        name: "Test Mix",
        notes: "Test notes",
        releaseDate: "2024-01-01",
        uploadedDate: "2024-01-01",
        shortName: "Test",
        tags: ["house"],
        tracks: [],
      };

      expect(mix.notes).toBe("Test notes");
    });
  });

  describe("BackgroundCategory type", () => {
    it("should have required properties", () => {
      const bgCategory: BackgroundCategory = {
        code: "retro",
        name: "Retro",
        folder: "retro-folder",
        type: "image",
        order: 1,
      };

      expect(bgCategory.code).toBe("retro");
      expect(bgCategory.name).toBe("Retro");
      expect(bgCategory.order).toBe(1);
    });
  });

  describe("Background type", () => {
    it("should have required properties", () => {
      const background: Background = {
        backgroundCategory: "retro",
        name: "Retro Background",
        fileName: "retro.jpg",
        tileType: "repeat",
        width: 1920,
        height: 1080,
      };

      expect(background.name).toBe("Retro Background");
      expect(background.width).toBe(1920);
      expect(background.height).toBe(1080);
    });
  });
});
