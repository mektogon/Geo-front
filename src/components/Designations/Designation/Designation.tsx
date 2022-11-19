import React from "react";
import { toast } from "react-toastify";

import {
  Button,
  DeleteIcon,
  EditableInput,
  Input,
  Tooltip,
  UpdateIcon,
} from "@common";

import {
  useDeleteDesignationMutation,
  useUpdateDesignationMutation,
} from "../../../features/designations/designations";
import { IDesignation } from "../../../features/designations/designations.types";
import { useDeletePhotoMutation } from "../../../features/photo/photo";

import styles from "./Designation.module.scss";

export const Designation = ({ name, url, id }: IDesignation) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const [deleteDesignation, { isLoading: isDeletingDesignation }] =
    useDeleteDesignationMutation();

  const [deletePhoto, { isLoading: isDeletingPhoto }] =
    useDeletePhotoMutation();

  const [updateDesignation, { isLoading: isUpdatingDesignation }] =
    useUpdateDesignationMutation();

  const deleteHandler = async (id: any | undefined) => {
    await deleteDesignation(id!)
      .unwrap()
      .then((payload: any) => {
        toast.success("Deleted", payload);
      })
      .catch(({ data }) => toast.error(data.error));
  };

  const deleteHandlerPhoto = async (id: any | undefined) => {
    await deletePhoto(id!)
      .unwrap()
      .then((payload: any) => {
        toast.success("Deleted", payload);
      })
      .catch(({ data }) => toast.error(data.error));
  };

  return (
    <div className={styles.designation}>
      {isEditing ? (
        <EditableInput
          name={name}
          url={url}
          onDelete={() => deleteHandlerPhoto(id)}
          active
          onUpdate={(name) =>
            updateDesignation({ id, name })
              .then((result) => {
                setIsEditing(false);
              })
              .catch((error) => console.error("Update Error", error))
          }
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <Tooltip behavior="hover" content={name} placement="top">
            <div className={styles.img_container}>
              <img src={url} alt="designation" className={styles.img} />
            </div>
          </Tooltip>
          <h2 className={styles.name}>{name}</h2>

          <div className={styles.buttons}>
            <Button variant="text" onClick={() => setIsEditing(true)}>
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
