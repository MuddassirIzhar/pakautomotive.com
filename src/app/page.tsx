import AppBar from '@/app/AppBar';
import Index from './index';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PakAutomotive | Dashboard',
  description: 'This is admin dashboard page',
}


export default async function HomePage() {
  return <AppBar children={<Index />} />;
}