import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import { loginSchema } from 'validations';
import { Input, PasswordInput } from 'app/components/Form';

type FormValues = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const methods = useForm<FormValues>({
    // mode: 'onTouched',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const { handleSubmit } = methods;

  return (
    <main className="flex min-h-screen w-full items-center bg-blue-100">
      <div className="mx-auto w-full max-w-xs">
        <h1 className="mb-4 text-center text-2xl font-bold text-blue-500">
          Login
        </h1>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormProvider {...methods}>
          <form
            className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              className="mb-4"
              id="username"
              label="Username"
              placeholder="Username"
            />
            <PasswordInput
              className="mb-4"
              id="password"
              label="Password"
              placeholder="Password"
            />
            <div className="flex items-center justify-between">
              <button
                // eslint-disable-next-line max-len
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                //  TODO: add Forgot Password link
                to="/"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default LoginPage;
