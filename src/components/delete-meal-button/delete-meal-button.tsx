"use client";

import styles from "./delete-meal-button.module.css";
import { removeMeal } from "@/lib/actions";

interface DeleteMealButtonProps {
  mealSlug: string;
}

export default function DeleteMealButton({ mealSlug }: DeleteMealButtonProps) {
  return (
    <button className={styles.button} onClick={() => removeMeal(mealSlug)}>
      Delete Meal
    </button>
  );
}
