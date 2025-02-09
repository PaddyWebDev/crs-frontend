import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <section className=" bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-stone-800 dark:text-stone-100 sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 text-xl text-stone-600 dark:text-stone-300">
            Empowering farmers with data-driven crop recommendations
          </p>
        </div>

        <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/Images/download.jpg"
                  alt="Farmer in a field"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Our Mission</h2>
                <p className="text-stone-600 dark:text-stone-300">
                  {" At CRS, we're committed to revolutionizing agriculture through innovative technology. Our mission is to provide farmers with precise, data-driven crop recommendations, enhancing yield and promoting sustainable farming practices."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">Data-Driven Insights</h3>
              <p className="text-stone-600 dark:text-stone-300">
                We utilize advanced algorithms and machine learning to analyze soil conditions, climate data, and historical crop performance.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">Sustainable Farming</h3>
              <p className="text-stone-600 dark:text-stone-300">
                Our recommendations promote environmentally friendly practices, helping to preserve soil health and reduce resource waste.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">User-Friendly Platform</h3>
              <p className="text-stone-600 dark:text-stone-300">
               {" We've designed our system to be accessible and easy to use for farmers of all technological backgrounds."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">Our Team</h2>
            <p className="text-stone-600 dark:text-stone-300 mb-4">
              {"CropAdvisor is powered by a diverse team of agricultural experts, data scientists, and software engineers. We're passionate about bridging the gap between technology and agriculture to create a more sustainable and productive future."}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia'].map((name, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-stone-300 dark:bg-stone-600 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium text-stone-800 dark:text-stone-100">{name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  )
}
