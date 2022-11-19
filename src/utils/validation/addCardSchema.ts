import * as Yup from "yup";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const addCardSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  type: Yup.string().required("Обязательное поле"),

  designation: Yup.string().required("Обязательное поле"),
  latitude: Yup.number()
    .required("Широта должна быть в диапазоне [-90; 90]")
    .min(-90)
    .max(90),
  longitude: Yup.number()
    .required("Долгота должна быть в диапазоне [-180; 180]")
    .min(-180)
    .max(180),
  note: Yup.string().notRequired(),
  description: Yup.string().required("Обязательное поле"),

  region: Yup.string().notRequired(),
  typeLocality: Yup.string().notRequired(),
  locality: Yup.string().notRequired(),
  street: Yup.string().notRequired(),
  district: Yup.string().notRequired(),
  houseNumber: Yup.string().notRequired(),

  // photo: Yup.mixed()
  //   .required("*Avatar image is required")
  //   .test(
  //     "fileSize",
  //     "Image too large, max 8mb",
  //     (value) => value && value.size <= 200000000000000000000000000
  //   )
  //   .test(
  //     "fileFormat",
  //     "Images only",
  //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
});
