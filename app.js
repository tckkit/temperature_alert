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

let freezeTemp;
let boilingTemp;
let currTemp;
let freezing = false;
let boiling = false;

(async () => {
  // Input validator (Check if the input is a valid number)
  const validate = async (inputType) => {
    let input;
    while (!input) {
      input = await prompts(inputType);
      const integerTemp = parseFloat(input.temp);
      if (integerTemp) {
        return integerTemp;
      } else {
        console.log(`Invalid input. Input must be an integer.`);
        input = false;
      }
    }
  };

  // Handling thresholds (freezing) input
  while (!freezeTemp) {
    freezeTemp = await validate(freezeThresholds);
  }

  // Handling thresholds (boiling) input
  while (!boilingTemp) {
    boilingTemp = await validate(boilThresholds);
  }

  while (freezeTemp && boilingTemp) {
    await (async () => {
      // Handling temperature inputs
      currTemp = await validate(inputCurrTemp);

      // Check if currTemp is reached or exceeded thresholds
      if (currTemp <= freezeTemp && !freezing) {
        console.log(currTemp, "freezing");
        freezing = true;
      } else if (currTemp >= boilingTemp && !boiling) {
        console.log(currTemp, "boiling");
        boiling = true;
      } else console.log(currTemp);

      // while is freezing, run below
      while (freezing) {
        await (async () => {
          currTemp = await validate(inputCurrTemp);
          if (currTemp >= boilingTemp) {
            console.log(currTemp, "unfreezing and boiling");
            freezing = false;
            boiling = true;
          } else if (currTemp > freezeTemp + 0.5) {
            console.log(currTemp, "unfreezing");
            freezing = false;
          } else console.log(currTemp);
        })();
      }

      // while is boiling, run below
      while (boiling) {
        await (async () => {
          currTemp = await validate(inputCurrTemp);
          if (currTemp <= freezeTemp) {
            console.log(currTemp, "unboiling and freezing");
            boiling = false;
            freezing = true;
          } else if (currTemp < boilingTemp - 0.5) {
            console.log(currTemp, "unboiling");
            boiling = false;
          } else console.log(currTemp);
        })();
      }
    })();
  }
})();
