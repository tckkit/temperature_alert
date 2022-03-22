const prompts = require("prompts");

const defineThresholds = [
  {
    type: "number",
    name: "freezing",
    message: "Define the threshold for freezing: ",
  },
  {
    type: "number",
    name: "boiling",
    message: "Define the threshold for boiling: ",
  },
];

const inputTemp = [
  {
    type: "number",
    name: "inputTemp",
    message: "Please input a temperature: ",
  },
];

var freezeTemp;
var boilingTemp;
var currTemp;
var freeze = false;
var boiling = false;

(async () => {
  // Assign user input(thresholds) to freezeTemp and boilingTemp
  const thresholds = await prompts(defineThresholds);
  freezeTemp = thresholds.freezing;
  boilingTemp = thresholds.boiling;

  while (thresholds) {
    await (async () => {
      // Assign user input(temperature) to currTemp
      const temp = await prompts(inputTemp);
      currTemp = temp.inputTemp;

      // Check if currTemp is reached or exceeded thresholds
      if (currTemp <= freezeTemp) {
        console.log(currTemp, "freezing");
        freeze = true;
      } else if (currTemp >= boilingTemp) {
        console.log(currTemp, "boiling");
        boiling = true;
      } else console.log(currTemp);

      // while is freezing, run below
      while (freeze) {
        await (async () => {
          const temp = await prompts(inputTemp);
          currTemp = temp.inputTemp;
          if (currTemp > freezeTemp + 0.5) {
            console.log(currTemp, "unfreezing");
            freeze = false;
          } else console.log(currTemp);
        })();
      }

      // while is boiling, run below
      while (boiling) {
        await (async () => {
          const temp = await prompts(inputTemp);
          currTemp = temp.inputTemp;
          if (currTemp < boilingTemp - 0.5) {
            console.log(currTemp, "unboiling");
            boiling = false;
          } else console.log(currTemp);
        })();
      }
    })();
  }
})();
