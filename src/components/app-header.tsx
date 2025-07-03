import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'
import { Link, useLocation } from 'react-router'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
    const { pathname } = useLocation()
    const [showMenu, setShowMenu] = useState(false)
    function isActive(path: string) {
        return path === '/' ? pathname === '/' : pathname.startsWith(path)
    }

    return (
        <header className="relative z-50 px-15 py-5 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 flex-5">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-baseline gap-6">
                    <Link to="/" className="px-4 py-2 rounded-full bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 border border-slate-700/50">
                        <span>Solmine</span>
                    </Link>
                    <div className="hidden md:flex items-center">
                        <ul className="flex gap-4 flex-nowrap items-center ">
                            {links.map(({ label, path }) => (
                                <li key={path}>
                                    <Link
                                        className='px-4 py-2 rounded-full bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 border border-slate-700/50'
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

                {showMenu && (
                    <div className="md:hidden z-4 fixed inset-x-0 h-70 top-[80px] bottom-0 bg-slate-900 rounded-2xl backdrop-blur-sm">
                        <div className="flex flex-col z-4 p-4 gap-4 border-t dark:border-neutral-800">
                            <ul className="flex flex-col gap-4 items-center">
                                {links.map(({ label, path }) => (
                                    <li key={path}>
                                        <Link
                                            className={`hover:text-neutral-500 dark:hover:text-white block text-lg py-2  ${isActive(path) ? 'text-neutral-500 dark:text-white' : ''} `}
                                            to={path}
                                            onClick={() => setShowMenu(false)}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-4 items-center">
                                <WalletButton />
                                <ClusterUiSelect />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
