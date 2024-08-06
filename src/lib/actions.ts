"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export const shareMeal = async (formData: FormData) => {
  const meal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
    slug: "",
  };

  await saveMeal(meal);

  redirect("/meals");
};
