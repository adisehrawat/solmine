import { useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { RefreshCw } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { useCluster } from '../cluster/cluster-data-access'
import { ExplorerLink } from '../cluster/cluster-ui'
import {
    useGetBalance,
    useGetSignatures,
    useGetTokenAccounts,
    useRequestAirdrop,
    useTransferSol,
} from './account-data-access'
import { ellipsify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AppAlert } from '@/components/app-alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AppModal } from '@/components/app-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AccountBalance({ address }: { address: PublicKey }) {
    const query = useGetBalance({ address })

    return (
        <h1 className="text-6xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text cursor-pointer" onClick={() => query.refetch()}>
            {query.data ? <BalanceSol balance={query.data} /> : '...'} SOL
        </h1>
    )
}

export function AccountChecker() {
    const { publicKey } = useWallet()
    if (!publicKey) {
        return null
    }
    return <AccountBalanceCheck address={publicKey} />
}

export function AccountBalanceCheck({ address }: { address: PublicKey }) {
    const { cluster } = useCluster()
    const mutation = useRequestAirdrop({ address })
    const query = useGetBalance({ address })

    if (query.isLoading) {
        return null
    }
    if (query.isError || !query.data) {
        return (
            <AppAlert
                action={
                    <Button variant="outline" onClick={() => mutation.mutateAsync(1).catch((err) => console.log(err))}>
                        Request Airdrop
                    </Button>
                }
            >
                You are connected to <strong>{cluster.name}</strong> but your account is not found on this cluster.
            </AppAlert>
        )
    }
    return null
}

export function AccountButtons({ address }: { address: PublicKey }) {
    return (
        <div>
            <div className="space-x-2">
                <ModalSend address={address} />
                <ModalReceive address={address} />
            </div>
        </div>
    )
}

export function AccountTokens({ address }: { address: PublicKey }) {
    const [showAll, setShowAll] = useState(false)
    const query = useGetTokenAccounts({ address })
    const client = useQueryClient()
    const items = useMemo(() => {
        if (showAll) return query.data
        return query.data?.slice(0, 5)
    }, [query.data, showAll])

    return (
        <div className="mx-6 mb-10 bg-slate-800/30 border-slate-700/50 border-1 backdrop-blur-sm">
            <div className="p-3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white pl-3">Token Accounts</h2>
                    <div className="space-x-2">
                        {query.isLoading ? (
                            <span className="loading loading-spinner text-slate-400 hover:text-white p-2"></span>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={async () => {
                                    await query.refetch()
                                    await client.invalidateQueries({
                                        queryKey: ['getTokenAccountBalance'],
                                    })
                                }}
                            >
                                <RefreshCw size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {query.isError && <pre className="alert alert-error">Error: {query.error?.message.toString()}</pre>}
            {query.isSuccess && (
                <div>
                    {query.data.length === 0 ? (
                        <div className='text-slate-400 pb-6 pl-6'>No token accounts found.</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Public Key</TableHead>
                                    <TableHead>Mint</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items?.map(({ account, pubkey }) => (
                                    <TableRow key={pubkey.toString()}>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <span className="font-mono">
                                                    <ExplorerLink label={ellipsify(pubkey.toString())} path={`account/${pubkey.toString()}`} />
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <span className="font-mono">
                                                    <ExplorerLink
                                                        label={ellipsify(account.data.parsed.info.mint)}
                                                        path={`account/${account.data.parsed.info.mint.toString()}`}
                                                    />
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className="font-mono">{account.data.parsed.info.tokenAmount.uiAmount}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {(query.data?.length ?? 0) > 5 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                                                {showAll ? 'Show Less' : 'Show All'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}
        </div>
    )
}

export function AccountTransactions({ address }: { address: PublicKey }) {
    const query = useGetSignatures({ address })
    const [showAll, setShowAll] = useState(false)

    const items = useMemo(() => {
        if (showAll) return query.data
        return query.data?.slice(0, 5)
    }, [query.data, showAll])

    return (
        <div className="mx-6 mb-6 bg-slate-800/30 border-slate-700/50 border-1 backdrop-blur-sm">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Transaction History</h2>
                    <div className="space-x-2">
                        {query.isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <Button variant="outline" onClick={() => query.refetch()}>
                                <RefreshCw size={16} />
                            </Button>
                        )}
                    </div>
                </div>

            </div>
            {query.isError && <pre className="alert alert-error">Error: {query.error?.message.toString()}</pre>}
            {query.isSuccess && (
                <div className='overflow-x-auto'>
                    {query.data.length === 0 ? (
                        <div>No transactions found.</div>
                    ) : (
                        <Table className='w-full'>
                            <TableHeader>
                                <TableRow className='border-b border-slate-700/50'>
                                    <TableHead className='text-left py-3 px-2 text-slate-400 font-medium'>Signature</TableHead>
                                    <TableHead className="text-left py-3 px-2 text-slate-400 font-medium">Slot</TableHead>
                                    <TableHead className='text-left py-3 px-2 text-slate-400 font-medium'>Block Time</TableHead>
                                    <TableHead className="text-right py-3 px-2 text-slate-400 font-medium">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items?.map((item) => (
                                    <TableRow key={item.signature} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200">
                                        <TableHead className="py-4 px-2">
                                            <ExplorerLink className='className="text-slate-300 font-mono text-sm' path={`tx/${item.signature}`} label={ellipsify(item.signature, 8)} />
                                        </TableHead>
                                        <TableCell className="py-4 px-2 text-slate-300">
                                            <ExplorerLink path={`block/${item.slot}`} label={item.slot.toString()} />
                                        </TableCell>
                                        <TableCell className='py-4 px-2 text-slate-300 text-sm'>{new Date((item.blockTime ?? 0) * 1000).toISOString()}</TableCell>
                                        <TableCell className="py-4 px-2 text-right">
                                            {item.err ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-red-400 border border-green-500/30" title={item.err.toString()}>
                                                    Failed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/30">Success</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(query.data?.length ?? 0) > 5 && (
                                    <TableRow className='mt-6 text-center'>
                                        <TableCell colSpan={4} className="text-slate-400 hover:text-white border border-slate-700/50 hover:bg-slate-700/30 transition-all duration-200">
                                            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                                                {showAll ? 'Show Less' : 'Show All'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}
        </div>
    )
}

function BalanceSol({ balance }: { balance: number }) {
    return <span>{Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000}</span>
}

function ModalReceive({ address }: { address: PublicKey }) {
    return (
        <AppModal title="Receive">
            <p>Receive assets by sending them to your public key:</p>
            <code>{address.toString()}</code>
        </AppModal>
    )
}


function ModalSend({ address }: { address: PublicKey }) {
    const wallet = useWallet()
    const mutation = useTransferSol({ address })
    const [destination, setDestination] = useState('')
    const [amount, setAmount] = useState('1')

    if (!address || !wallet.sendTransaction) {
        return <div>Wallet not connected</div>
    }

    return (
        <AppModal
            title="Send"
            submitDisabled={!destination || !amount || mutation.isPending}
            submitLabel="Send"
            submit={() => {
                mutation.mutateAsync({
                    destination: new PublicKey(destination),
                    amount: parseFloat(amount),
                })
            }}
        >
            <Label htmlFor="destination">Destination</Label>
            <Input
                disabled={mutation.isPending}
                id="destination"
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                type="text"
                value={destination}
            />
            <Label htmlFor="amount">Amount</Label>
            <Input
                disabled={mutation.isPending}
                id="amount"
                min="1"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                step="any"
                type="number"
                value={amount}
            />
        </AppModal>
    )
}
