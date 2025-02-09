"use client"
import { updatePasswordSchema } from '@/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { redirect, useSearchParams } from 'next/navigation'
import { updatePassword } from '@/hooks/reset-pass'
import { useToast } from '@/hooks/use-toast'

export default function ResetPassword() {
    const { toast } = useToast()
    const token: string | null = useSearchParams().get("token")
    useEffect(() => {
        if (!token) {
            redirect("/guest/Login")
        }
    }, [token])

    const [isPending, startTransition] = useTransition()
    const [passwordState, setPasswordState] = useState<boolean>(false)
    const updatePasswordForm = useForm<z.infer<typeof updatePasswordSchema>>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    async function handleData(data: z.infer<typeof updatePasswordSchema>) {
        startTransition(async () => {
            await updatePassword(data, token as string)
                .then((data: any) => {
                    toast({
                        title: "Success",
                        description: data,
                        variant:"success"
                    })
                    updatePasswordForm.reset()
                    // redirect("/guest/Login")
                })
                .catch((error: any) => {
                    toast({
                        title: "Error Occurred",
                        description: error,
                        variant: "destructive"
                    })
                })
        })
    }
    return (
        <section className='dark:bg-zinc-800 rounded     w-[30rem] p-5 space-y-8'>
            <header>
                <h1 className='text-center text-3xl font-semibold mb-3 '>Reset your password </h1>
                <p className='text-base font-light text-center'>Below enter your new password</p>
            </header>


            <div className='w-11/12 mx-auto'>
                <Form {...updatePasswordForm} >
                    <form className="space-y-6  " onSubmit={updatePasswordForm.handleSubmit(handleData)}>

                        <FormField
                            control={updatePasswordForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type={passwordState ? "text" : 'password'} placeholder='**********' {...field} />
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
                                        <Input disabled={isPending} type={passwordState ? "text" : 'password'} placeholder='**********' {...field} />
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
            <footer>
                <Link className="text-zinc-900 underline-offset-4 text-sm  hover:underline cursor-pointer dark:text-zinc-50" href={"/guest/Login"}>Back to Login</Link>
            </footer>
        </section>
    )
}
