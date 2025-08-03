import { db, initializeDb } from "db";
import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "pages/api/categories";

// Mock the database
jest.mock("db", () => ({
  db: {
    data: {
      categories: [
        {
          index: 1,
          code: "house",
          name: "House",
          shortName: "House",
          x: 0,
          y: 0,
        },
        {
          index: 2,
          code: "techno",
          name: "Techno",
          shortName: "Techno",
          x: 1,
          y: 0,
        },
      ],
    },
  },
  initializeDb: jest.fn(),
}));

const mockInitializeDb = initializeDb as jest.MockedFunction<
  typeof initializeDb
>;

describe("/api/categories", () => {
  beforeEach(() => {
    mockInitializeDb.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return categories successfully", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(mockInitializeDb).toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(200);

    const jsonData = JSON.parse(res._getData());
    expect(jsonData).toEqual([
      {
        index: 1,
        code: "house",
        name: "House",
        shortName: "House",
        x: 0,
        y: 0,
      },
      {
        index: 2,
        code: "techno",
        name: "Techno",
        shortName: "Techno",
        x: 1,
        y: 0,
      },
    ]);
  });

  it("should return empty array when no categories exist", async () => {
    // Mock empty categories
    (db as any).data = { categories: [] };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const jsonData = JSON.parse(res._getData());
    expect(jsonData).toEqual([]);
  });

  it("should handle missing data gracefully", async () => {
    // Mock null data
    (db as any).data = null;

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const jsonData = JSON.parse(res._getData());
    expect(jsonData).toEqual([]);
  });

  it("should handle database initialization errors", async () => {
    mockInitializeDb.mockRejectedValue(new Error("DB initialization failed"));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await expect(handler(req, res)).rejects.toThrow("DB initialization failed");
  });
});
