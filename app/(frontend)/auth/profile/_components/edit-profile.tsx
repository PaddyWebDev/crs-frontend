import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import React, { useTransition } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema, validateFields } from '@/schemas/auth-schemas'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"


interface EditProfileProps {
    user: any
    userId: string
}

export default function EditProfile({ user, userId }: EditProfileProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const { data: session, update } = useSession()
    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            state: user.Address.state,
            district: user.Address.district,
            addressLine: user.Address.address,
            pincode: user.Address.pincode,
            village: user.Address.village
        }
    })

    async function handleData(formData: z.infer<typeof updateUserSchema>) {
        startTransition(async () => {
            const validatedFields = validateFields(formData, updateUserSchema)
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
                            ...session?.user,
                            email: validatedFields.email
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
        <Dialog >
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[60dvw] sm:max-w-[70dvw] bg-neutral-100 dark:bg-neutral-800 " >
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when {"you're"} done.
                    </DialogDescription>
                </DialogHeader>
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
                            name="addressLine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="123, Any Street In."
                                            disabled={isPending}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Updated Address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex items-center justify-between'>
                                            <h3>
                                                State
                                            </h3>
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="eg. Maharashtra" type="text" {...field} />
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
                                        <FormLabel className='flex items-center justify-between'>
                                            <h3>
                                                District
                                            </h3>
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="eg. Satara" type="text" {...field} />
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
                                        <FormLabel className='flex items-center justify-between'>
                                            <h3>
                                                Village
                                            </h3>
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="Village" {...field} />
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
                                        <FormLabel className='flex items-center justify-between'>
                                            <h3>
                                                Pincode
                                            </h3>
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isPending} placeholder="eg. 123456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button disabled={isPending} type='submit' >
                                {isPending ? "Loading..." : "Save Changes"}
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}