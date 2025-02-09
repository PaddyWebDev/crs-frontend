import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'
import React from 'react'

interface ToastProviderProps {
    children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
        </ThemeProvider>
    )
}
