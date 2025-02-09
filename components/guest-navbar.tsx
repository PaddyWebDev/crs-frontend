"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {  Menu } from "lucide-react"
import Link from 'next/link'


import { useRouter } from 'next/navigation'


type NavLink = {
    name: string;
    route: string
}


export default function GuestNavbar() {
    const NavLinks: NavLink[] = [
        {
            name: "Home",
            route: "/",
        },
        {
            name: "About Us",
            route: "/guest/about-us",
        },
        {
            name: "Contact Us",
            route: "/guest/contact-us",
        },
        {
            name: "Sign In / Register",
            route: "/guest/Login",
        },
    ]


    return (
        <header
            className='fixed top-0  z-50 w-full shadow-sm border-b bg-neutral-100 dark:bg-neutral-900 dark:border-gray-800/60 border-neutral-50/60'
        >
            <div className=" px-4   mx-5 ">
                <div className="flex justify-between py-4 ">
                    <div className="">
                        <div
                            className="group cursor-default inline-flex items-center gap-2 text-lg font-bold tracking-wide text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
                        >
                            <h1 className='dark:text-neutral-300 text-neutral-600 lg:leading-tighter  tracking-tighter font-bold text-lg'>CRS</h1>
                        </div>
                    </div>



                    <div className="flex  items-center gap-2 lg:gap-5">

                        <nav className="md:flex hidden  items-center gap-4 ">
                            {
                                NavLinks.map((navLink: NavLink, id: number) => (
                                    <Link
                                        key={id}
                                        className="text-sm font-medium hover:underline underline-offset-4  text-neutral-600 dark:text-neutral-300  cursor-pointer"
                                        href={navLink.route}
                                    >
                                        {navLink.name}
                                    </Link>
                                ))
                            }
                        </nav>

                        <Sheet >
                            <SheetTrigger asChild className="border">
                                <Button size="icon" className="shrink-0 md:hidden flex ">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className='dark:bg-gray-950 border-l  dark:border-gray-700' side="right">
                                <nav className="grid gap-6 text-lg font-medium mt-7">
                                    {
                                        NavLinks.map((navLink: NavLink, id: number) => (
                                            <Link
                                                key={id}
                                                className="text-sm font-medium hover:underline underline-offset-4 text-neutral-600 dark:text-neutral-300  cursor-pointer"
                                                href={navLink.route}
                                            >
                                                <SheetClose>
                                                    {navLink.name}
                                                </SheetClose>
                                            </Link>
                                        ))
                                    }
                                </nav>
                            </SheetContent>
                        </Sheet>


                    </div>

                </div>
            </div >
        </header >
    )
}