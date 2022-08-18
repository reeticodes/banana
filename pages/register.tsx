import NextLink from 'next/link'
import { Text, Input, Button, Divider, Link } from '@geist-ui/core'
import type { NextPage } from 'next'

const Register: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="canvas w-96 sm:hidden md:w-40" />
      <section className="box-border w-96 flex-shrink-0 p-12 sm:w-screen">
        <header className="mb-10">
          <Text h3 className="m-0">
            Banana
          </Text>
          <Text span b style={{ color: '#f81ce5' }}>
            Shared Coding Space
          </Text>
        </header>
        <form className="mb-10 grid gap-3">
          <Text h4>Create your account</Text>
          <Input htmlType="email" width="100%">
            <Text small b>
              Email Address
            </Text>
          </Input>
          <Input.Password width="100%">
            <Text small b>
              Password
            </Text>
          </Input.Password>
          <Input.Password width="100%">
            <Text small b>
              Confirm Password
            </Text>
          </Input.Password>
          <Button htmlType="submit" shadow type="success">
            Sign Up
          </Button>
          <Divider my={4}>
            <Text small b>
              OR
            </Text>
          </Divider>
          <Button shadow type="secondary">
            Sign Up With Google
          </Button>
        </form>
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

export default Register
