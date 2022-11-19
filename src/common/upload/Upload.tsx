import { useMemo } from "react";
import { useDropzone } from "react-dropzone";

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

interface UploadProps {
  setFieldValue: any;
  name: string;
  placeholder: string;
  extension: string;
  maxFiles: number;
  error?: string | null;
}

export const UploadComponent: React.FC<UploadProps> = (props: UploadProps) => {
  const { setFieldValue, name, placeholder, extension, maxFiles, error } =
    props;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {},
    maxFiles,
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      // ...(error ? errorStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  console.log(error, "errorupload");

  return (
    <div>
      <span className={styles.label}>{placeholder}</span>
      <span className={styles.error}>{error}</span>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files {extension}</p>
        )}
      </div>
    </div>
  );
};
