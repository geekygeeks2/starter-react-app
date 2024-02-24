import * as Yup from "yup";

export const RegisterFormValidation = Yup.object({
  firstName: Yup.string().min(3).required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  gender:Yup.string().required('Gender is required'),
  phone1: Yup.string().required("This field is required").matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
  // email: Yup.string().email().required("This field is required"),
  // aadharNumber : Yup.number().required("This field is required"),
  // panNumber : Yup.string().required("This field is required"),
})