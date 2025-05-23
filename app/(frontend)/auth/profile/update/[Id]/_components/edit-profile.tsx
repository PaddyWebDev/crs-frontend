"use client"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import React, { useTransition } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema, validateFields } from '@/schemas/auth-schemas'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ArrowLeftCircle } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface UpdateProfileComponentProps {
    userId: string
    userDetails: any
}

export default function RenderUpdateProfileComponent({ userDetails, userId }: UpdateProfileComponentProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const { data: session, update } = useSession()
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: userDetails.name!,
            email: userDetails.email!,
            phoneNumber: userDetails.phoneNumber,
            gender: userDetails.gender
        }
    })

    async function handleData(formData: z.infer<typeof updateUserSchema>) {
        startTransition(async () => {
            const validatedFields = validateFields(formData, updateUserSchema)

            const noChanges =
                validatedFields.email === userDetails.email &&
                validatedFields.phoneNumber === userDetails.phoneNumber &&
                validatedFields.name === userDetails.name &&
                validatedFields.gender === userDetails.gender

            console.log(noChanges)

            if (noChanges) {
                form.setError("email", {
                    type: "custom",
                    message: "No Changes Detected"
                })
                form.setError("phoneNumber", {
                    type: "custom",
                    message: "No Changes Detected"
                })
                form.setError("gender", {
                    type: "custom",
                    message: "No Changes Detected"
                })
                form.setError("name", {
                    type: "custom",
                    message: "No Changes Detected"
                })
                return;
            }

            await axios.put(`/api/update-user?userId=${userId}`, validatedFields)
                .then(async (data) => {
                    toast({
                        title: "Success",
                        description: "your data is updated successfully",
                        variant: "success"
                    })
                    await update({
                        ...session,
                        user: {
                            name: validatedFields.name,
                            email: validatedFields.email,
                            ...session?.user,
                        },
                    })
                }).catch((error: any) => {
                    console.log(error);
                    toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive"
                    })
                })
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-[12dvh] shadow-lg p-4 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300">
            <header>
               
                <div className="flex items-center justify-start">
                    <Button onClick={() => router.push("/auth/profile")} className=' rounded-full ' variant={'link'} >
                        <ArrowLeftCircle />
                    </Button>

                    <h1 className="text-2xl font-bold">Update Profile</h1>
                </div>
                <h5 className="text-sm my-4 text-gray-600">
                    Below is the update form. Please fill in the required details to update your profile information.
                    Ensure that all fields are accurate before submitting.
                </h5>
            </header>

            <Form {...form} >
                <form className="space-y-6  " onSubmit={form.handleSubmit(handleData)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder='John Doe' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 ">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center justify-between'>
                                        <h3>
                                            Email
                                        </h3>
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="john@example.email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex items-center justify-between'>
                                        <h3>
                                            Phone Number
                                        </h3>
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="1234567890" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                        {...field}>
                                        <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div>
                        <Button disabled={isPending} type='submit' >
                            {isPending ? "Loading..." : "Save Changes"}
                        </Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}
