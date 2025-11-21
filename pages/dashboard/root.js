import { getSession } from 'next-auth/react';

export default function RootDashboard() {
  return (
    <div>
      <h1>Root Dashboard</h1>
      <p>Welcome, Root! You have full access to the system.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'root') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}