import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from 'routes';
import { useFakeAuth } from 'hooks';
import type { LocationState } from 'types';
import { showLoadingSwal, showErrorSwal, closeSwal } from 'utils/swal';
import { useAuthUpdater } from 'services/auth';
import { PageWrapper, Button } from 'app/components';
import { Input, PasswordInput } from 'app/components/Form';
import { LoginFormValues, loginSchema } from 'validations/users/login.schema';

const LoginPage = () => {
  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const from = locationState?.from?.pathname ?? ROUTE_PATHS.HOME;
  const setAuthenticated = useAuthUpdater();
  const fakeAuth = useFakeAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      showLoadingSwal();
      const exists = await fakeAuth.handleLogin(data.email, data.password);
      if (exists) {
        setAuthenticated(true);
        closeSwal();
        navigate(from);
      } else {
        closeSwal();
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
