import * as Yup from "yup";

export const RegisterFormValidation = Yup.object({
  firstName: Yup.string().min(3).required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  gender:Yup.string().required('Gender is required'),
  phone: Yup.string().required("This field is required").matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
  email: Yup.string().email().required("This field is required"),
  aadharCard : Yup.number().required("This field is required"),
  panCard : Yup.string().required("This field is required"),
})