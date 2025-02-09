"use client"
import React from 'react'
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { grain_weight, validateFields, yieldCalculatorSchema } from "@/schemas/auth-schemas"
import { useToast } from "@/hooks/use-toast"



export default function YieldCalculatorForm() {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [Result, setResult] = useState<number>()

    const form = useForm<z.infer<typeof yieldCalculatorSchema>>({
        resolver: zodResolver(yieldCalculatorSchema),
        defaultValues: {
            crop: undefined,
            avg: 0,
            num_grains: 0,
            weight_grains: 0,
        },
    })

    async function onSubmit(formData: z.infer<typeof yieldCalculatorSchema>) {
        startTransition(async () => {
            try {
                const { avg, num_grains, weight_grains } = await validateFields(formData, yieldCalculatorSchema)
                setResult(parseFloat(((avg * num_grains * weight_grains) / 10000).toFixed(2)))
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error",
                    description: "error occurred while processing the request",
                    variant: "destructive"
                })
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-neutral-100 dark:bg-neutral-900 shadow-lg rounded-lg p-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <FormField
                        control={form.control}
                        name="crop"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Crop</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value: string) => {
                                            form.setValue('weight_grains', grain_weight.find((grain: any) => grain.name === value)?.weight || 0)
                                            field.onChange(value)
                                        }} // Explicitly set the value
                                        disabled={isPending}
                                    >
                                        <SelectTrigger className="bg-neutral-50 border-neutral-300 dark:bg-neutral-950 dark:border-neutral-800 ">
                                            <SelectValue placeholder="Select your crop" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grain_weight.map((row: any, idx: number) => (
                                                <SelectItem key={idx} value={row.name}>
                                                    {row.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription className="text-neutral-500">
                                    Select your crop
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="avg"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Average</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        disabled={isPending}
                                        placeholder="0"
                                        {...field}
                                        className="bg-neutral-50 border-neutral-300"
                                    />
                                </FormControl>
                                <FormDescription className="text-neutral-500">Enter the nitrogen content in mg/kg.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="num_grains"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Grains </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        disabled={isPending}
                                        {...field}
                                        className="bg-neutral-50 border-neutral-300"
                                    />
                                </FormControl>
                                <FormDescription className="text-neutral-500">Enter the phosphorus content in mg/kg.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weight_grains"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight of Grains </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        disabled={isPending}
                                        {...field}
                                        className="bg-neutral-50 border-neutral-300"
                                    />
                                </FormControl>
                                <FormDescription className="text-neutral-500">Enter the potassium content in mg/kg.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        {isPending ? "Submitting..." : "Calculate Yield"}
                    </Button>
                </div>


                {
                    Result && (
                        <div className='flex flex-col items-center border p-10 rounded-md'>
                            <h2 className="text-lg font-bold text-neutral-800">Yield Calculation Result</h2>
                            <strong className=' font-light'>{Result} t/Ha</strong>
                        </div>
                    )
                }
            </form>
        </Form>
    )
}

