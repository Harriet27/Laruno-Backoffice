import * as yup from 'yup';

const AddCouponsSchema = yup.object().shape({
    name: yup.string().required('Wajib isi'),
    value: yup.string().required('Wajib isi'),
    start_date: yup.string().required('Wajib isi'),
    end_date: yup.string().required('Wajib isi'),
    payment_method: yup.string().required('Wajib isi'),
});

export { AddCouponsSchema };
