import classNames from "classnames";
import React from "react";

import { Button, DeleteIcon,Input } from "@common";

import styles from "./Editable.module.scss";

export const EditableInput = ({
  name: initialName,
  onUpdate,
  onCancel,
  url,
  active,
  column,
  onDelete,
  loading = false,
}: {
  name: string;
  onUpdate: (name: string) => void;
  onDelete?: (id: any) => void;
  onCancel: () => void;
  loading?: boolean;
  url?: string;
  active?: boolean;
  column?: boolean;
}) => {
  const [name, setName] = React.useState(initialName);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setName(value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onUpdate(name);
  };
  const handleCancel = () => onCancel();

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(column ? styles.form : styles.form_active)}
    >
      <Input
        type="text"
        onChange={handleChange}
        value={name}
        disabled={loading}
      />
      {active && (
        <div>
          {url ? (
            <div className={styles.url}>
              <img src={url} alt="" />
              <Button variant="text" onClick={onDelete}>
                <DeleteIcon />
              </Button>
            </div>
          ) : (
            <div>
              <Input type="file" />
            </div>
          )}
        </div>
      )}

      <div className={styles.buttons}>
        <Button type="submit" disabled={loading} variant="text">
          {loading ? "Updating..." : "Update"}
        </Button>
        <Button onClick={handleCancel} disabled={loading} variant="text">
          Cancel
        </Button>
      </div>
    </form>
  );
};
