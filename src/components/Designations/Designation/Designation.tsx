import React from "react";

import { Tooltip } from "@common";

import { IDesignation } from "../../../features/designations/designations.types";

import styles from "./Designation.module.scss";

export const Designation = ({ name, url }: IDesignation) => (
  <div className={styles.designation}>
    <Tooltip behavior="hover" content={name} placement="top">
      <div className={styles.img_container}>
        <img src={url} alt="designation" className={styles.img} />
      </div>
    </Tooltip>
    <h2 className={styles.name}>{name}</h2>
  </div>
);
