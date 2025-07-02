use anchor_lang::prelude::*;
use anchor_lang::system_program;
pub mod errors;
use errors::GoalError;

declare_id!("CzotoFSpeyYweuFNHKWtMxiiiAeaQ6qQJ3CMC2iwitFp");

#[program]
pub mod solminea {
    use super::*;

    pub fn create_goal(ctx: Context<CreateGoal>, target_amount: u64, title: String, template: String) -> Result<()> {
        msg!("Goal: {} created for {} traget amount", title, target_amount);
        let goal = &mut ctx.accounts.goal;
        goal.owner = *ctx.accounts.owner.key;
        goal.target_amount = target_amount;
        goal.deposited_amount = 0;
        goal.is_completed = false;
        goal.title = title;
        goal.template = template;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, title: String, amount: u64) -> Result<()> {
        let goal = &mut ctx.accounts.goal;

        require!(goal.title == title, GoalError::TitleMismatch);

        system_program::transfer(
            CpiContext::new(ctx.accounts.system_program.to_account_info(), system_program::Transfer {
                from: ctx.accounts.owner.to_account_info(),
                to: goal.to_account_info(),
            }),
            amount
        )?;

        goal.deposited_amount = goal.deposited_amount.checked_add(amount).ok_or(GoalError::Overflow)?;

        if goal.deposited_amount >= goal.target_amount {
            goal.is_completed = true;
        }
        Ok(())
    }

    pub fn complete_goal(ctx: Context<CompleteGoal>, title: String) -> Result<()> {
        let goal = &mut ctx.accounts.goal;

        require!(goal.title == title, GoalError::TitleMismatch);

        require!(goal.is_completed, GoalError::CompleteGoalFirst);

        goal.is_completed = true;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(target_amount: u64, title: String)]
pub struct CreateGoal<'info> {
    #[account(init, payer = owner, space = 8 + Goal::LEN, seeds = [title.as_bytes(), owner.key().as_ref()], bump)]
    pub goal: Account<'info, Goal>,
    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct Deposit<'info> {
    #[account(
        mut, 
        seeds = [title.as_bytes(),owner.key().as_ref()],
         bump
        )]
    pub goal: Account<'info, Goal>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CompleteGoal<'info> {
    #[account(mut,
         seeds = [title.as_bytes(), owner.key().as_ref()], bump,
         close = owner,
        )]
    pub goal: Account<'info, Goal>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Goal {
    pub owner: Pubkey,
    pub title: String,
    pub target_amount: u64,
    pub template: String,
    pub deposited_amount: u64,
    pub is_completed: bool,
}

impl Goal {
    pub const MAX_TITLE_LEN: usize = 32;
    pub const MAX_TEMPLATE_LEN: usize = 128;
    pub const LEN: usize = 32 + 4 + Self::MAX_TITLE_LEN + Self::MAX_TEMPLATE_LEN + 8 + 8 + 1;
}
