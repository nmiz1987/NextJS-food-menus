import MealsItem from "../meals-item/meals-item";
import styles from "./meals-grid.module.css";

interface MealsGridProps {
  meals: MealsItemProps[];
}
export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal, index) => (
        <li key={meal.id}>
          <MealsItem {...meal} index={index} />
        </li>
      ))}
    </ul>
  );
}
