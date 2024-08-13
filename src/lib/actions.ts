"use server";

import { redirect } from "next/navigation";
import { deleteMeal, saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
import { mealSchema } from "@/validations/mealSchema";

export const removeMeal = async (mealSlug: string) => {
  await deleteMeal(mealSlug);
  revalidatePath("/meals");
  redirect("/meals");
};

export const shareMeal = async (prevState: { message: string }, formData: FormData) => {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    slug: "",
  };

  const result = mealSchema.safeParse(meal);

  if (!result.success) {
    return {
      message: "Invalid input. Please check your input and try again.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
};
