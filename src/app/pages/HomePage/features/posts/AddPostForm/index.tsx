import { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import { showLoadingSwal, showErrorSwal, closeSwal } from 'utils/swal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectAllUsers } from 'store/usersSlice';
import { addNewPost } from 'store/postsSlice';
import REQUEST_STATUS from 'constants/REQUEST_STATUS';
import { Button } from 'app/components';
import { Input, Select, TextArea } from 'app/components/Form';
import {
  Section,
  SectionTitle,
} from 'app/pages/HomePage/features/posts/components';

const DEFAULT_VALUE_USER_ID = 'DEFAULT_VALUE_USER_ID';

type FormValues = {
  title: string;
  body: string;
  userId: number | string;
};

const loginSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  body: yup
    .string()
    .required('Body is required')
    .min(8, 'Body must be at least 8 characters long'),
  userId: yup
    .number()
    .typeError('Please select a user')
    .required('Author is required'),
});

const defaultValues = {
  title: '',
  body: '',
  userId: DEFAULT_VALUE_USER_ID,
};

const AddPostForm = () => {
  const [addRequestStatus, setAddRequestStatus] = useState(REQUEST_STATUS.IDLE);
  const methods = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    setAddRequestStatus(REQUEST_STATUS.LOADING);
    await dispatch(
      addNewPost({
        ...data,
        userId: +data.userId,
      })
    ).unwrap();
    reset();
    setAddRequestStatus(REQUEST_STATUS.IDLE);
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
      <SectionTitle>Add a new post</SectionTitle>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
            className="mt-2 self-start"
            type="submit"
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
