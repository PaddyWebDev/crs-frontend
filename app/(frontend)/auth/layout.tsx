import { auth } from '@/auth'
import React from 'react'
import { SessionProvider } from "@/context/session"; // Import Context
import Sidebar from '@/components/auth-sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await auth()
    return (
        <SidebarProvider>
            <SessionProvider session={session}>
                <main className='w-full'>
                    <aside className="md:w-64">
                        <Sidebar userId={session?.user.id!} userName={session?.user.name!} />
                    </aside>
                    <SidebarTrigger />
                    {children}
                </main>
            </SessionProvider>
        </SidebarProvider>
    )
}
