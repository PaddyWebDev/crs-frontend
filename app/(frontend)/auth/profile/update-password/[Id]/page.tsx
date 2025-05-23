"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { authUpdatePasswordSchema, validateFields } from "@/schemas/auth-schemas"
import { z } from "zod"
import axios from 'axios'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UpdatePasswordProps {
    params: {
        Id: string
    }
}

export default function UpdatePassword({ params }: UpdatePasswordProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [passwordState, setPasswordState] = useState<boolean>(false)
    const updatePasswordForm = useForm<z.infer<typeof authUpdatePasswordSchema>>({
        resolver: zodResolver(authUpdatePasswordSchema),
        defaultValues: {
            existingPassword: "",
            password: "",
            confirmPassword: ""
        }
    })

    async function handlePasswordUpdate(values: z.infer<typeof authUpdatePasswordSchema>) {
        startTransition(async () => {
            const validatedData = validateFields(values, authUpdatePasswordSchema)
            console.log(validatedData)


            if (validatedData.password !== validatedData.confirmPassword) {
                updatePasswordForm.setError("confirmPassword", {
                    type: "custom",
                    message: "Password Doesn't match"
                })
                return
            }
            await axios.patch(`/api/update-password?userId=${params.Id}`, {
                oldPassword: validatedData.existingPassword,
                password: validatedData.password
            }).then((data) => {
                toast({
                    title: "Success",
                    description: "user updated successfully",
                    variant: "success"
                })
                updatePasswordForm.reset()
            }).catch((error) => {
                toast({
                    title: "Error Encountered",
                    description: "error occured while processing the request",
                    variant: "destructive"
                })
            })
        })
    }
    return (
        <section className="dark:bg-zinc-800 rounded-lg mx-auto w-full md:max-w-[30rem] mt-[10dvh] p-5 sm:p-6 md:p-8 space-y-8 shadow-2xl shadow-gray-500/50">

            <header className='flex flex-col'>
                <div className='flex flex-row  items-center '>
                    <Button onClick={() => router.push("/auth/profile")} className=' rounded-full ' variant={'ghost'} >
                        <ArrowLeftCircle />
                    </Button>
                    <h1 className='text-center text-3xl font-semibold mb-3 mt-4 '>Reset your password </h1>
                </div>
                <p className='text-base font-light text-center'>Below enter your new password</p>
            </header>


            <div className='w-11/12 mx-auto'>
                <Form {...updatePasswordForm} >
                    <form className="space-y-4  " onSubmit={updatePasswordForm.handleSubmit(handlePasswordUpdate)}>

                        <FormField
                            control={updatePasswordForm.control}
                            name="existingPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type={passwordState ? "text" : 'password'}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={updatePasswordForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type={passwordState ? "text" : 'password'}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={updatePasswordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type={passwordState ? "text" : 'password'}  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center space-x-2">
                            <Checkbox id="showPassword" onClick={() => setPasswordState(!passwordState)} />
                            <label
                                htmlFor="showPassword"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Show Password
                            </label>
                        </div>

                        <Button disabled={isPending} type='submit' className='w-full'>
                            {isPending ? ("Loading...") : ("Reset Password")}
                        </Button>

                    </form>
                </Form>
            </div>
        </section>
    )
}

