import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./Dropzone.module.scss";

interface DropZoneProps extends React.ComponentPropsWithRef<"input"> {
  extension?: string;
  text?: string;
  placeholder?: string;
  maxFiles?: number;
  files?: FileList[] | null;
  setFiles?: any;
}

type File = {
  name: string;
  path: string;
};

export const Dropzone: React.FC<DropZoneProps> = ({
  extension,
  text,
  placeholder,
  maxFiles,
  files,
  setFiles,
  onChange,
  ...props
}) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "audio/*": [],
      "video/*": [],
    },
  });

  const removeFile = (file: File) => () => {
    const newFiles = [{ ...files }];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const removeAll = () => {
    setFiles([]);
  };

  return (
    <div className={styles.zone}>
      <span className={styles.label}>{placeholder}</span>

      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} {...props} onChange={onChange} />
        {isDragActive ? <p>Drop the files here...</p> : <p>{text}</p>}
        <em>{extension}</em>
      </div>

      {files?.map((file: any) => (
        <div
          key={file.path}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>{file.name}</p>
          <button onClick={removeFile(file)}>&times;</button>
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        {files!.length > 1 && <button onClick={removeAll}>Remove All</button>}
      </div>
    </div>
  );
};
