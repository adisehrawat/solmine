# 🚀 SolMine

> 💰 A decentralized goal-based savings platform built on the **Solana blockchain**.

SolMine empowers users to create financial goals, deposit SOL tokens towards those goals, and track their progress — all in a seamless and transparent on-chain experience.

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/ss1.png" alt="SolMine" width=300 />
    </td>
  </tr>
</table>

<CTAButton label="View on GitHub" to="https://github.com/adisehrawat/solmine.git" />

## ✨ Features

- 🎯 **Create Financial Goals** with a title, amount, and category
- 📥 **Deposit SOL** towards your goals
- 🔒 **Secure Smart Contract** using [Anchor](https://project-serum.github.io/anchor/)
- 📊 **Track Progress** visually on a modern UI
- 💻 **Next.js frontend** with Tailwind CSS and ShadCN UI
- 🔐 Wallet integration via Solana wallet adapter

---

## 🛠️ Tech Stack

| Tech             | Description                     |
|------------------|---------------------------------|
| [Solana](https://solana.com)         | Blockchain Layer |
| [Anchor](https://book.anchor-lang.com/)          | Smart Contract Framework |
| [Next.js](https://nextjs.org)        | Web Frontend |
| [React](https://reactjs.org)         | UI Framework |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [ShadCN UI](https://ui.shadcn.dev/)  | Component Library |
| [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter) | Wallet Connect |

---

## 📸 Demo

> Live demo: [https://solmine.xyz](https://solmine.xyz)  
> Test it locally using the guide below.

---

## 🧪 Local Development

### 🧩 Prerequisites

- Node.js `>=18`
- Rust
- Anchor CLI
- Solana CLI
- Git

### 🧰 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/adisehrawat/solmine.git
cd solmine

# 2. Install frontend dependencies
cd solmine
npm install

# 3. Install Anchor dependencies and build program
cd ../solmine-program
anchor build

# 4. Run a local Solana test validator
solana-test-validator

# 5. Deploy the Anchor program locally
anchor deploy

# 6. Start frontend
cd ../solmine-front
npm run dev
