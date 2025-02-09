"use client"

import GuestNavbar from "@/components/guest-navbar";
import FeatureSection from "./_components/FeatureSection";
import ImageCarousel from "./_components/ImageCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {


  return (
    <main className="">
      <GuestNavbar />
      <section className="flex min-h-screen flex-col items-center justify-between mt-[10dvh] ">

        <section className="relative md:max-h-[95dvh] mb-[5vh]">
          <ImageCarousel />
          <div className="absolute  mb-32 bottom-0 left-0 right-0  mx-auto   flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Crop Recommendation System</h1>
              <p className="text-xl md:text-2xl mb-8">Intelligent Crop Recommendations for Smarter Farming</p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/guest/Login">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
        <FeatureSection />

        <section className="py-16 px-4 bg-white dark:bg-stone-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-stone-800 dark:text-stone-100">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Input Your Data", description: "Provide information about your soil, climate, and location." },
                { title: "Get Recommendations", description: "Our AI analyzes your data to suggest the best crops." },
                { title: "Improve Yield", description: "Follow our advice to optimize your farming practices." },
              ].map((step, index) => (
                <Card key={index} className="bg-stone-50 dark:bg-stone-700">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-green-600 mb-4">{index + 1}</div>
                    <h3 className="text-xl font-semibold mb-2 text-stone-800 dark:text-stone-100">{step.title}</h3>
                    <p className="text-stone-600 dark:text-stone-300">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


      </section>
    </main>
  );
}
