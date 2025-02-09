"use client"


import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { sendResetPassEmail } from '@/hooks/mail-hooks'
import { useToast } from '@/hooks/use-toast'
import { resetPassSchema } from '@/schemas/auth-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'



export default function ResetPassword() {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()

    const resetPassForm = useForm<z.infer<typeof resetPassSchema>>({
        resolver: zodResolver(resetPassSchema),
        defaultValues: {
            email: ""
        }
    })

    async function handleData(data: z.infer<typeof resetPassSchema>) {
        startTransition(async () => {
            await sendResetPassEmail(data)
                .then((data) => {
                    toast({
                        title: "Success",
                        description: data,
                        variant: "success"
                    })
                }).catch((error) => {
                    toast({
                        title: "Error Occurred",
                        description: error,
                        variant: "destructive"
                    })
                })
        })
    }

    return (
        <section className='md:w-[30rem] sm:w-[70%] w-[90%] dark:bg-zinc-800 bg-zinc-100 rounded shadow-md p-5 space-y-8'>
            <header className='text-center'>
                <h1 className='text-3xl font-semibold'>Reset Password</h1>
            </header>

            <div className='w-11/12 mx-auto'>
                <Form {...resetPassForm} >
                    <form className="space-y-6  " onSubmit={resetPassForm.handleSubmit(handleData)}>

                        <FormField
                            control={resetPassForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type='email' placeholder='john.doe@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button disabled={isPending} type='submit' className='w-full'>
                            {isPending ? ("Loading...") : ("Send Reset Password Link")}
                        </Button>

                    </form>
                </Form>
            </div>

            <footer>
                <Link className="text-zinc-900 underline-offset-4 text-sm  hover:underline cursor-pointer dark:text-zinc-50" href="/guest/Login">Back to Login</Link>
            </footer>
        </section>
    )
}
