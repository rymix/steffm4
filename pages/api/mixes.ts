// pages/api/mixes.ts

import { db, initializeDb } from "db";
import type { Category, Mix } from "db/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { category, name, notes, tags, date } = req.query;

  let filteredMixes: Mix[] = db.data?.mixes || [];

  filteredMixes = filteredMixes.map((mix) => {
    const categoryDetail: Category | undefined = db.data?.categories.find(
      (c) => c.code === mix.category.toString(),
    );
    const fallbackCategory: Category = {
      code: "special",
      name: "Special",
    };
    return {
      ...mix,
      category: categoryDetail ?? fallbackCategory,
    };
  });

  if (typeof category === "string") {
    filteredMixes = filteredMixes.filter(
      (mix) => mix.category.code === category,
    );
  }

  if (typeof name === "string") {
    filteredMixes = filteredMixes.filter((mix) =>
      mix.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (typeof notes === "string") {
    filteredMixes = filteredMixes.filter(
      (mix) =>
        mix.notes && mix.notes.toLowerCase().includes(notes.toLowerCase()),
    );
  }

  if (typeof tags === "string") {
    filteredMixes = filteredMixes.filter((mix) => mix.tags.includes(tags));
  }

  if (typeof date === "string") {
    const dateParts = date.split("-");
    const filterYear = Number.parseInt(dateParts[0], 10);
    const filterMonth = Number.parseInt(dateParts[1], 10);

    filteredMixes = filteredMixes.filter((mix) => {
      const releaseDate = /^\d{2}/.test(mix.releaseDate)
        ? new Date(mix.releaseDate)
        : new Date(`01 ${mix.releaseDate}`);

      return (
        releaseDate.getFullYear() === filterYear &&
        releaseDate.getMonth() === filterMonth
      );
    });
  }

  res.status(200).json(filteredMixes);
}
