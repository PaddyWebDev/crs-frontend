"use client"
import React, { useEffect, useState } from 'react';
import { Sun, Wind, Droplets, Thermometer, CloudSun } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { getVillageOfUser, getWeatherDetails } from '@/hooks/user-hooks';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
export default function WeatherForecastComponent() {
  const { toast } = useToast();

  const { data } = useSession()

  const [weatherData, setWeatherData] = useState<any>(null)

  useEffect(() => {
    async function fetchWeatherData() {

      try {
        if (!data) {
          return <div>Loading...</div>
        }
        const res = await getVillageOfUser(data.user.id)

        setWeatherData(await getWeatherDetails(res!))
      } catch (error) {
        toast({
          title: "Error",
          description: "Error Occurred while fetching weather details",
          variant: "destructive"
        })
      }
    }

    fetchWeatherData()
  }, [data, toast])


  function getDayOfWeek(dateString: string): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format. Use 'YYYY-MM-DD'.");
    }
    return days[date.getDay()];
  };

  if (!weatherData || !data) {
    return <div>Loading....</div>
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100  dark:bg-neutral-950 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Weather Card */}
        <Card className="bg-neutral-50/80 dark:bg-neutral-800 backdrop-blur-lg mt-[15dvh]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">{weatherData.current?.city}</h1>
                <div className="mt-2 text-6xl font-light text-neutral-900 dark:text-neutral-100 ">
                  {weatherData.current?.temperature}°C
                </div>
                <p className="text-xl text-neutral-600 dark:text-neutral-200 mt-2">{weatherData.current?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                  <Wind className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-200">Wind</p>
                    <p className="text-lg font-medium">{weatherData.current?.wind} km/h</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-200">Humidity</p>
                    <p className="text-lg font-medium">{weatherData.current?.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {weatherData.forecast.map((day: any, index: number) => (
            <Card key={index} className="bg-neutral-100/80 dark:bg-neutral-800 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                <p className="font-medium text-neutral-600 dark:text-neutral-100">{getDayOfWeek(day.dt_txt)}</p>
                <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='weather icon' width={70} height={70} className=' shadow-lg rounded-md mx-auto my-4' />
                <p className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">{day.main.temp}°C</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-100 mt-1">{day.weather[0].main}</p>
              </CardContent>
            </Card>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-neutral-50/80 dark:bg-neutral-800 backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-100">Feels Like</p>
                  <p className="text-xl font-medium">{weatherData.current.feelsLike}°C</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-50/80 dark:bg-neutral-800 backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-100">Maximum Temperature</p>
                  <p className="text-xl font-medium">{weatherData.current.temp_max}°C</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-50/80 dark:bg-neutral-800 backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CloudSun className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-100">Minimum Temperature</p>
                  <p className="text-xl font-medium">{weatherData.current.temp_min}°C</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

