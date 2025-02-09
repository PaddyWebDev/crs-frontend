import { auth } from '@/auth'
import Navbar from '@/components/auth-navbar'
import React from 'react'
import { SessionProvider } from "@/context/session"; // Import Context

interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await auth()
    return (
        <SessionProvider session={session}>
            <main>
                <Navbar userName={session?.user.name!} />
                {children}
            </main>
        </SessionProvider>
    )
}
