import NextLink from 'next/link'
import { Text, Input, Button, Divider, Link } from '@geist-ui/core'
import type { NextPage } from 'next'

const Home: NextPage = () => {
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
        <form className="mb-10 grid gap-3">
          <Text h4>Log in to your vault</Text>
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
          <Button htmlType="submit" shadow type="success">
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

export default Home
