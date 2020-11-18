import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('This field is required')
    .email('Email not valid'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(4, 'Minimal 4 karakter'),
});

export { LoginSchema };
