// pages/api/mixes.ts

import { db, initializeDb } from "db";
import type { Category, Mix, TransformedMix } from "db/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { category, name, notes, tags, date } = req.query;

  const filteredMixes: Mix[] = db.data?.mixes || [];

  const transformedMixes: TransformedMix[] = filteredMixes.map((mix) => {
    const categoryDetail: Category | undefined = db.data?.categories.find(
      (c) => c.code === mix.category,
    );
    const fallbackCategory: Category = {
      index: 5,
      code: "all",
      name: "All",
      shortName: "ALL",
      x: 103,
      y: 72,
    };
    return {
      ...mix,
      category: categoryDetail ?? fallbackCategory,
    };
  });

  let finalMixes = transformedMixes;

  if (typeof category === "string") {
    finalMixes = finalMixes.filter((mix) => mix.category.code === category);
  }

  if (typeof name === "string") {
    finalMixes = finalMixes.filter((mix) =>
      mix.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (typeof notes === "string") {
    finalMixes = finalMixes.filter(
      (mix) =>
        mix.notes && mix.notes.toLowerCase().includes(notes.toLowerCase()),
    );
  }

  if (typeof tags === "string") {
    finalMixes = finalMixes.filter((mix) => mix.tags.includes(tags));
  }

  if (typeof date === "string") {
    const dateParts = date.split("-");
    const filterYear = Number.parseInt(dateParts[0], 10);
    const filterMonth = Number.parseInt(dateParts[1], 10);

    finalMixes = finalMixes.filter((mix) => {
      const releaseDate = /^\d{2}/.test(mix.releaseDate)
        ? new Date(mix.releaseDate)
        : new Date(`01 ${mix.releaseDate}`);

      return (
        releaseDate.getFullYear() === filterYear &&
        releaseDate.getMonth() === filterMonth
      );
    });
  }

  finalMixes = finalMixes.sort((a: any, b: any) => a.listOrder - b.listOrder);

  res.status(200).json(finalMixes);
}
