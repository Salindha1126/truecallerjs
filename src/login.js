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

import axios from "axios";
import { parsePhoneNumber } from "awesome-phonenumber";
import { device } from "./data/phones.js";

function generateRandomString(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Login to truecallerjs
 *
 * @name login
 * @function truecallerjs.login(phonenumber)
 * @param {String} phonenumber phone number in international formate.
 * @return {Object} Save this json output.It contains requestId that is used for OTP verification
 *
 * Next go for @function truecaller.verifyOtp(phoneNumbers,installationId,otp)
 */
async function login(phonenumber) {
  const pn = parsePhoneNumber(String(phonenumber));
  if (!pn.valid) {
    throw new Error("Phone number should be in international format.");
  }
  const postUrl =
    "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp";

  const data = {
    countryCode: pn.regionCode,
    dialingCode: pn.countryCode,
    installationDetails: {
      app: {
        buildVersion: 5,
        majorVersion: 11,
        minorVersion: 7,
        store: "GOOGLE_PLAY",
      },
      device: {
        deviceId: process.env.TRUECALLERJS_DEVICE_ID
          ? String(process.env.TRUECALLERJS_DEVICE_ID)
          : generateRandomString(16),
        language: "en",
        manufacturer: process.env.TRUECALLERJS_DEVICE_MANUFACTURER
          ? String(process.env.TRUECALLERJS_DEVICE_MANUFACTURER)
          : device.manufacturer,
        model: process.env.TRUECALLERJS_DEVICE_MODEL
          ? String(process.env.TRUECALLERJS_DEVICE_MODEL)
          : device.model,
        osName: process.env.TRUECALLERJS_DEVICE_OS_NAME
          ? String(process.env.TRUECALLERJS_DEVICE_OS_NAME)
          : "Android",
        osVersion: process.env.TRUECALLERJS_DEVICE_OS_VERSION
          ? String(process.env.TRUECALLERJS_DEVICE_OS_VERSION)
          : "10",
        mobileServices: ["GMS"],
      },
      language: "en",
    },
    phoneNumber: pn.number.significant,
    region: "region-2",
    sequenceNo: 2,
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
    },
    url: postUrl,
    data,
  };

  var res = await axios(options);
  return res.data;
}

/**
 * Verifing mobile number with OTP
 *
 * @name truecallerjs.verifyOtp
 * @function verifyOtp(phonenumber,json_data,otp)
 * @param {String} phonenumber phone number in international formate.
 * @param {Object} json_data JSON response of @function login(phonenumber).
 * @param {String} otp 6-digits OTP .
 * @return {Object} Save this json output.It contains you installationId
 *
 * Follow this documentation for more details https://github.com/sumithemmadi/truecallerjs/tree/main/docs
 */

async function verifyOtp(phonenumber, json_data, otp) {
  const pn = parsePhoneNumber(String(phonenumber));
  if (!pn.valid) {
    throw new Error("Phone number should be in international format.");
  }
  const postData = {
    countryCode: pn.regionCode,
    dialingCode: pn.countryCode,
    phoneNumber: pn.number.significant,
    requestId: json_data.requestId,
    token: otp,
  };

  const options2 = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
    },
    url: "https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp",
    data: postData,
  };

  var res = await axios(options2);
  return res.data;
}

export { login, verifyOtp };
