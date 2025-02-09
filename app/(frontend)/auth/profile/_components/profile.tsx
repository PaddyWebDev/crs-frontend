"use client"

import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "next-auth"
import EditProfile from "./edit-profile"
import { fetchUserDetails } from "@/hooks/user-hooks"





interface ProfileComponentProps {
    user: User
}

export default function ProfileComponent({ user }: ProfileComponentProps) {
    const [userData, setUserData] = useState<any>(null);
    const getUserDetails = useCallback(async () => {
        if (!user?.id || userData) return; // Prevent redundant API calls
        try {
            const data = await fetchUserDetails(user.id);
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
        }
    }, [user?.id, userData]);

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <section>
            <div className="text-center">
                <h1 className="text-3xl font-extrabold  text-neutral-800 dark:text-neutral-50 sm:text-5xl md:text-6xl">Farmer Profile</h1>
                <p className="mt-3 text-xl text-neutral-600 sm:mt-5">View your information and past crop recommendations</p>
            </div>
            <Card className="w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="pb-0 dark:bg-neutral-950">

                    <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/placeholder.svg" alt="Farmer" />
                            <AvatarFallback>{userData?.name[0]!}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                            <CardDescription>Member since {new Date(userData.createdAt).getUTCFullYear()}</CardDescription>
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
                                        <p className="text-neutral-600 dark:text-neutral-200"><strong>Phone:</strong> (+91) {userData.phoneNumber}</p>
                                    </div>
                                </div>
                                <div >
                                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-50">Address Details</h3>
                                    <div className="grid md:grid-cols-2 grid-cols-1">
                                        <p className="text-neutral-600 dark:text-neutral-200"><strong>Location:</strong> {userData.Address.address}</p>
                                        <p className="text-neutral-600 dark:text-neutral-200"><strong>District:</strong> {userData.Address.district}</p>
                                        <p className="text-neutral-600 dark:text-neutral-200"><strong>State:</strong> {userData.Address.state}</p>
                                        <p className="text-neutral-600 dark:text-neutral-200"><strong>Pin-Code:</strong> {userData.Address.pincode}</p>
                                    </div>
                                    {/* <p className="text-neutral-600">Farm Size: 500 acres</p> */}
                                </div>
                                {/* <div>
                                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Soil Information</h3>
                                    <p className="text-neutral-600">Primary Soil Type: Loam</p>
                                    <p className="text-neutral-600">Average pH: 6.8</p>
                                </div> */}

                                <EditProfile user={userData} userId={user?.id!} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

    )
}

{/* <TabsContent value="recommendations" className="mt-6">
                        <div className="space-y-4">
                            {pastRecommendations.map((rec) => (
                                <Card key={rec.id} className="bg-neutral-50">
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="font-semibold text-stone-800">{rec.crop}</p>
                                            <p className="text-sm text-stone-600">{rec.date}</p>
                                        </div>
                                         <Badge variant="secondary" className="bg-stone-200 text-stone-800">
                                            {(rec.confidence * 100).toFixed(0)}% Confidence
                                        </Badge> 
                                    </CardContent>
                                </Card>
                            ))}
                            <Button className="mt-4 bg-stone-800 hover:bg-stone-700 text-white">View All Recommendations</Button>
                        </div>
                    </TabsContent> */}