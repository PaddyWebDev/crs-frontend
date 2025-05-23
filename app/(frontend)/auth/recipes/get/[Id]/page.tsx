"use client";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, Users } from 'lucide-react';
import React from 'react'
import { BarLoader, BeatLoader, RotateLoader } from 'react-spinners';


interface FetchRecipesProps {
  params: { Id: string };
}



export default function FetchRecipes({ params }: FetchRecipesProps) {


  async function fetchRecipeDetails(id: string) {
    return await axios.get(`/api/fetch-recipe-details?id=${id}`)
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ['data', params.Id],
    queryFn: () => fetchRecipeDetails(params.Id),
    enabled: !!params.Id, // avoid running query on undefined

  });
  console.log(data)

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center  '>
        <BeatLoader />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className="flex flex-row text-red-500 bg-neutral-100 items-center gap-2 px-5 py-3 shadow-md text-2xl" >
          Error Occurred <ExclamationTriangleIcon className=' h-6 w-6' />
        </div>
      </div>
    )
  }
  const ingredients = data.data.recipe.ingredients.split(",");
  return (
    <section >
      <div className='mx-auto bg-neutral-100 md:max-w-[50rem] p-5 mt-[10dvh] rounded-sm'>
        <div className='my-3 flex items-center gap-2' >
          <Badge className='font-normal'  >
            {data.data?.recipe?.course}
          </Badge>
          <Badge className='font-normal'>
            {data.data?.recipe?.cuisine}
          </Badge>
          <Badge className='font-normal'>
            {data.data?.recipe?.diet}
          </Badge>
        </div>
        <h1 className='text-3xl font-bold'>
          {data.data?.recipe?.name}
        </h1>
        <div className='flex items-center flex-row gap-2 mt-2'>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{data.data?.recipe?.totalTimeInMins} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{data.data?.recipe?.servings} servings</span>
          </div>
        </div>


        <div>
          {/* Ingredients */}

          <Card className="max-w-xl mx-auto my-6 rounded-2xl shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ScrollArea className="h-64 pr-2">
                <ol className=" list-decimal  list-inside space-y-2 text-sm text-gray-700">
                  {
                    ingredients.map((item: string, index: number) => (
                      <li key={index}> {item}</li>
                    ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
