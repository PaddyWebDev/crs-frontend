import React, { useTransition } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IngredientInputField } from './IngredientInputField';
import { recipeFormSchema, validateFields } from '@/schemas/auth-schemas';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function RecipeRecommendationForm() {
    const dietValues: Array<string> = ["Vegetarian", "Non Vegetarian"]
    const cuisineValues: Array<string> = ["Italian", "Indian"]
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    type RecipeFormSchema = z.infer<typeof recipeFormSchema>;

    const form = useForm<RecipeFormSchema>({
        resolver: zodResolver(recipeFormSchema),
        defaultValues: {
            Ingredients: [],
            cookingTime: "",
            cuisine: "",
            diet: ""
        },
    });

    async function onSubmit(data: RecipeFormSchema): Promise<void> {
        startTransition(async function () {
            try {
                setTimeout(() => {
                    console.log("joe")
                }, 25000);
                const validatedInput = validateFields(data, recipeFormSchema)
                console.log("Submitted Ingredients:", validatedInput);
                toast({
                    title: "Recipe Recommendation Form Submitted",
                })
                //Todo: send data to backend for recipe recommendation 
            } catch (error) {

            }
        })
    }
    return (
        <div className="mx-auto bg-neutral-100 p-5 max-w-[60rem] shadow-md rounded-md">
            <h1 className="text-2xl text-center my-4 font-extrabold text-neutral-800 dark:text-neutral-50 ">
                Recipe Recommendation System
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="Ingredients"
                        render={({ field }) => (
                            <FormItem>
                                <IngredientInputField isDisabled={isPending} value={field.value} onChange={field.onChange} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cookingTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Cooking Time
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isPending}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid md:grid-cols-2 gap-3'>
                        <FormField
                            control={form.control}
                            name="cuisine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cuisine</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                            {...field}>
                                            <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                                <SelectValue placeholder="Select your Cuisine" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Cuisine</SelectLabel>
                                                    {
                                                        cuisineValues.map((cuisine: string, index: number) => (
                                                            <SelectItem value={cuisine}>
                                                                {cuisine}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diet"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diet</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                            {...field}>
                                            <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                                <SelectValue placeholder="Select your Diet" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Diet</SelectLabel>
                                                    {
                                                        dietValues.map((diet: string, index: number) => (
                                                            <SelectItem value={diet}>
                                                                {diet}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
