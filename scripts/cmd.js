#!/usr/bin/env node

// MIT License

// Copyright (c) 2021 Emmadi Sumith Kumar

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import { parsePhoneNumber } from "awesome-phonenumber";
import chalk from "chalk";
import fs from "fs";
import colorizeJson from "json-colorizer";
import { login, verifyOtp } from "../src/login.js";
import { search, bulkSearch } from "../src/search.js";
import {
  truecallerjsAuthDir,
  requestFile,
  authKeyFile,
} from "../src/config/config.js";

const args = await yargs(hideBin(process.argv))
  .usage(
    "Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number)."
  )
  .option("search", {
    alias: "s",
    description: "To search caller name and related information of a number",
    type: "character",
  })
  .option("raw", {
    alias: "r",
    description: "Print's raw output",
    type: "boolean",
  })
  .option("bulksearch", {
    alias: "bs",
    description: "Make a bulk number search",
    type: "character",
  })
  .option("name", {
    alias: "n",
    description: "Print's user name of phone number ",
    type: "boolean",
  })
  .option("email", {
    alias: "e",
    description: "Print's email assigned to the phonenumber",
    type: "boolean",
  })
  .option("json", {
    description: "print's  output in json",
    type: "boolean",
  })
  .option("xml", {
    description: "print's  output in XML",
    type: "boolean",
  })
  .option("yaml", {
    description: "Print's  output in YAML",
    type: "boolean",
  })
  .option("text", {
    description: "Print's  output as plain text(TXT)",
    type: "boolean",
  })
  .option("html", {
    description: "Print's html table",
    type: "boolean",
  })
  .option("nc", {
    alias: "no_color",
    description: "Print without color",
    type: "boolean",
  })
  .option("installationid", {
    alias: "i",
    description: "shows your InstallationId",
    type: "boolean",
  })
  .option("verbose", {
    alias: "v",
    description: "Show additional information",
    type: "count",
  })
  .help()
  .alias("help", "h").argv;

// console.log(args)
var VERBOSE_LEVEL = args.verbose;

// eslint-disable-next-line no-unused-vars
// function WARN()  { VERBOSE_LEVEL >= 0 && console.log.apply(console, arguments); }
// eslint-disable-next-line no-unused-vars
function INFO() {
  VERBOSE_LEVEL >= 1 && console.log.apply(console, arguments);
}
// eslint-disable-next-line no-unused-vars
function DEBUG() {
  VERBOSE_LEVEL >= 2 && console.log.apply(console, arguments);
}

if (args._.includes("login") && !args.s && !args.bs) {
  // Check whether '.truecallerjs' folder exist or not.
  if (!fs.existsSync(truecallerjsAuthDir)) {
    try {
      fs.mkdirSync(truecallerjsAuthDir, { recursive: true });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  // login
  if (args._[0] == "login" && args._.length <= 2) {
    console.log(
      chalk.yellow.bold(
        "Login\n\n Enter mobile number in International Format\n Example : "
      ) +
        chalk.magenta("+919912345678") +
        ".\n"
    );
    const inputNumber = await inquirer.prompt({
      type: "input",
      name: "phonenumber",
      message: "Enter your phone number :",
      validate: async (input) => {
        var check = parsePhoneNumber(String(input));

        if (String(input) != String(check.number.e164)) {
          return "Enter valid phone number in International Format";
        }

        if (!check.valid) {
          return "Invalid Phone Number";
        }

        return true;
      },
    });

    const pn = parsePhoneNumber(String(inputNumber.phonenumber));
    console.log(chalk.yellow(`Sending OTP to ${chalk.green(pn.number.e164)}.`));

    var response;
    var new_req = true;

    if (fs.existsSync(requestFile)) {
      var fileData = JSON.parse(fs.readFileSync(requestFile, "utf8"));
      if (
        "parsedPhoneNumber" in fileData &&
        `+${fileData.parsedPhoneNumber}` == pn.number.e164
      ) {
        console.log(
          chalk.magenta(
            "\nPrevious request was found for this mobile number.\n"
          )
        );
        const x = await inquirer.prompt({
          type: "confirm",
          name: "status",
          message: "Do you want to enter previous OTP ",
        });

        if (x.status) {
          new_req = false;
          response = fileData;
        }
      }
    }

    if (new_req) {
      response = await login(String(pn.number.e164));
    }

    INFO("Sending otp to" + String(pn.number.e164));
    DEBUG(response);

    if (
      response.status == 1 ||
      response.status == 9 ||
      response.message == "Sent"
    ) {
      fs.writeFileSync(
        requestFile,
        JSON.stringify(response, null, 4),
        (err) => {
          if (err) {
            console.error(chalk.red(err));
            process.exit(1);
          }
        }
      );
      if (new_req) {
        console.log(chalk.green("Otp sent successfully "));
      }

      const token = await inquirer.prompt({
        type: "input",
        name: "otp",
        message: "Enter Received OTP:",
        validate: async (input) => {
          let isnum = /^\d+$/.test(String(input));

          if (input.length != 6 || !isnum) {
            return "Enter valid 6-digits OTP";
          }
          return true;
        },
      });

      INFO("OTP is " + String(token.otp));
      DEBUG(token);

      var response1 = await verifyOtp(
        String(pn.number.e164),
        response,
        token.otp
      );

      if (
        (response1.status == 2 && !response1.suspended) ||
        "installationId" in response1
      ) {
        console.log(
          chalk.yellow.bold("Your installationId : ") +
            chalk.green(response1.installationId)
        );
        INFO(
          "This is the installationId :" +
            chalk.green(response1.installationId) +
            "used to authenticate with truecaller"
        );

        // save the file
        fs.writeFileSync(
          authKeyFile,
          JSON.stringify(response1, null, 3),
          (err) => {
            if (err) {
              console.log(chalk.red(err.message));
              process.exit(1);
            }
          }
        );
        console.log(chalk.green("Logged in successfully."));
        fs.unlinkSync(requestFile);
      } else if (response1.status == 11) {
        console.log(chalk.red("! Invalid OTP "));
        INFO(
          "Otp not valid. Enter 6-digits OTP received on " +
            String(pn.number.e164)
        );
      } else if (response1.status == 7) {
        console.log(chalk.red("Retries limit exceeded"));
        INFO("Retries on secret code reached" + String(pn.number.e164));
      } else if (response1.suspended) {
        console.log(chalk.red("Oops... Your account is suspended."));
        INFO("Your account is supended by truecaller.");
      } else if ("message" in response1) {
        console.log(chalk.red(response1.message));
      } else {
        console.log(JSON.stringify(response1, null, 4));
      }
      DEBUG(response1);
    } else if (response.status == 6 || response.status == 5) {
      if (fs.existsSync(requestFile)) {
        try {
          fs.unlinkSync(requestFile);
        } catch (err) {
          console.error(chalk.red(err));
          process.exit();
        }
      }
      console.log(
        chalk.red(
          "You have exceeded the limit of verification attempts.\nPlease try again after some time."
        )
      );
    } else {
      console.log(chalk.red(response.message));
    }
  }
} else if (args.s && !args.bs && !args._.includes("login") && !args.i) {
  // check if authkey exist or not
  if (!fs.existsSync(authKeyFile)) {
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit();
  }

  try {
    const data = fs.readFileSync(authKeyFile, "utf8");
    // eslint-disable-next-line no-redeclare
    var jsonAuthKey = JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit();
  }

  const countryCode = jsonAuthKey.phones[0].countryCode;
  const installationId = jsonAuthKey.installationId;

  var search_result = await search({
    number: args.s,
    countryCode,
    installationId,
  });

  if (args.json || args.html || args.xml || args.text || args.yaml) {
    if (args.json && !args.html && !args.xml && !args.text && !args.yaml) {
      if (args.r) {
        console.log(
          !args.nc
            ? colorizeJson(JSON.stringify(search_result.json()), {
                colors: {
                  STRING_KEY: "blue",
                  STRING_LITERAL: "green",
                  NUMBER_LITERAL: "magenta",
                },
              })
            : JSON.stringify(search_result.json())
        );
      } else {
        console.log(
          !args.nc
            ? colorizeJson(JSON.stringify(search_result.json()), {
                pretty: true,
                colors: {
                  STRING_KEY: "blue",
                  STRING_LITERAL: "green",
                  NUMBER_LITERAL: "magenta",
                },
              })
            : JSON.stringify(search_result.json(), null, 2)
        );
      }
    } else if (
      args.xml &&
      !args.html &&
      !args.json &&
      !args.text &&
      !args.yaml
    ) {
      console.log(search_result.xml(!args.nc));
    } else if (
      args.yaml &&
      !args.html &&
      !args.xml &&
      !args.text &&
      !args.json
    ) {
      console.log(search_result.yaml(!args.nc));
    } else if (
      args.html &&
      !args.yaml &&
      !args.xml &&
      !args.text &&
      !args.json
    ) {
      console.log(search_result.html(!args.nc));
    } else {
      console.log(search_result.text(!args.nc, true));
    }
  } else {
    if (response == '""') {
      console.log(chalk.red("Error in input"));
    } else if (args.n && !args.r && !args.e) {
      console.log(
        chalk.blue.bold("Name"),
        " : ",
        chalk.green(search_result.getName())
      );
      INFO("Prints the name of the person");
    } else if (args.n && args.r && !args.e) {
      console.log(search_result.getName());
      INFO("Prints the name of the person");
    } else if (!args.n && !args.r && args.e) {
      console.log(
        chalk.blue.bold("Email"),
        " : ",
        chalk.green(search_result.getEmailId())
      );
      INFO("Prints the Email Id");
    } else if (!args.n && args.r && args.e) {
      console.log(search_result.getEmailId());
      INFO("Prints the Email Id");
    } else {
      console.log(search_result.text(!args.nc, true));
    }
  }
} else if (args.bs && !args._.includes("login") && !args.i) {
  // get file contains of authkey.json

  if (!fs.existsSync(authKeyFile)) {
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit(1);
  }

  try {
    const data = fs.readFileSync(authKeyFile, "utf8");
    // eslint-disable-next-line no-redeclare
    var jsonAuthKey = JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit(1);
  }

  let countryCode = jsonAuthKey.phones[0].countryCode;
  let installationId = jsonAuthKey.installationId;

  var searchResult = await bulkSearch(args.bs, countryCode, installationId);
  if (args.r) {
    console.log(
      !args.nc
        ? colorizeJson(JSON.stringify(searchResult), {
            colors: {
              STRING_KEY: "blue",
              STRING_LITERAL: "green",
              NUMBER_LITERAL: "magenta",
            },
          })
        : JSON.stringify(searchResult)
    );
  } else {
    console.log(
      !args.nc
        ? colorizeJson(JSON.stringify(searchResult), {
            pretty: true,
            colors: {
              STRING_KEY: "blue",
              STRING_LITERAL: "green",
              NUMBER_LITERAL: "magenta",
            },
          })
        : JSON.stringify(searchResult, null, 2)
    );
  }
} else if (args.i && !args.s) {
  if (!fs.existsSync(authKeyFile)) {
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit(1);
  }

  try {
    const data = fs.readFileSync(authKeyFile, "utf8");
    // eslint-disable-next-line no-redeclare
    var jsonAuthKey = JSON.parse(data);
  } catch (err) {
    console.error(err.message);
    console.error(chalk.magenta.bold("Please login to your account."));
    process.exit(1);
  }

  // let countryCode = jsonAuthKey.phones[0].countryCode;
  let installationId = jsonAuthKey.installationId;
  if (args.r) {
    console.log(installationId);
  } else {
    args.nc
      ? console.log("Your InstallationId : " + installationId)
      : console.log(
          chalk.blue.bold("Your InstallationId") +
            " : " +
            chalk.green(installationId)
        );
  }
  INFO(
    "This is the installationId :" +
      chalk.green(installationId) +
      " used to authenticate with truecaller"
  );
  // console.log(VERBOSE_LEVEL);
  DEBUG(jsonAuthKey);
} else {
  console.log(`
Usage:

${chalk.green("truecallerjs")} login (Login to truecaller).
${chalk.green("truecallerjs")} -s [number] (command to search a number).

Options:
      --version           Show version number                          [boolean]
  -s, --search            To search caller name and related information of a num
                          ber
  -r, --raw               Print's raw output                           [boolean]
      --bulksearch,7 --bs  Make a bulk number search
  -n, --name              Print's user name of phone number            [boolean]
  -e, --email             Print's email assigned to the phonenumber    [boolean]
      --json              print's  output in json                      [boolean]
      --xml               print's  output in XML                       [boolean]
      --yaml              Print's  output in YAML                      [boolean]
      --text              Print's  output as plain text(TXT)           [boolean]
      --html              Print's html table                           [boolean]
      --nc, --no_color    Print without color                          [boolean]
  -i, --installationid    shows your InstallationId                    [boolean]
  -v, --verbose           Show additional information                    [count]
  -h, --help              Show help                                    [boolean]

  Example:
      ~$ truecallerjs -s +9199123456789 --json          {....}
      ~$ truecallerjs -s +9199123456789 --name          Sumith Emmadi

  https://github.com/sumithemmadi/truecallerjs.git
  `);
}
