use anchor_lang::prelude::*;

#[error_code]
pub enum GoalError {
    #[msg("Only the owner can perform this action")]
    Unauthorized,
    #[msg("Complete goal first")]
    CompleteGoalFirst,
    #[msg("Wrong token mint")]
    WrongTokenMint,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Missing account")]
    MissingAccount,
    #[msg("Title missmatch")]
    TitleMismatch,
    #[msg("overflow")]
    Overflow,
    #[msg("missing goal bump")]
    MissingBump,
    #[msg("Overflow in goal")]
    OverflowInGoal,

}