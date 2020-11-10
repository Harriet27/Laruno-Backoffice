import * as yup from 'yup';

const AddTopicSchema = yup.object().shape({
  name: yup.string().required('Wajib isi'),
});

export { AddTopicSchema };
