import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

import { Button, DeleteIcon, Input, Tooltip, UpdateIcon } from "@common";
import { UploadComponent } from "@common/upload/Upload";

import {
  useDeleteDesignationMutation,
  useUpdateDesignationMutation,
} from "../../../features/designations/designations";
import { IDesignation } from "../../../features/designations/designations.types";

import styles from "./Designation.module.scss";

export const Designation = ({ name, url, id }: IDesignation) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const [deleteDesignation, { isLoading: isDeletingDesignation }] =
    useDeleteDesignationMutation();

  const [updateDesignation, { isLoading: isUpdatingDesignation }] =
    useUpdateDesignationMutation();

  const deleteHandler = async (id: any | undefined) => {
    if (window.confirm("Удалить обозначения?")) {
      await deleteDesignation(id!)
        .unwrap()
        .then((payload: any) => {
          toast.success("Deleted", payload);
        })
        .catch(({ data }) => toast.error(data.error));
    }
  };

  const updateHandler = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.designation}>
      {isEditing ? (
        <Formik
          initialValues={{
            name,
            id,
            url,
          }}
          onSubmit={async (values) => {
            const data: any = new FormData();

            data.append("id", values.id);
            data.append("name", values.name);
            data.append("designation", values.url[0]);

            await updateDesignation(data)
              .unwrap()
              .then((payload: any) => {
                toast.success("Succeeded", payload);
                setIsEditing(!isEditing);
              })
              .catch((data: any) => toast.error(data.status));
          }}
        >
          {({ values, handleBlur, handleChange, setFieldValue }) => (
            <Form>
              <UploadComponent
                setFieldValue={setFieldValue}
                name="url"
                placeholder="Фото"
                size="100px"
                maxFiles={1}
                extension="'jpeg', 'png'"
              />

              <div>{values.url[0].name}</div>
              <Input
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              <div className={styles.buttons_save}>
                <Button
                  type="submit"
                  variant="outlined"
                  loading={isUpdatingDesignation}
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <Tooltip behavior="hover" content={name} placement="top">
            <div className={styles.img_container}>
              <img src={url} alt="designation" className={styles.img} />
            </div>
          </Tooltip>
          <h2 className={styles.name}>{name}</h2>

          <div className={styles.buttons}>
            <Button variant="text" onClick={updateHandler}>
              <UpdateIcon />
            </Button>

            <Button
              disabled={isDeletingDesignation}
              onClick={() => deleteHandler(id)}
              variant="text"
              onKeyPress={(e) => {
                if (e.key === "Enter") deleteHandler(id);
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
