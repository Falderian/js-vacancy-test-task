import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Anchor, Button, Flex, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { accountApi } from 'resources/account';

import { GoogleIcon } from 'public/icons';

import { handleApiError } from 'utils';

import { RoutePath } from 'routes';
import config from 'config';

import { SignUpParams } from 'types';
import { IconCircleCheck } from '@tabler/icons-react';

type SignUpResponse = { signupToken?: string };

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lower case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);
  const [opened, setOpened] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({});

  const passwordValue = watch('password', '').trim();

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isPending: isSignUpPending } = accountApi.useSignUp();

  const onSubmit = (data: SignUpParams) => {
    signUp(
      { ...data, firstName: '', lastName: '' },
      {
        onSuccess: (response: SignUpResponse) => {
          if (response.signupToken) setSignupToken(response.signupToken);

          setRegistered(true);
          setEmail(data.email);
        },
        onError: (e) => {
          console.log(e);
          return handleApiError(e, setError);
        },
      },
    );
  };

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>

        <Stack w={450}>
          <Title order={2}>Thanks!</Title>

          <Text size="md" c="gray.6">
            Please follow the instructions from the email to complete a sign up process. We sent an email with a
            confirmation link to <b>{email}</b>
          </Text>

          {signupToken && (
            <Stack gap={0}>
              <Text>You look like a cool developer.</Text>
              <Anchor size="sm" href={`${config.API_URL}/account/verify-email?token=${signupToken}`} target="_blank">
                Verify email
              </Anchor>
            </Stack>
          )}
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack w={400} gap={20}>
        <Stack gap={32}>
          <Title order={1}>Sign Up</Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                {...register('email')}
                label="Email Address"
                placeholder="Enter email Address"
                error={errors.email?.message}
              />

              <PasswordInput
                {...register('password')}
                label="Password"
                placeholder="Enter password"
                onFocus={() => setOpened(true)}
                onBlur={() => setOpened(false)}
                error={errors.password?.message}
              />
              <Stack>
                {passwordRulesData.map((rule) => (
                  <Flex key={rule.title} align="center" gap={14}>
                    <IconCircleCheck color={rule.done ? 'blue' : 'red'} />
                    <Text key={rule.title} color={rule.done ? 'gray' : 'red'} size="sm">
                      {rule.title}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>

            <Button type="submit" loading={isSignUpPending} fullWidth mt={32} onClick={handleSubmit(onSubmit)}>
              Sign Up
            </Button>
          </form>
        </Stack>

        <Stack gap={32}>
          <Group justify="center" gap={12}>
            Have an account?
            <Anchor component={Link} href={RoutePath.SignIn}>
              Sign In
            </Anchor>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default SignUp;
