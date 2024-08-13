import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");

interface SaveMealProps {
  title: string;
  summary: string;
  instructions: string;
  image: File | string;
  creator: string;
  creator_email: string;
  slug: string;
}

export async function deleteMeal(mealSlug: string) {
  db.prepare("DELETE FROM meals WHERE slug = ?").run(mealSlug);
}

export async function getMeals() {
  return db.prepare("SELECT * FROM meals").all() as MealsItemProps[];
}

export function getMeal(mealSlug: string) {
  return db.prepare("SELECT * FROM meals where slug = ?").get(mealSlug) as MealsItemProps;
}

export async function saveMeal(meal: SaveMealProps) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const path = `images`;

  const fileNameDB = await saveImageInDB(meal.image as File, meal.slug, path);

  meal.image = `/${path}/${fileNameDB}`;

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (
      @title,
      @summary,
      @instructions,
      @image,
      @creator,
      @creator_email,
      @slug
    )`
  ).run(meal);
}

async function saveImageInDB(file: File, fileName: string, path: string) {
  const extension = file.name.split(".").pop();
  const fileNameDB = `${fileName}-${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/${path}/${fileNameDB}`);
  const bufferedImage = await file.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });
  return fileNameDB;
}
