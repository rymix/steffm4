// pages/api/search.ts

import { db, initializeDb } from "db";
import type { Mix } from "db/types";
import Fuse from "fuse.js";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await initializeDb();

  const { query } = req.query;
  if (!query || typeof query !== "string") {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  const mixes: Mix[] = db.data?.mixes || [];

  const mixOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ["name", "category", "tags", "notes"],
  };

  const trackOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ["trackName", "artistName", "remixArtistName", "publisher"],
  };

  const mixFuse = new Fuse(mixes, mixOptions);
  const trackFuse = new Fuse(
    mixes.flatMap((mix) => mix.tracks),
    trackOptions,
  );

  const mixResults = mixFuse.search(query).map((result) => ({
    ...result.item,
    score: result.score,
    matchType: "mix",
  }));

  const trackResults = trackFuse.search(query).map((result) => {
    const parentMix = mixes.find((mix) =>
      mix.tracks.some((track) => track.trackName === result.item.trackName),
    );

    return {
      ...parentMix,
      score: result.score,
      matchType: "track",
      trackMatch: result.item,
    };
  });

  const combinedResults = [...mixResults, ...trackResults].sort(
    (a, b) => a.score - b.score,
  );

  res.status(200).json(combinedResults);
};

export default handler;
