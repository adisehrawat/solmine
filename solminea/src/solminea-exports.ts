// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolmineaIDL from './solminea.json'
import type { Solminea } from '../target/types/solminea'

// Re-export the generated IDL and type
export { Solminea, SolmineaIDL }

// The programId is imported from the program IDL.
export const SOLMINEA_PROGRAM_ID = new PublicKey(SolmineaIDL.address)

// This is a helper function to get the Basic Anchor program.
export function getSolmineaProgram(provider: AnchorProvider, address?: PublicKey): Program<Solminea> {
  return new Program({ ...SolmineaIDL, address: address ? address.toBase58() : SolmineaIDL.address } as Solminea, provider)
}

// This is a helper function to get the program ID for the Basic program depending on the cluster.
export function getSolmineaProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('CzotoFSpeyYweuFNHKWtMxiiiAeaQ6qQJ3CMC2iwitFp')
    case 'mainnet-beta':
    default:
      return SOLMINEA_PROGRAM_ID
  }
}
