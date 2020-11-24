import * as yup from 'yup';

const AddPaymentMethodSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  vendor: yup.string().required('This field is required'),
  info: yup.string().required('This field is required'),
});

export { AddPaymentMethodSchema };
