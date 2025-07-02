import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";
import { Keypair, LAMPORTS_PER_SOL, type PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { Solminea } from "../target/types/solminea";

describe("solmine", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = anchor.AnchorProvider.env().connection;
  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Solminea as Program<Solminea>;

  // Test variables
  const goalTitle = "AdityaGoal";
  const targetAmount = new anchor.BN(1_000_000_000);
  const goalTemplate = "Security";
  let goalPda: anchor.web3.PublicKey;
  let goalBump: number;
  const owner = user;

  const newKeypair = new Keypair();

  [goalPda, goalBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(goalTitle), owner.publicKey.toBuffer()],
    program.programId
  );

  it("Creates a goal", async () => {
    const tx1 = await program.methods
      .createGoal(targetAmount, goalTitle, goalTemplate)
      .accounts({
        goal: goalPda,
        owner: owner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc();

    const goalAccount = await program.account.goal.fetch(goalPda);
    assert.equal(goalAccount.owner.toBase58(), owner.publicKey.toBase58());
    assert.equal(goalAccount.title, goalTitle);
    assert.equal(goalAccount.template, goalTemplate);
    assert.ok(goalAccount.targetAmount.eq(targetAmount));
    assert.ok(goalAccount.depositedAmount.eq(new anchor.BN(0)));
    assert.equal(goalAccount.isCompleted, false);
    console.log("onwer pubkey: ");
    console.log(owner.publicKey);
    console.log("goal pubkey: ");
    console.log(goalPda);
    await getBalance(owner.publicKey, 'Owner starting');
    await getBalance(goalPda, 'goal starting');
    console.log("goal created successfully");
    console.log(targetAmount.toNumber());
    console.log(`deposit in goal transaction: ${tx1}`);
  });

  it("Deposits into the goal", async () => {
    await getBalance(owner.publicKey, 'Owner starting');
    await getBalance(goalPda, 'goal starting');
    const depositAmount = new anchor.BN(1_000_000_000);
    console.log(depositAmount.toNumber());

    const tx2 = await program.methods
      .deposit(goalTitle,depositAmount)
      .accounts({
        goal: goalPda,
        owner: owner.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc();

    const goalAccount = await program.account.goal.fetch(goalPda);
    await getBalance(owner.publicKey, 'Owner Resulting');
    await getBalance(goalPda, 'goal Resulting');
    assert.ok(goalAccount.depositedAmount.eq(depositAmount));
    console.log(`deposit in goal transaction: ${tx2}`);
  });

  
  it("Completes goal successfully", async () => {
    await getBalance(owner.publicKey, 'Owner starting');
    await getBalance(goalPda, 'goal starting');
    const tx3 = await program.methods
      .completeGoal(goalTitle)
      .accounts({
        goal: goalPda,
        owner: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([])
      .rpc();

    try {
      await program.account.goal.fetch(goalPda);
      assert.fail("Account should be closed");
    } catch (err) {
      assert.include(err.message, "Account does not exist");
    }
    await getBalance(owner.publicKey, 'Owner Resulting');
    await getBalance(goalPda, 'goal Resulting');
    console.log(`complete goal transaction: ${tx3}`);
  });

  async function getBalance(pubkey: anchor.web3.PublicKey, label = "Account") {
  const lamports = await connection.getBalance(pubkey);
  const sol = lamports / 1_000_000_000;
  console.log(`${label} Balance: ${sol} SOL (${lamports} lamports)`);
}
});
