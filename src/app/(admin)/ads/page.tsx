import Index from './index';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PakAutomotive | Dashboard',
  description: 'This is admin dashboard page',
}


export default async function DashboardPage() {
  const session = await getServerSession();
  if(!session || !session.user) {
      redirect("/login");
  }
  else {
    return <Index />;
  }
}