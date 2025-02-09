'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contactSchema, validateFields } from '@/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';



export default function ContactUS() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
    }
  })


  async function handleData(formData: z.infer<typeof contactSchema>) {
    startTransition(async () => {
      const validatedFields = validateFields(formData, contactSchema)
      await axios.post("/api/contact-form", validatedFields)
        .then((data) => {
          toast({
            title: "Success",
            description: data.data,
            variant: "success"
          })

          form.reset()
        }).catch((error) => {
          toast({
            title: "Error Occurred",
            description: error.response.data,
            variant: "destructive"
          })
        })
    })
  }


  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="container absolute mx-auto px-4 grid md:grid-cols-2 gap-8 py-16">
        <div className="bg-neutral-100/90 dark:bg-neutral-800 p-8 rounded-2xl shadow-lg backdrop-blur-md">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">Get in Touch</h1>
          <p className="text-gray-700 mb-6">{"We're"} here to help you optimize your crop yields with AI-powered recommendations.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-800 dark:bg-green-400 text-white rounded-full">📍</div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p>123 Agriculture Avenue, Green City, 12345</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-800 dark:bg-green-400 text-white rounded-full">📧</div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>support@croprecommend.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-green-800 dark:bg-green-400 text-white rounded-full">📱</div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-100/90 dark:bg-neutral-800 p-8 rounded-2xl shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Send us a Message</h2>

          <Form {...form} >
            <form className="space-y-6  " onSubmit={form.handleSubmit(handleData)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} placeholder='John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} type='email' placeholder='john.doe@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea disabled={isPending} placeholder='Your Message' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type='submit' className='w-full'>
                {isPending ? "Loading..." : "Submit"}
              </Button>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

