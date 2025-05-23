import { auth } from "@/auth"
import React from "react"
import ProfileComponent from "./_components/profile"
import Sidebar from "../../../../components/auth-sidebar"
import { User } from "next-auth"

export default async function Settings() {
    const session = await auth()
    return (
        <section className="w-full bg-neutral-100 dark:bg-neutral-950 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 py-10">
                <main className="flex-1 flex items-center justify-center">
                    <div className="max-w-4xl w-full space-y-8">
                        <ProfileComponent user={session?.user as User} />
                    </div>
                </main>
            </div>
        </section>
    )
}
