import { Button } from "@common";

import styles from "./Modal.module.scss";

export const Modal = ({ onLogout }: any) => (
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
