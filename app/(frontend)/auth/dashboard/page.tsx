"use client"

import RecipeRecommendationForm from "./_components/RecipeRecommendationForm"

export default function CropRecommendationPage() {
  return (
    <div className="min-h-screen bg-neutral-50   dark:bg-neutral-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 sm:mt-0 ">
        <RecipeRecommendationForm />
      </div>
    </div>
  )
}
