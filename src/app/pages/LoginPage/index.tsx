import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useFakeAuth } from 'hooks';
import { showLoadingSwal, showErrorSwal, closeSwal } from 'utils/swal';
import { useAuthContext } from 'services/auth';
import { PageWrapper, Button } from 'app/components';
import { Input, PasswordInput } from 'app/components/Form';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

type FormValues = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

const LoginPage = () => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const from = locationState?.from?.pathname ?? ROUTE_PATHS.HOME;
  const auth = useAuthContext();
  const fakeAuth = useFakeAuth();

  const onSubmit = async (data: FormValues) => {
    showLoadingSwal();

    try {
      const exists = await fakeAuth.checkLogin(data.email, data.password);

      closeSwal();

      if (exists) {
        auth.setAuthenticated(true);
        navigate(from);
      } else {
        showErrorSwal('Email or password is incorrect');
      }
    } catch (error) {
      closeSwal();
      throw new Error(error as string);
    }
  };

  const { handleSubmit } = methods;

  return (
    <div className="flex min-h-screen w-full items-center bg-pale-blue bg-[url('assets/images/pattern-background-mobile.svg')] bg-contain bg-no-repeat xl:bg-[url('assets/images/pattern-background-desktop.svg')]">
      <PageWrapper className="container">
        <section className="mx-auto flex w-full max-w-xs flex-col gap-y-4 rounded-md bg-white px-8 pt-6 pb-8 shadow-2xl shadow-bright-blue/10 md:max-w-sm">
          <h1 className="flex-initial text-center text-2xl font-bold text-dark-blue">
            Login
          </h1>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormProvider {...methods}>
            <form
              className="mb-4 flex flex-col gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input id="email" label="Email" placeholder="Email" />
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Password"
              />
              <Button block primary type="submit" className="mt-2">
                Sign In
              </Button>
            </form>
          </FormProvider>
        </section>
      </PageWrapper>
    </div>
  );
};

export default LoginPage;
