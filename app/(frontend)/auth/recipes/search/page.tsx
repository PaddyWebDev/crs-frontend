'use client';

import React, { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validateFields } from '@/schemas/auth-schemas';
import axios from 'axios';
import Link from 'next/link';

// Zod schema for validation
const searchSchema = z.object({
  query: z.string().min(1, "Please enter a recipe to search"),
});

type SearchFormInputs = z.infer<typeof searchSchema>;


interface recipeType {
  id: string,
  name: string,
}


export default function RecipeSearchPage() {
  const [RecipeData, setRecipeData] = useState<Array<recipeType>>([])
  const form = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: '',
    },
  });



  async function handleFormSubmit(data: SearchFormInputs) {
    startTransition(async () => {
      try {
        const validatedFields = validateFields(data, searchSchema)
        const response = await axios.get(`/api/fetch-recipe?query=${validatedFields.query}`)
        setRecipeData(response.data.data)
      } catch (error: any) {
        form.setError("query", {
          type: 'custom',
          message: error.response.data
        })
      }
    })

  };

  return (
    <section className="">
      <div className='md:max-w-[50rem]  bg-neutral-100 shadow-md md:mt-[15dvh] mt-[5dvh] mx-auto flex flex-col items-center p-6 '>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Recipe Search</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="w-full max-w-md space-y-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search for a recipe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. chicken, pasta, salad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit"  >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      {
        RecipeData.length !== 0 && (
          <div className='md:max-w-[60rem]  bg-neutral-100 shadow-md mt-3 mx-auto flex items-center justify-evenly   flex-wrap   gap-2 p-6 '>
            {
              RecipeData?.map((recipe: recipeType, index: number) => (
                <Link className='px-3 py-2 bg-neutral-200 w-[25rem]' key={index} href={`/auth/recipes/get/${recipe.id}`}>
                  {recipe.name}
                </Link>
              ))
            }


          </div>
        )

      }


    </section>
  );
}


