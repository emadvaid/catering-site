import dynamic from 'next/dynamic';

const Login = dynamic(() => import('../components/LoginComponent'), { ssr: false });

export default Login;
