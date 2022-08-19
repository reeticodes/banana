import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Text, Input, Button, Divider, Link, useToasts } from '@geist-ui/core'
import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LogInTypes } from '@/utils/.'
import type { NextPage, GetServerSideProps } from 'next'

const LogIn: NextPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { register, handleSubmit, formState } = useForm<LogInTypes>()
  const { setToast } = useToasts()
  const router = useRouter()

  const onSubmit: SubmitHandler<LogInTypes> = async ({ email, password }) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn({ email, password })
    if (error) {
      setToast({ text: error.message, type: 'error' })
      return setLoading(false)
    }
    router.push('/u/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-row">
      <section className="box-border w-96 flex-shrink-0 p-12 sm:w-screen">
        <header className="mb-10">
          <Text h3 className="m-0">
            Banana
          </Text>
          <Text span b style={{ color: '#f81ce5' }}>
            Shared Coding Space
          </Text>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-10 grid gap-3">
          <Text h4>Log in to your vault</Text>
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
            {...register('password', { required: true, min: 6 })}
            disabled={loading}
          >
            <Text small b>
              Password
            </Text>
          </Input.Password>
          <Button htmlType="submit" shadow type="success" loading={loading}>
            Log In
          </Button>
          <Divider my={4}>
            <Text small b>
              OR
            </Text>
          </Divider>
          <Button shadow type="secondary">
            Log In With Google
          </Button>
        </form>
        <Text>
          Don&apos;t have an account?{' '}
          <NextLink href="/register">
            <Link color className="whitespace-nowrap">
              Sign Up
            </Link>
          </NextLink>
        </Text>
      </section>
      <div className="canvas w-full flex-grow sm:hidden" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getUser(context)
  if (user) return { props: {}, redirect: { destination: '/u/dashboard', permanent: false } }
  return { props: {} }
}

export default LogIn
