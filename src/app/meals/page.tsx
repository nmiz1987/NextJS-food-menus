import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our community.",
};

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

export default function MealPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created <span className={styles.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <section className={styles.main}>
        <Suspense fallback={<div className={styles.loading}>Fetching meals...</div>}>
          <Meals />
        </Suspense>
      </section>
    </>
  );
}
