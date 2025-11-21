import { getSession } from 'next-auth/react';

export default function CustomerDashboard() {
  return (
    <div>
      <h1>Customer Dashboard</h1>
      <p>Welcome, Customer! Explore menus and place your orders here.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'customer') {
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