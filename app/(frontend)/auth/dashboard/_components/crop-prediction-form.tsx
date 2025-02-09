"use client"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { crsRequestSchema, validateFields } from "@/schemas/auth-schemas"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"



export default function CropRecommendationForm() {
  const { data } = useSession()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const [Result, setResult] = useState<string>("")

  const form = useForm<z.infer<typeof crsRequestSchema>>({
    resolver: zodResolver(crsRequestSchema),
    defaultValues: {
      n: 0,
      p: 0,
      k: 0,
      ph: 0,
      soil_quality: undefined,
      district: "",
      village: "",
    },
  })

  async function onSubmit(formData: z.infer<typeof crsRequestSchema>) {
    startTransition(async () => {
      try {
        const validatedData = await validateFields(formData, crsRequestSchema)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ML_MODEL_URL!}`, validatedData)
        setResult(response.data.Success.prediction)

        await axios.post(`/api/recommendation-result?userId=${data?.user.id}`, {
          ...validatedData,
          prediction: response.data.Success.prediction
        })

        toast({
          title: "Success",
          description: "Your recommendation has been submitted successfully",
          variant: "success"
        })

      } catch (error) {
        toast({
          title: "Error",
          description: "error occurred while processing the request",
          variant: "destructive"
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-neutral-100 dark:bg-neutral-900 shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="n"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nitrogen (N)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isPending}
                    placeholder="0"
                    {...field}
                    className="bg-neutral-50 border-neutral-300"
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the nitrogen content in mg/kg.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="p"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phosphorus (P)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    disabled={isPending}
                    {...field}
                    className="bg-neutral-50 border-neutral-300"
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the phosphorus content in mg/kg.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="k"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potassium (K)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    disabled={isPending}
                    {...field}
                    className="bg-neutral-50 border-neutral-300"
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the potassium content in mg/kg.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pH</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="7"
                    disabled={isPending}
                    {...field}
                    className="bg-neutral-50 border-neutral-300"
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the pH value of the soil.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="soil_quality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soil Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => field.onChange(value)} // Explicitly set the value
                    disabled={isPending}
                  >
                    <SelectTrigger className="bg-neutral-50 border-neutral-300 dark:bg-neutral-950 dark:border-neutral-800 ">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {crsRequestSchema.shape.soil_quality.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-neutral-500">
                  Select the type of soil in your area.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your district" disabled={isPending} {...field} className="bg-neutral-50 border-neutral-300" />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the name of your district.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="village"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Village</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your village" disabled={isPending} {...field} className="bg-neutral-50 border-neutral-300" />
                </FormControl>
                <FormDescription className="text-neutral-500">Enter the name of your village.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isPending ? "Submitting..." : "Get Crop Recommendation"}
          </Button>
        </div>

        {
          Result && (
            <div className='flex flex-col items-center border p-10 rounded-md'>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">Result</h2>
              <p className='font-light'><strong >{Result}</strong> is your predicted Result</p>
            </div>
          )
        }
      </form>
    </Form >
  )
}

