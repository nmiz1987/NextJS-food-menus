import MealsItem from "../meals-item/meals-item";
import styles from "./meals-grid.module.css";

interface MealsGridProps {
  meals: MealsItemProps[];
}
export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealsItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
