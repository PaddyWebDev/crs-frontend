import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
export default function AuthErrorPage() {
    return (
        <section className='w-[30rem] shadow-md dark:bg-zinc-800 bg-zinc-100 rounded p-5 flex flex-col items-center space-y-6'>
            <header className='text-center space-y-2'>
                <div className='text-3xl font-semibold flex items-center dark:text-red-500  text-red-600 justify-center gap-3 '><ExclamationTriangleIcon className='h-7 w-7' /> <h1>Auth Error</h1></div>
                <h5 className='text-md'>Oops! Something went wrong!</h5>
            </header>
            <footer className=' mx-auto '>
                <Link className='flex items-center gap-1 text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50  ' href={"/guest/Login"}>  Back To Login</Link>
            </footer>
        </section >
    )
}
