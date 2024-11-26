import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })
export let ENV_VARS = {
  LO_K_SECRET: process.env.LO_K_SECRET,
  WE_K_SECRET: process.env.WE_K_SECRET
};

console.log("---------------------> "+ENV_VARS["LO_K_SECRET"]);