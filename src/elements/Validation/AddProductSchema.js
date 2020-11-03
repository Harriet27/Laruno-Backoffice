import * as yup from 'yup';

const AddProductSchema = yup.object().shape({
    name: yup
        .string('nama harus berupa string')
        .required('Wajib di isi')
        .min(5, 'Minimal 5 Karakter'),
    type: yup.string().required('Wajib di isi'),
    slug: yup.string().required('Wajib di isi'),
    code: yup.string().required('Wajib di isi'),
    visibility: yup.string().required('Wajib di isi'),
    sale_method: yup.string().required('Wajib di isi'),
});

export { AddProductSchema };
