import { auth } from '@/auth'
import GuestNavbar from '@/components/guest-navbar'
import { redirect } from 'next/navigation'
import React from 'react'

interface GuestLayoutProps {
    children: React.ReactNode
}

export default async function GuestLayout({ children }: GuestLayoutProps) {
    const user = await auth()
    if (user) {
        redirect("/auth/dashboard")
    }
    return (
        <main className='h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center'>
            <GuestNavbar  />
            {children}
        </main>
    )
}
