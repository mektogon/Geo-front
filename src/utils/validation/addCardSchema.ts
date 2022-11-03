import * as Yup from "yup";

export const addCardSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  type: Yup.string().required("Required field"),
  designation: Yup.string().required("Required field"),
  latitude: Yup.number().required("Required field").min(-90).max(90),
  longitude: Yup.number().required("Required field").min(-180).max(180),
  note: Yup.string().required("Required field"),
  description: Yup.string().required("Required field"),

  addressDto: Yup.object().shape({
    region: Yup.string().required("Required field"),
    typeLocality: Yup.string().required("Required field"),
    locality: Yup.string().required("Required field"),
    street: Yup.string().required("Required field"),
    district: Yup.string().required("Required field"),
    houseNumber: Yup.string().required("Required field"),
  }),
});
