"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { registerSchema, validateFields } from "@/schemas/auth-schemas"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"


export default function RegisterForm() {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [passwordState, setPasswordState] = useState<boolean>(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            state: "",
            district: "",
            addressLine: "",
            pincode: "",
            village: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        startTransition(async function () {
            const validatedFields = validateFields(values, registerSchema);
            await axios.post("/api/register", validatedFields)
                .then((data: any) => {
                    toast({
                        title: "Registration Successful",
                        description: "You have been registered to our system you'll shortly receive a confirmation email",
                        variant: "success"
                    })
                    form.reset();
                }).catch((error: any) => {
                    console.log(error);
                    toast({
                        title: "Error Occurred",
                        description: "error occurred while processing register request",
                        variant: "destructive"
                    })
                })
        })

    }

    return (
        <section>
            <Card className=" md:w-[70dvw] w-[90dvw] dark:bg-neutral-800 bg-neutral-100 shadow-lg rounded-lg overflow-hidden">
                <CardContent className="p-6">
                    <div className="mb-5 p-3">
                        <h1 className="text-3xl font-extrabold text-neutral-800 dark:text-neutral-50 mb-2">Register Form</h1>
                        <p className=" font-light dark:text-neutral-300">register to the system to get access to our services</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe"
                                                    disabled={isPending}
                                                    {...field} className="bg-neutral-50 border-neutral-300" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="your.email@example.com"
                                                    disabled={isPending}
                                                    {...field} className="bg-neutral-50 border-neutral-300" />
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
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1234567890"
                                                    disabled={isPending}
                                                    {...field} className="bg-neutral-50 border-neutral-300" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your State"
                                                    disabled={isPending}
                                                    {...field} className="bg-neutral-50 border-neutral-300" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                    <FormField
                                        control={form.control}
                                        name="addressLine"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>AddressLine</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Village"
                                                        disabled={isPending}
                                                        {...field} className="bg-neutral-50 border-neutral-300 h-10" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="village"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Village</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Village"
                                                        disabled={isPending}
                                                        {...field} className="bg-neutral-50 border-neutral-300 h-10" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="district"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>District</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your District"
                                                        disabled={isPending}
                                                        {...field} className="bg-neutral-50 border-neutral-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pincode</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={isPending}
                                                        placeholder="123456"
                                                        {...field} className="bg-neutral-50 border-neutral-300" />
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={passwordState ? "text" : "password"}
                                                        disabled={isPending}
                                                        placeholder="********"
                                                        {...field}
                                                        className="bg-neutral-50 border-neutral-300"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel >
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input disabled={isPending} placeholder="********" className="bg-neutral-50 border-neutral-300" type={passwordState ? "text" : "password"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex items-center space-x-2 mt-5">
                                        <Checkbox id="showPassword" onClick={() => setPasswordState(!passwordState)} />
                                        <label
                                            htmlFor="showPassword"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Show Password
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    size={"lg"}
                                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto"
                                >
                                    {isPending ? "Registering..." : "Register Now"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                </CardContent>
                <CardFooter className='flex items-center justify-center '>
                    <Link className="text-zinc-900 underline-offset-4 text-sm  hover:underline cursor-pointer dark:text-zinc-50" href={"/guest/Login"}>
                        {"Already Have an Account? Login"}
                    </Link>
                </CardFooter>
            </Card>
        </section>
    )
}

