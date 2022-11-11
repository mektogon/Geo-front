import { ProgressBar } from "react-loader-spinner";

import styles from "./Spinner.module.scss";

export const Spinner = () => (
  <ProgressBar
    height="160"
    width="160"
    ariaLabel="loading"
    wrapperClass={styles.spinner}
    borderColor="#51E5FF"
    barColor="#51E5FF"
  />
);
