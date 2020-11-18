import * as yup from 'yup';

const AddProductSchema = yup.object().shape({
  name: yup
    .string('Nama harus berupa string')
    .required('This field is required')
    .min(5, 'Minimal 5 Karakter'),
  type: yup.string().required('This field is required'),
  slug: yup.string().required('This field is required'),
  code: yup.string().required('This field is required'),
  visibility: yup.string().required('This field is required'),
  sale_method: yup.string().required('This field is required'),
});

export { AddProductSchema };
