import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email'),
    password: Yup.string().required('Password Required').min(8, 'min 8 '),
});

export { LoginSchema };
