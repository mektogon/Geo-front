import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button, Dropzone, Input } from "@common";
import { Designation, Search } from "@components";

import {
  useGetDesignationsQuery,
  useUploadDesignaionMutation,
} from "../../features/designations/designations";
import { IDesignation } from "../../features/designations/designations.types";

import styles from "./Designations.module.scss";

export const Designations: React.FC = () => {
  const [files, setFiles] = useState("");
  const [name, setName] = useState("");
  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);
  const [uploadDesignaion, { isLoading: isLoadingUpload }] =
    useUploadDesignaionMutation();

  if (isLoadingDesignations) return <p>loading</p>;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: any = new FormData();

    data.append("designation", files);
    data.append("name", name);

    await uploadDesignaion(data)
      .unwrap()
      .then((payload: any) => {
        toast.success("Succeeded", payload);
        setName("");
        setFiles("");
      })
      .catch(({ data }) => toast.error(data.error));
  };

  return (
    <div className={styles.container}>
      <Search isActive={false} />
      <Button variant="text">Добавить Обозначения</Button>
      <form className={styles.add} onSubmit={onSubmit}>
        <div className={styles.field}>
          <Input
            text="Введите название"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="file"
            multiple
            onChange={(e: any) => setFiles(e.target.files[0])}
          />

          <Button variant="outlined" loading={isLoadingUpload}>
            Сохранить
          </Button>
        </div>
      </form>
      <div className={styles.designations}>
        {designations?.map((designation: IDesignation) => (
          <Designation {...designation} key={designation.id} />
        ))}
      </div>
    </div>
  );
};
