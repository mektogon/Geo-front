import React from "react";
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

import { Button, ItemsGrid, Tooltip } from "@common";

import { useDeleteGeoMutation } from "../../../features/geo/geo";
import { Geo } from "../../../features/geo/geo.types";

import styles from "./Card.module.scss";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Card: React.FC<Geo> = ({ ...props }) => {
  const [deleteGeo, { isLoading: isLoadingDeleteGeo }] = useDeleteGeoMutation();

  const deleteHandler = async (id: Geo["id"] | undefined) => {
    await deleteGeo(id!).unwrap();
  };

  return (
    <div className={styles.card}>
      {!isLoadingDeleteGeo ? (
        <div className={styles.card_inner}>
          <div className={styles.top}>
            <ItemsGrid data={props.photoList![0]?.url} />
          </div>
          <div className={styles.bot}>
            <div className={styles.left}>
              <Tooltip behavior="hover" content={props.name} placement="top">
                <Link to={`/details/${props.id}`}>
                  <h2 className={styles.title}>{props.name}</h2>
                </Link>
              </Tooltip>

              <p className={styles.desc}>Долгота: {props.latitude}</p>
              <p className={styles.desc}>Широта: {props.longitude}</p>
            </div>
            <div className={styles.right}>
              <Button
                className={styles.delete}
                onClick={() => deleteHandler(props.id)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") deleteHandler(props.id);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <SyncLoader color="#36d7b7" cssOverride={override} />
      )}
    </div>
  );
};
