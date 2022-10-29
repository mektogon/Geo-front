import React from "react";
import { Link } from "react-router-dom";

import { Geo } from "../../../features/geo/geo.types";

import styles from "./Card.module.scss";

export const Card: React.FC<Geo> = ({ ...props }) => (
  <div className={styles.card}>
    <div className={styles.top} />
    <div className={styles.bot}>
      <div className={styles.left}>
        <Link to={`/details/${props.id}`}>
          <h2 className={styles.title}>{props.name}</h2>
        </Link>
        <p className={styles.desc}>Долгота: {props.latitude}</p>
        <p className={styles.desc}>Широта: {props.longitude}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.delete} />
      </div>
    </div>
  </div>
);
