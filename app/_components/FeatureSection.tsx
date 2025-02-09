import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, BarChart, Cloud } from "lucide-react"


const features = [
    {
      icon: Leaf,
      title: "Crop Recommendations",
      description: "Get personalized crop suggestions based on your soil type and local climate conditions.",
    },
    {
      icon: BarChart,
      title: "Yield Predictions",
      description: "Estimate your potential crop yield using advanced machine learning algorithms.",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Access real-time weather data to make informed decisions about planting and harvesting.",
    },
  ]
export default function FeatureSection() {

  return (
    <section className="py-16 px-4 bg-stone-50 dark:bg-stone-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800 dark:text-stone-100">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-stone-700">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-xl font-semibold text-stone-800 dark:text-stone-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-600 dark:text-stone-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}



