import * as yup from 'yup';

import {
  EditPostFormValues,
  editPostSchema,
} from 'validations/posts/editPost.schema';

export interface AddPostFormValues extends EditPostFormValues {
  userId: number | string;
}

export const addPostSchema = editPostSchema.shape({
  userId: yup
    .number()
    .typeError('Please select a user')
    .required('Author is required'),
});
