import { normalize, schema } from "normalizr";

// use this tomorrow: https://stackoverflow.com/questions/48621298/angular-ngrx-multiple-entities-in-one-entityadapter-possible

// normalizr: https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#arraydefinition-schemaattribute

const goalFundingResponse = [
  {
    goalId: "GOAL_ID",
    householdId: "HOUSEHOLD_ID",
    appliedAccounts: [
      {
        goalId: "GOAL_ID",
        entityId: "ENTITY_ID",
        appliedPercent: 20
      },
      {
        goalId: "GOAL_ID",
        entityId: "ENTITY_ID_3",
        appliedPercent: 10
      }
    ]
  },
  {
    goalId: "GOAL_ID_2",
    householdId: "HOUSEHOLD_ID",
    appliedAccounts: [
      {
        goalId: "GOAL_ID_2",
        entityId: "ENTITY_ID",
        appliedPercent: 50
      },
      {
        goalId: "GOAL_ID",
        entityId: "ENTITY_ID_2",
        appliedPercent: 20
      },
      {
        goalId: "GOAL_ID_2",
        entityId: "ENTITY_ID_4",
        appliedPercent: 10
      }
    ]
  }
];

const accountFundingResponse = [
  {
    accountId: "ACCOUNT_ID",
    householdId: "HOUSEHOLD_ID",
    appliedGoals: [
      {
        goalId: "GOAL_ID",
        entityId: "ENTITY_ID",
        appliedPercent: 0
      }
    ]
  }
];

const fundingAccountSchema = new schema.Entity(
  "fundingAccount",
  {},
  { idAttribute: (value, parent, key) => `${value.goalId}-${value.entityId}`}
);
const fundingAccountListSchema = [fundingAccountSchema]
const goalFundingSchema = new schema.Entity(
  "goalFunding",
  { appliedAccounts: fundingAccountListSchema },
  {
    idAttribute: "goalId"
  }
);
const goalFundingListSchema = [goalFundingSchema]
const accountFundingSchema = new schema.Entity(
  "accountFunding",
  { appliedGoals: fundingAccountListSchema },
  {
    idAttribute: "accountId"
  }
);
const accountFundingListSchema = [accountFundingSchema]

console.log(normalize(goalFundingResponse, goalFundingListSchema));
console.log(normalize(accountFundingResponse, accountFundingListSchema));