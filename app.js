const prompts = require("prompts");

const freezeThresholds = [
  {
    type: "text",
    name: "temp",
    message: "Define the threshold for freezing: ",
  },
];

const boilThresholds = [
  {
    type: "text",
    name: "temp",
    message: "Define the threshold for boiling: ",
  },
];

const inputCurrTemp = [
  {
    type: "text",
    name: "temp",
    message: "Please input a temperature: ",
  },
];

async function main() {
  const freezeTemp = await getInput(freezeThresholds);
  const boilingTemp = await getInput(boilThresholds);
  checkTemp(freezeTemp, boilingTemp);
}

async function checkTemp(freezeTemp, boilingTemp, freezing, boiling) {
  let currenTemp;
  // Check if currenTemp is reached or exceeded thresholds
  if (!boiling && !freezing) {
    currenTemp = await getInput(inputCurrTemp);
    if (currenTemp <= freezeTemp) {
      console.log(currenTemp.toFixed(1), "freezing");
      freezing = true;
    } else if (currenTemp >= boilingTemp) {
      console.log(currenTemp.toFixed(1), "boiling");
      boiling = true;
    } else console.log(currenTemp.toFixed(1));
  }

  // while is freezing, run below
  while (freezing) {
    currenTemp = await getInput(inputCurrTemp);
    if (currenTemp >= boilingTemp) {
      console.log(currenTemp.toFixed(1), "unfreezing and boiling");
      boiling = true;
      freezing = false;
    } else if (currenTemp > freezeTemp + 0.5) {
      console.log(currenTemp.toFixed(1), "unfreezing");
      freezing = false;
    } else console.log(currenTemp.toFixed(1));
  }

  // while is boiling, run below
  while (boiling) {
    currenTemp = await getInput(inputCurrTemp);
    if (currenTemp <= freezeTemp) {
      console.log(currenTemp.toFixed(1), "unboiling and freezing");
      freezing = true;
      boiling = false;
    } else if (currenTemp < boilingTemp - 0.5) {
      console.log(currenTemp.toFixed(1), "unboiling");
      boiling = false;
    } else console.log(currenTemp.toFixed(1));
  }

  return checkTemp(freezeTemp, boilingTemp, freezing, boiling);
}

async function getInput(type) {
  const answer = await prompts(type);
  if (answer.temp === "exit") {
    process.exit();
  } else {
    if (isNaN(parseFloat(answer.temp))) {
      console.log(`Invalid input. Input must be an integer.`);
      return await getInput(type);
    }
    return Number(answer.temp);
  }
}

main();
