#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fetch from "node-fetch";
//API URLs
const Easyurl =
  "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple";
const Midurl = "";
const Hardurl = "";

let data; //Variable for fetched data

//Fetch function to get data from the API
async function getTrivia() {
  let response = await fetch(Easyurl);
  data = await response.json();
  return data;
}
getTrivia().then((data) => console.log(data));
// fetch(Easyurl)
//   .then((res) => res.json())
//   .then((json) => console.log(json.results))
//   .catch((error) => console.error(error));

let playerName;
// let QuestionTxt = json.results.question.;

//Helper Function to display the intro text for 2seconds
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Javascript Millionaire? \n"
  );

  //Calling the Intro display function and then stopping after 2 secs
  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.bgBlue("How to play")}
  If you get a question wrong i will ${chalk.bgRed("End")}
  So get all the questions right👍`);
}

//Collecting data from the user
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

async function question() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: data.results.question + "The Q \n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17th, 1996",
    ],
  });
  return handleAnswer(answers.question == "Dec 4th, 1995");
}

//Displays loading spinner while to answer is being checked
async function handleAnswer(isCorrent) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrent) {
    spinner.success({
      text: `Nice work ${playerName}. That's the right answer`,
    });
  } else {
    spinner.error({ text: `😐 Game over ${playerName}, you lose!` });
    process.exit(1);
  }
}

//Displays a Congratulatory message
function winner() {
  console.clear();
  const msg = `Congratulations, ${playerName}!\n $1,000,000`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

//Calling all defined functions
await welcome();
await askName();
await question();
await winner();
