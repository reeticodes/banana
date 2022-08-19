import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import type { NextPage, GetServerSideProps } from 'next'

const Dashboard: NextPage = () => {
  return <main />
}

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(context) {
    const { user } = await getUser(context)
    return { props: { user } }
  },
})

export default Dashboard
