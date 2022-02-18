import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EntityId } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/usersSlice';
import { showLoadingSwal, showSuccessSwal, closeSwal } from 'utils/swal';
import { addNewPost } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import { Section, SectionTitle, Button } from 'app/components';
import { Input, Select, TextArea } from 'app/components/Form';
import {
  IAddPostFormValues,
  addPostSchema,
} from 'validations/posts/addPost.schema';

export const DEFAULT_VALUE_USER_ID = 'DEFAULT_VALUE_USER_ID';

export const addPostFormDefaultValues = {
  title: '',
  body: '',
  userId: DEFAULT_VALUE_USER_ID,
};

const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState(REQUEST_STATUS.IDLE);
  const methods = useForm<IAddPostFormValues>({
    resolver: yupResolver(addPostSchema),
    defaultValues: addPostFormDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const dispatch = useAppDispatch();

  const onSubmit = async (data: IAddPostFormValues) => {
    setAddRequestStatus(REQUEST_STATUS.LOADING);
    try {
      showLoadingSwal();
      await dispatch(
        addNewPost({
          ...data,
          userId: data.userId as EntityId,
        })
      ).unwrap();
      reset();
      setAddRequestStatus(REQUEST_STATUS.IDLE);
      closeSwal();
      await showSuccessSwal({
        title: 'Added!',
        text: 'Post added successfully',
      });
    } catch (error) {
      closeSwal();
      throw new Error(error as string);
    }
  };

  const users = useAppSelector(selectAllUsers);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = addRequestStatus === REQUEST_STATUS.IDLE;

  return (
    <Section className="mt-2">
      <SectionTitle to="#add-post-form">Add a new post</SectionTitle>
      <FormProvider {...methods}>
        <form
          className="mb-4 flex flex-col gap-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input id="title" label="Post Title" placeholder="Title" />
          <Select
            id="userId"
            label="Author"
            defaultValue={DEFAULT_VALUE_USER_ID}
          >
            <option disabled hidden value={DEFAULT_VALUE_USER_ID}>
              Choose a user
            </option>
            {usersOptions}
          </Select>
          <TextArea id="body" label="Body" />
          <Button
            primary
            type="submit"
            className="mt-2 self-start"
            disabled={!canSave}
          >
            Save Post
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
};

export default AddPostForm;
