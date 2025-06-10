import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import Provider from '@/app/(admin)/Provider';
import { Toaster } from 'react-hot-toast';
import { StateProvider } from '@/app/contexts/StateContext';
import reducer, { initialState } from '@/app/contexts/StateReducers';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from '@/components/site-header';
import { AppSidebar } from '@/components/app-sidebar';
import { RouteProgressProvider } from '../RouteProgressProvider';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'PakAutomotive | Dashboard',
	description: 'This is admin dashboard',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();
	return (
		<StateProvider initialState={initialState} reducer={reducer} >
          <RouteProgressProvider />
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					className: '',
					style: {
						padding: '16px',
						borderRadius: '50px',
						background: '#333',
						color: '#fff',
					},
				}}
			/>
			<Provider>

					<div className="[--header-height:calc(theme(spacing.14))]">
					  <SidebarProvider className="flex flex-col">
						<SiteHeader />
						<div className="flex flex-1">
						  <AppSidebar variant="inset" />
						  <SidebarInset>
							<main className="flex flex-1 flex-col gap-4 p-4">
								{children}
							</main>
						  </SidebarInset>
						</div>
					  </SidebarProvider>
					</div>
			</Provider>
			<div id="photo-picker-element"></div>
		</StateProvider>
	);
}