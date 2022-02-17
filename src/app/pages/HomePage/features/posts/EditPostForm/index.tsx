import { useNavigate, useParams } from 'react-router-dom';
import { EntityId } from '@reduxjs/toolkit';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from 'hooks';
import { editPost, selectPostById } from 'store/postsSlice';
import { showLoadingSwal, showSuccessSwal, closeSwal } from 'utils/swal';
import { Button } from 'app/components';
import { Input, TextArea } from 'app/components/Form';
import {
  EditPostFormValues,
  editPostSchema,
} from 'validations/posts/editPost.schema';
import { Section, SectionTitle } from 'app/pages/HomePage/features/components';

const EditPostForm = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    selectPostById(state, postId as EntityId)
  );
  const methods = useForm<EditPostFormValues>({
    resolver: yupResolver(editPostSchema),
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: EditPostFormValues) => {
    if (postId) {
      try {
        showLoadingSwal();
        await dispatch(editPost({ ...data, id: +postId })).unwrap();
        closeSwal();
        await showSuccessSwal({
          title: 'Edited!',
          text: 'Post edited successfully',
        });
        navigate(`/posts/${postId}`, {
          state: {
            from: {
              pathname: `/editPost/${postId}`,
            },
          },
        });
      } catch (error) {
        throw new Error(error as string);
      }
    }
  };

  const { handleSubmit } = methods;

  return (
    <Section>
      <SectionTitle>Edit Post</SectionTitle>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...methods}>
        <form
          className="mb-4 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input id="title" label="Post Title" placeholder="Title" />
          <TextArea id="body" label="Body" />
          <Button primary type="submit" className="mt-2 self-start">
            Save Post
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
};

export default EditPostForm;
