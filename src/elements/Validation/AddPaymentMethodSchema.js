import * as yup from 'yup';

const AddPaymentMethodSchema = yup.object().shape({
  name: yup.string().required('Wajib isi'),
});

export { AddPaymentMethodSchema };
