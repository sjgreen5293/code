// src/layouts/MainLayout.tsx
import React, { ReactNode } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import styles from "@/styles/scss/1_layout/MainLayout.module.scss";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
}
