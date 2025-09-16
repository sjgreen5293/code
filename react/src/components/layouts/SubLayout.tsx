// src/layouts/SubLayout.tsx
import React, { ReactNode } from "react";
import styles from "./SubLayout.module.scss";

interface Props {
  children: ReactNode;
}

export default function SubLayout({ children }: Props) {
  return (
    <div className={styles.box}>
      <aside className={styles.sidebar}>Sub Sidebar</aside>
      <article className={styles.article}>{children}</article>
    </div>
  );
}
