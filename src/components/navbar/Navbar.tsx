import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/img/logo.png"
            alt="Algeriescapades"
            layout="fill"
          />
        </Link>
        <div className={styles.icons}>
          {session ? (
            <>
              <Link href="/profile" className={styles.link}>
                <Image
                  src="/assets/icons/user.png"
                  alt="Profile"
                  layout="fill"
                  className={styles.icon}
                />
              </Link>
              <button className={styles.iconButton} onClick={() => signOut()}>
                <Image
                  src="/assets/icons/heart.png"
                  alt="Logout"
                  layout="fill"
                  className={styles.icon}
                />
              </button>
            </>
          ) : (
            <button
              className={styles.iconButton}
              onClick={() => signIn("facebook")}
            >
              <Image
                src="/assets/icons/user.png"
                alt="Login with Facebook"
                layout="fill"
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
