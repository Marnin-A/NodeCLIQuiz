#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(chalk.bgMagentaBright("Sup gee"));

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Javascript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();
  console.log(`${chalk.bgBlue("How to play")}
  IF you get a question wrong i will ${chalk.bgRed("End")}
  So get all the questions right👍`);
}

await welcome();

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Whats your name?",
    default() {
      return "Steve😃";
    },
  });
  playerName = answers.player_name;
}
await askName();

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Javascript was created in 10 days then released on \n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17th, 1996",
    ],
  });
  return handleAnswer(answers.question1 == "Dec 4th, 1995");
}

async function handleAnswer(isCorrent) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrent) {
    spinner.success({
      text: `Nice work ${playerName}. That's the right answer`,
    });
  } else {
    spinner.error({ text: `😐 GAme over, you lose ${playerName}!` });
    process.exit(1);
  }
}
