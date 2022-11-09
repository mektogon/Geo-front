import React from "react";

import { useGetDesignationsQuery } from "../../features/designations/designations";
import {
  IDesignation,
  TDesignations,
} from "../../features/designations/designations.types";
import { Designation } from "@components";

import styles from "./Designations.module.scss";

export const Designations: React.FC = () => {
  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);

  console.log(designations, " designations");

  if (isLoadingDesignations) return <p>loading</p>;

  return (
    <div className={styles.designations}>
      {designations?.map((designation: IDesignation) => (
        <Designation {...designation} key={designation.id} />
      ))}
    </div>
  );
};
