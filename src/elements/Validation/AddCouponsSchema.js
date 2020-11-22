import * as yup from 'yup';

const AddCouponsSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  value: yup.string().required('This field is required'),
  start_date: yup.string().required('This field is required'),
  end_date: yup.string().required('This field is required'),
  type: yup.string().required('This field is required'),
});

export { AddCouponsSchema };
