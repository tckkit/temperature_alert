# Temperature alert for freezing and boiling

### How to start

**Note** that this seed project requires **node and npm**.

In order to start the project, open this project in IDE:

```bash
# git clone the repository
# cd into the root directory and install the project's dependencies
$ npm install
# Start the Program by `node app.js`.
$ node app.js

```

# Project overview

This project purpose is to alert for temperature value from console input.

Alerts are generated when a specific threshold has been reached or exceeded.

### Application break down in steps

1. define the threshold for **freezing**.
2. define the threshold for **boiling**.
3. input the temperature value for checking.

### Please note

- enter 'exit' to exit program anytime
- the return data will be display on screen.
- "fluctuating" condition would be applied when previous temperature is freezing or boiling.

### What is fluctuating condition?

fluctuating condition would set the thresholds for freezing and boiling to +0.5 and -0.5 respectively.

**Example of fluctuating condition:**

if a freezing threshold is set to 0, previous temperature is -1 and the current temperature is 0.5. It would not trigger “unfreezing” alert, only when temperature is above 0.5 would trigger “unfreezing”.
