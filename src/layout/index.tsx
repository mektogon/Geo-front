import React from "react";

import { Header } from "@components";

import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.container}>
    <Header />
    {children}
  </div>
);
