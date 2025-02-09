"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, User, UserCircle } from "lucide-react"
import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import SignOutUser from '@/hooks/user-hooks'


type NavLink = {
    name: string;
    route: string
}

interface AuthNavbarProps {
    userName: string
}

export default function Navbar({ userName }: AuthNavbarProps) {
    const router = useRouter()
    const NavLinks: NavLink[] = [
        {
            name: "Recommendation System",
            route: "/auth/dashboard",
        },
        {
            name: "Yield Prediction",
            route: "/auth/yield-calculator",
        },
        {
            name: "Weather Forecast",
            route: "/auth/weather-forecast",
        },
    ]

    function returnFirstName(Name: string) {
        return Name.split(" ")[0]
    }
    return (
        <header
            className='fixed top-0  z-50 w-full shadow-sm border-b dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-800 border-neutral-50/60'
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
                            <div className='md:block hidden'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='cursor-pointer hover:underline underline-offset-4 ' >{returnFirstName(userName)}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className='cursor-pointer flex items-center font-light    gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md' onClick={() => router.push("/auth/profile")}>Profile <UserCircle className='h-5' /></DropdownMenuLabel>
                                        <DropdownMenuLabel className='cursor-pointer flex items-center font-light gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md' onClick={async () => SignOutUser()}> Logout <LogOut className='h-5' /></DropdownMenuLabel>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </nav>

                        <Sheet >
                            <SheetTrigger asChild className="border">
                                <Button size="icon" className="shrink-0 md:hidden flex ">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className='dark:bg-neutral-950 border-l  dark:border-neutral-700' side="right">
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
                                    } {
                                        <>
                                            <Button variant={"ghost"} className='cursor-pointer flex items-center justify-start py-0 px-2 gap-1' onClick={async () => router.push("/auth/profile")}>
                                                Profile <User />
                                            </Button>
                                            <Button variant={"ghost"} className='cursor-pointer flex items-center justify-start py-0 px-2 gap-1' onClick={async () => SignOutUser()}>
                                                Logout <LogOut />
                                            </Button>
                                        </>
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