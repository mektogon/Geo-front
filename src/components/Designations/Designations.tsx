import React, { useState } from "react";
import { toast } from "react-toastify";

import { Button, Dropzone, Input, Spinner } from "@common";
import { Designation, Search } from "@components";

import {
  useGetDesignationsQuery,
  useSearchDesignationQuery,
  useUploadDesignaionMutation,
} from "../../features/designations/designations";
import { IDesignation } from "../../features/designations/designations.types";

import styles from "./Designations.module.scss";

export const Designations: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [files, setFiles] = useState("");
  const [name, setName] = useState("");

  const { data: designations, isLoading: isLoadingDesignations } =
    useGetDesignationsQuery([]);

  const [uploadDesignaion, { isLoading: isLoadingUpload }] =
    useUploadDesignaionMutation();

  const { data: dataSearch, isLoading: isLoadingSearch } =
    useSearchDesignationQuery(searchTitle);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: any = new FormData();

    data.append("designation", files);
    data.append("name", name);

    await uploadDesignaion(data)
      .unwrap()
      .then((payload: any) => {
        toast.success("Succeeded", payload);
      })
      .catch(({ data }) => toast.error(data.error));
  };

  const handleChange = (event: any) => {
    setSearchTitle(event.target.value);
  };

  if (isLoadingDesignations) return <Spinner />;

  return (
    <div className={styles.container}>
      <Search isActive={false} onChange={handleChange} />
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
        {dataSearch?.map((designation: IDesignation) => (
          <Designation {...designation} key={designation.id} />
        ))}
      </div>
    </div>
  );
};
