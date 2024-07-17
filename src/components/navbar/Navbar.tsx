import React from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/assets/img/logo.png"
              alt="Algeriescapades"
              width={150}
              height={80}
            />
          </Link>
        </div>
        <div className={styles.iconsContainer}>
          <Link href="/favorites" className={styles.link}>
            <Image
              src="/assets/icons/heart.png"
              alt="Favorites"
              width={30}
              height={30}
              className={styles.icon}
            />
          </Link>
          {session ? (
            <Link href="/profile" className={styles.link}>
              <Image
                src="/assets/icons/user.png"
                alt="Profile"
                width={30}
                height={30}
                className={styles.icon}
              />
            </Link>
          ) : (
            <button className={styles.iconButton} onClick={() => signIn()}>
              <Image
                src="/assets/icons/user.png"
                alt="Login"
                width={30}
                height={30}
                className={styles.icon}
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
