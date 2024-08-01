import Image from "next/image";
import Link from "next/link";
import styles from "./main-header.module.css";
import logoImg from "@/assets/logo.png";
import MainHeaderBackground from "../main-header-background/main-header-background";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it." priority />
          NextLevel FOod
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/meals">Browse Meal</Link>
            </li>
            <li>
              <Link href="/community">Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
