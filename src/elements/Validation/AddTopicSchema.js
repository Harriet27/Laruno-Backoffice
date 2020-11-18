import * as yup from 'yup';

const AddTopicSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
});

export { AddTopicSchema };
