/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solminea.json`.
 */
export type Solminea = {
  "address": "CzotoFSpeyYweuFNHKWtMxiiiAeaQ6qQJ3CMC2iwitFp",
  "metadata": {
    "name": "solminea",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "completeGoal",
      "discriminator": [
        140,
        54,
        173,
        125,
        210,
        162,
        67,
        228
      ],
      "accounts": [
        {
          "name": "goal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "createGoal",
      "discriminator": [
        229,
        63,
        42,
        239,
        1,
        226,
        219,
        196
      ],
      "accounts": [
        {
          "name": "goal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "targetAmount",
          "type": "u64"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "template",
          "type": "string"
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "goal",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "goal",
      "discriminator": [
        163,
        66,
        166,
        245,
        130,
        131,
        207,
        26
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Only the owner can perform this action"
    },
    {
      "code": 6001,
      "name": "completeGoalFirst",
      "msg": "Complete goal first"
    },
    {
      "code": 6002,
      "name": "wrongTokenMint",
      "msg": "Wrong token mint"
    },
    {
      "code": 6003,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    },
    {
      "code": 6004,
      "name": "missingAccount",
      "msg": "Missing account"
    },
    {
      "code": 6005,
      "name": "titleMismatch",
      "msg": "Title missmatch"
    },
    {
      "code": 6006,
      "name": "overflow",
      "msg": "overflow"
    },
    {
      "code": 6007,
      "name": "missingBump",
      "msg": "missing goal bump"
    },
    {
      "code": 6008,
      "name": "overflowInGoal",
      "msg": "Overflow in goal"
    }
  ],
  "types": [
    {
      "name": "goal",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "targetAmount",
            "type": "u64"
          },
          {
            "name": "template",
            "type": "string"
          },
          {
            "name": "depositedAmount",
            "type": "u64"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
