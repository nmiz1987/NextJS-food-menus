import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all() as MealsItemProps[];
}

export function getMeal(mealSlug: string) {
  return db.prepare("SELECT * FROM meals where slug = ?").get(mealSlug) as MealsItemProps;
}
