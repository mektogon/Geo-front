import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@common";

import styles from "./Upload.module.scss";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: "0.5rem",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "rgb(203 213 225)",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const errorStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: "0.5rem",
  borderColor: "rgb(252 165 165)",
  color: "#000",
  outline: "none",
  transition: "border .24s ease-in-out",
  borderStyle: "solid",
  backgroundColor: "rgb(254 226 226)",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row" as "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "flex",
  flexDirection: "column" as "column",

  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  width: "200px",
  marginRight: "10px",
};

const img = {
  display: "block",
  width: "200px",
  height: "50px",
  marginRight: "10px",
};

interface UploadProps {
  setFieldValue: any;
  name: string;
  placeholder: string;
  extension: string;
  maxFiles: number;
  size?: string;
  values?: any;
  error?: string | null;
  deleteObject?: any;
  isLoading?: boolean;
}

export const UploadComponent: React.FC<UploadProps> = (props: UploadProps) => {
  const {
    setFieldValue,
    name,
    placeholder,
    extension,
    maxFiles,
    error,
    size,
    values,
  } = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: {},
    maxFiles,
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles);
    },
  });

  const sizeStyles = {
    height: size,
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(size ? sizeStyles : {}),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      // ...(error ? errorStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const removeFile = (file: any) => () => {
    const newFiles = [...values];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFieldValue(name, newFiles);
  };

  const files = values?.map((file: any) => (
    <li key={file.path}>
      {file.path}
      <button type="button" onClick={removeFile(file)}>
        &times;
      </button>
    </li>
  ));

  return (
    <div>
      <span className={styles.label}>{placeholder}</span>
      <span className={styles.error}>{error}</span>
      <div {...getRootProps({ style })} className={styles.block}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={styles.text}>Drop the files here ...</p>
        ) : (
          <p className={styles.text}>
            Drag drop some files here, or click to select files {extension}
          </p>
        )}
      </div>
      <ul>{files}</ul>
    </div>
  );
};
