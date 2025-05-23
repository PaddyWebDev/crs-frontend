"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchUserDetails } from "@/hooks/user-hooks"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { User } from "next-auth"


interface ProfileComponentProps {
    user: User
}

export default function ProfileComponent({ user }: ProfileComponentProps) {
    const router = useRouter();
    const { data, error, isLoading } = useQuery({
        queryKey: ["userDetails", user.id], // Unique key for caching
        queryFn: () => fetchUserDetails(user.id!), // Function to fetch data
        enabled: !!user.id, // Runs query only if userId is available
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        retry: 2, // Retry failed requests up to 2 times
    });



    if (isLoading) return (
        <div className="w-full text-center h-full">Loading...</div>
    )
    if (error) return <div className="text-red-500">Error fetching user details.</div>;

    if (!data) {
        return <div className="text-red-500">Error fetching user details.</div>;
    }

    return (
        <section>
            <div className="text-center">
                <h1 className="text-2xl font-extrabold  text-neutral-800 dark:text-neutral-50 sm:text-5xl md:text-6xl">User Profile</h1>
                <p className="mt-3 text-xl text-neutral-600 sm:mt-5">View your information and past crop recommendations</p>
            </div>
            {(data || data !== null || data !== undefined) &&
                <Card className="w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="p-7 dark:bg-neutral-950 border-b bg-neutral-200   border-neutral-200">

                        <div className="flex items-center space-x-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src="/placeholder.svg" alt="User" />
                                <AvatarFallback>{data.name[0]!}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                                <CardDescription>Member since {new Date(data.createdAt).getUTCFullYear()}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full mt-6">
                            <div className="mt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50 ">Contact Information</h3>
                                        <div className="grid md:grid-cols-2 grid-cols-1">
                                            <p className="text-neutral-600 dark:text-neutral-200"><strong>Email:</strong> {user.email}</p>
                                            <p className="text-neutral-600 dark:text-neutral-200"><strong>Phone:</strong> (+91) {data.phoneNumber}</p>
                                            <p className="text-neutral-600 dark:text-neutral-200"><strong>Gender:</strong> {data.gender}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            }
        </section>

    )
}
