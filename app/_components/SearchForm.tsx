import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { homeSearchForm, validateFields } from '@/schemas/auth-schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Search } from 'lucide-react'


export default function SearchForm() {
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof homeSearchForm>>({
        resolver: zodResolver(homeSearchForm),
        defaultValues: {
            query: ""
        }
    })


    async function handleData(formData: z.infer<typeof homeSearchForm>) {
        startTransition(async () => {
            const validatedFields = validateFields(formData, homeSearchForm)
            console.log(validatedFields)
        })
    }
    return (
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="relative flex-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleData)}>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5" />
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Search for recipes"
                                            className="pl-12 pr-4 py-6 rounded-full border-none bg-transparent text-white placeholder:text-white/70 focus-visible:ring-primary/50 focus-visible:ring-offset-0"
                                        />
                                    </FormControl>
                                    <div className='absolute'>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-6 hidden sm:flex">
                            Search
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
