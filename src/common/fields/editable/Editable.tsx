import React from "react";

import { Button, Input } from "@common";

import styles from "./Editable.module.scss";

export const EditableInput = ({
  name: initialName,
  onUpdate,
  onCancel,
  loading = false,
}: {
  name: string;
  onUpdate: (name: string) => void;
  onCancel: () => void;
  loading?: boolean;
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type="text"
        onChange={handleChange}
        value={name}
        disabled={loading}
      />
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
