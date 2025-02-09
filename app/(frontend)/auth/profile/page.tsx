
import { auth } from '@/auth'
import React from 'react'
import ProfileComponent from "./_components/profile"
import { User } from 'next-auth';


export default async function Settings() {
    const session = await auth()
    return (
        <section>
            <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full space-y-8">
                    <ProfileComponent user={session?.user as User} />
                </div>
            </div>
        </section>
    )
}
