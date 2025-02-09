import CropRecommendationForm from './_components/crop-prediction-form'

export default function CropRecommendationPage() {
  return (
    <div className="min-h-screen bg-neutral-50   dark:bg-neutral-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 sm:mt-0 mt-[25dvh]">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-neutral-800 dark:text-neutral-50 sm:text-5xl md:text-6xl">
            Crop Recommendation System
          </h1>
          <p className="mt-3 text-xl text-neutral-600 dark:text-neutral-400 sm:mt-5">
            Enter your soil details to get personalized crop recommendations
          </p>
        </div>
        <CropRecommendationForm />
      </div>
    </div>
  )
}
