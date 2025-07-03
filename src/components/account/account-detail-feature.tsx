import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { ExplorerLink } from '../cluster/cluster-ui'
import { AccountBalance, AccountButtons, AccountTokens, AccountTransactions } from './account-ui'
import { AppHero } from '../app-hero'
import { ellipsify } from '@/lib/utils'
import { useParams } from 'react-router'
import { motion } from "framer-motion";

export default function AccountDetailFeature() {
    const params = useParams() as { address: string }
    const address = useMemo(() => {
        if (!params.address) {
            return
        }
        try {
            return new PublicKey(params.address)
        } catch (e) {
            console.log(`Invalid public key`, e)
        }
    }, [params])
    if (!address) {
        return <div>Error loading account</div>
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className='relative z-10'>
                <AppHero
                    title={<AccountBalance address={address} />}
                    subtitle={
                        <div className="my-4">
                            <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
                        </div>
                    }
                >
                    <div className="my-4">
                        <AccountButtons address={address} />
                    </div>
                </AppHero>
                <div className="space-y-8">
                    <AccountTokens address={address} />
                    <AccountTransactions address={address} />
                </div>
            </div>
        </motion.div>
    )
}
