import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'
import { Link } from 'react-router'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const [showMenu, setShowMenu] = useState(false)


  return (
    <header className="relative z-50 px-15 py-5 bg-gray-900 flex-5">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-baseline gap-4">
          <Link to="/" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-white/20 transition text-xl">
            <span>Solmine</span>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-4 flex-nowrap items-center ">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-xl shadow-lg hover:bg-white/20 transition text-xl'
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton />
          <ClusterUiSelect />
        </div>
      </div>
    </header>
  )
}
