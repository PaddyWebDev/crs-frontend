"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import { LoginSchema, validateFields } from '@/schemas/auth-schemas'
import { useRouter } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useToast } from '@/hooks/use-toast'


export default function Login() {
        const { toast } = useToast()
        const router = useRouter()
        const [isPending, startTransition] = useTransition()
        const [passwordState, setPasswordState] = useState<boolean>(false)
        const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
                email: "",
                password: ""
            }
        })



    async function handleData(formData: z.infer<typeof LoginSchema>) {
        startTransition(async () => {
            const validatedFields = validateFields(formData, LoginSchema)
            await axios.post("/api/login", validatedFields)
                .then((data) => {
                    toast({
                        title: "Success",
                        description: data.data,
                        variant:"success"
                    })
                    router.push(DEFAULT_LOGIN_REDIRECT)
                }).catch((error) => {
                    toast({
                        title: "Error Occurred",
                        description: error.response.data,
                        variant: "destructive"
                    })
                })
        })
    }


    return (
        <section className='space-y-6 dark:bg-zinc-800 bg-zinc-100 shadow-md p-5 md:w-[25rem] rounded '>
            <div className=' text-center'>
                <h1 className={"text-4xl font-semibold drop-shadow-md"}>
                    CRS
                </h1>
                <h3 className='text-sm font-normal'>Welcome Back</h3>
            </div>
            <Form {...form} >
                <form className="space-y-6  " onSubmit={form.handleSubmit(handleData)}>
                    <FormField
                        control={form.control}
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
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='flex items-center justify-between'>
                                    <h3>
                                        Password
                                    </h3>

                                    <Link className="text-zinc-900 underline-offset-4 text-sm  hover:underline cursor-pointer dark:text-zinc-50" href={"/guest/forgot-password"}>
                                        Forgot Password?
                                    </Link>
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="********" type={passwordState ? "text" : "password"} {...field} />
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
                        {isPending ? "Loading..." : "Submit"}
                    </Button>

                </form>
            </Form>
            <div className='flex items-center justify-center '>
                <Link className="text-zinc-900 underline-offset-4 text-sm  hover:underline cursor-pointer dark:text-zinc-50" href={"/guest/Register"}>
                    {"Don't Have an Account? Register"}
                </Link>
            </div>


        </section >
    )
}
