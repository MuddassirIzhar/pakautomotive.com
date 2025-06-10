import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Login | Professional',
  description: 'If you are professional and already registered, Login here!',
}

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <Form />;
}