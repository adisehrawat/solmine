import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import { AppHeader } from '@/components/app-header'
import React from 'react'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/Account/account-ui'

export function AppLayout({
    children,
    links,
}: {
    children: React.ReactNode
    links: { label: string; path: string }[]
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen bg-gray-900 p-0">
                <div>
                    <AppHeader links={links} />
                </div>
                
                <main className="flex-grow w-full mx-auto">
                    <ClusterChecker>
                        <AccountChecker />
                    </ClusterChecker>
                    {children}
                </main>
            </div>
            <Toaster />
        </ThemeProvider>

    )
}
