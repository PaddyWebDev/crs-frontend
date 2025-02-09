import { auth } from '@/auth'
import Navbar from '@/components/auth-navbar'
import React from 'react'


interface AuthLayoutProps {
    children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
        const session = await auth()
    return (
        <main>
            <Navbar userName={session?.user.name!} />
            {children}
        </main>
    )
}
