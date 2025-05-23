"use client"


import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { useSuspenseQuery } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Image from 'next/image'
import React from 'react'

interface CategoryProps {
    searchParams: {
        query?: string
    }
}


export default function CategoryPage({ searchParams }: CategoryProps) {
    return (
        <React.Suspense fallback={<h2>Loading Data...</h2>}>
            <RecipeByCategory searchQuery={searchParams.query!} />
        </React.Suspense>
    )
}


interface RecipeByCategoryProps {
    searchQuery: string;
}

type recipe = {
    id: number;
    image: string;
    imageType: string;
    title: string;
}

const errorCodesArray: Array<number> = [400, 401, 402]

function RecipeByCategory({ searchQuery }: RecipeByCategoryProps) {
    async function fetchData() {
        try {

            const response: AxiosResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?type=${searchQuery}`, {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_SPOONCULAR_API_KEY
                },
                maxBodyLength: Infinity,
            });

            if (errorCodesArray.includes(response.status)) {
                throw new Error("Error Occured while Processing the request")
            }

            return response.data
        } catch (error: any) {

            if (error as AxiosError) {
                error.response.data
                const axiosError = error as AxiosError;
                console.error('Fetch Error:', axiosError?.message || error);

                // Always return a consistent shape
                return { results: [] };
            }
        }
    }
    const { data, error } = useSuspenseQuery({
        queryKey: ['results'], queryFn: fetchData
    })

    if (error) {
        return <div className="text-red-500 text-center">⚠ {error.message}</div>;
    }
    return (
        <main className='w-full' >

            <div className="grid w-full gap-5 mt-[70dvh] border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    data?.results.length > 0 ? (
                        data.results.map((recipe: recipe) => (
                            <div key={recipe.id}>
                                <Card>
                                    <CardContent>
                                        <CardHeader>
                                            <Image src={recipe.image} width={300} height={200} alt='recipe images' />
                                        </CardHeader>
                                        <CardDescription>
                                            <h1>{recipe.title}</h1>
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full">No recipes found.</p>
                    )
                }
            </div>

        </main>
    )
}
