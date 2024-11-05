import assert from 'assert';
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CalculatorDapp } from "../target/types/calculator_dapp";

describe('calculator-dapp', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalculatorDapp as Program<CalculatorDapp>;

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers: [calculator]
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome To Solana");
  })
})
