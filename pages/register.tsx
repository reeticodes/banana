import * as React from 'react'
import NextLink from 'next/link'
import { Text, Input, Button, Divider, Link, Fieldset, Code, useToasts } from '@geist-ui/core'
import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignUpTypes } from '@/utils/.'
import type { NextPage, GetServerSideProps } from 'next'

const Register: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [verifyEmail, setVerifyEmail] = React.useState<false | string>(false)
  const { register, handleSubmit, formState, setError, clearErrors } = useForm<SignUpTypes>()
  const { setToast } = useToasts()

  const onSubmit: SubmitHandler<SignUpTypes> = async ({ email, password, confirm }) => {
    if (password !== confirm)
      return (
        [
          { type: 'conflict', name: 'password' },
          { type: 'conflict', name: 'confirm' },
        ] as const
      ).forEach(({ name, type }) => setError(name, { type }))
    setLoading(true)
    const { error } = await supabaseClient.auth.signUp({ email, password })
    if (error) {
      setToast({ text: error.message, type: 'error' })
      return setLoading(false)
    }
    setVerifyEmail(email)
  }

  const withAuthProvider = async () => {
    const { error } = await supabaseClient.auth.signIn({ provider: 'google' })
    if (error) return setToast({ text: error.message, type: 'error' })
  }

  return (
    <div className="flex min-h-screen flex-row">
      <div className="canvas w-96 sm:hidden md:w-40" />
      <section className="box-border max-w-2xl flex-shrink-0 p-12 sm:w-screen">
        <header className="mb-10">
          <Text h3 className="m-0">
            Banana
          </Text>
          <Text span b style={{ color: '#f81ce5' }}>
            Shared Coding Space
          </Text>
        </header>
        {verifyEmail ? (
          <Fieldset mb={3}>
            <Fieldset.Title>Awaiting Confirmation</Fieldset.Title>
            <Fieldset.Subtitle>
              We just sent an email to <Code>{verifyEmail}</Code>. Click verify and confirm your
              registration. You can now safely close this browser tab.
            </Fieldset.Subtitle>
            <Fieldset.Footer>
              Open Email in Browser
              <Button
                auto
                scale={1 / 3}
                font="12px"
                onClick={() => window.open(`https://${verifyEmail.split('@')[1]}`, '_self')}
              >
                Open {verifyEmail.split('@')[1].split('.')[0]}
              </Button>
            </Fieldset.Footer>
          </Fieldset>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 grid w-72 gap-3 sm:w-screen sm:pr-24"
          >
            <Text h4>Create your account</Text>
            <Input
              htmlType="email"
              width="100%"
              type={formState.errors.email && 'error'}
              {...register('email', { required: true })}
              disabled={loading}
            >
              <Text small b>
                Email Address
              </Text>
            </Input>
            <Input.Password
              width="100%"
              type={formState.errors.password && 'error'}
              {...register('password', { required: true })}
              onChange={() => clearErrors(['password', 'confirm'])}
              disabled={loading}
            >
              <Text small b>
                Password
              </Text>
            </Input.Password>
            <Input.Password
              width="100%"
              type={formState.errors.confirm && 'error'}
              {...register('confirm', { required: true })}
              onChange={() => clearErrors(['password', 'confirm'])}
              disabled={loading}
            >
              <Text small b>
                Confirm Password
              </Text>
            </Input.Password>
            <Button htmlType="submit" shadow type="success" loading={loading}>
              Sign Up
            </Button>
            <Divider my={4}>
              <Text small b>
                OR
              </Text>
            </Divider>
            <Button shadow type="secondary" onClick={withAuthProvider}>
              Sign Up With Google
            </Button>
          </form>
        )}
        <Text>
          Already have an account?{' '}
          <NextLink href="/">
            <Link color className="whitespace-nowrap">
              Log In
            </Link>
          </NextLink>
        </Text>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getUser(context)
  if (user) return { props: {}, redirect: { destination: '/u/dashboard', permanent: false } }
  return { props: {} }
}

export default Register
