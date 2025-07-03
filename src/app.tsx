import { AppProviders } from '@/components/app-providers.tsx'
import { AppLayout } from '@/components/app-layout.tsx'
import { RouteObject, useRoutes } from 'react-router'
import { lazy } from 'react'

const links = [
  { label: 'Goal', path: '/goal' },
  { label: 'Account', path: '/Account' },
  
]

const LazyAccountIndex = lazy(() => import('@/components/Account/account-index-feature'))
const LazyAccountDetail = lazy(() => import('@/components/Account/account-detail-feature'))
const LazyBasic = lazy(() => import('@/goal/goal-feature'))
const LazyDashboard = lazy(() => import('@/components/dashboard/dashboard-feature'))

const routes: RouteObject[] = [
  { index: true, element: <LazyDashboard /> },
  {
    path: 'Account',
    children: [
      { index: true, element: <LazyAccountIndex /> },
      { path: ':address', element: <LazyAccountDetail /> },
    ],
  },
  { path: 'goal', element: <LazyBasic /> },
]

console.log({ links, routes })

export function App() {
  const router = useRoutes(routes)
  return (
    <AppProviders>
      <AppLayout links={links}>{router}</AppLayout>
    </AppProviders>
  )
}
