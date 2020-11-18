import * as yup from 'yup';

const AddAdministratorSchema = yup.object().shape({
  name: yup
    .string()
    .required('This field is required')
    .min(4, 'Minimal 4 Karakter'),
  email: yup
    .string()
    .email('Email Tidak Sesuai')
    .required('This field is required'),
  phone_number: yup
    .number()
    // .required('Wajib isi')
    .typeError('Silahkan mmasukkan nomor telephone anda')
    .positive('Tidak boleh negatif')
    .test(
      'len',
      'Minimal 9 Karakter',
      (val) => val && val.toString().length >= 9
    ),
  password: yup.string().required('Wajib isi').min(6, 'Minimal 6 Karakter'),
});

export { AddAdministratorSchema };
