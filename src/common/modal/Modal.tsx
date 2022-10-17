import { useRef } from "react";

import { Button } from "@common/buttons";

import styles from "./Modal.module.scss";

export const Modal = ({ onLogout }: any) => {
  console.log("modal");
  return (
    <div className={styles.modal}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <Button variant="text" onClick={onLogout}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};
