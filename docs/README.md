# TruecallerJS

[![NPM version](https://img.shields.io/npm/v/truecallerjs.svg)](https://www.npmjs.com/package/truecallerjs)
[![GIT Stars](https://img.shields.io/github/stars/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/)
[![Download](https://img.shields.io/npm/dt/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs)
[![LICENSE](https://img.shields.io/npm/l/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/npms-io/maintenance-score/truecallerjs)](https://github.com/sumithemmadi/truecallerjs)
[![Issues](https://img.shields.io/github/issues/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/issues)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/truecallerjs/badge)](https://www.jsdelivr.com/package/npm/truecallerjs)

- TruecallerJS is a node.js/javascript library to get the details of a phone number.

## Description
- TruecallerJS is a node.js/javascript library to get the details of a phone number.


## Usage


```bash
npm install truecallerjs
```

### Login

```js
import truecallerjs from "truecallerjs";

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
var json_data = await truecallerjs.login("+9199123456789"); // Phone number should be in international format and it must be a string

// {
//     "status": 1,
//     "message": "Sent",
//     "domain": "noneu",
//     "parsedPhoneNumber": 919912345678,
//     "parsedCountryCode": "IN",
//     "requestId": "6fe0eba6-acds-24dc-66de-15b3fba349c3",
//     "method": "sms",
//     "tokenTtl": 300
// }
//
// Save this json.
// This json will be used to verifyOtp

if (response.status == 1 ||response.status == 9 ) {
    /**
     * OTP SENT SUCCESSFULLY
     * 
     * @var {Object} json_data
     * @method  json_data.status =>  1 or 9 => Otp sent to mobile number.
     * @method  json_data.parsedPhoneNumber => Phone Number  => phone number without.
     * @method  json_data.parsedCountryCode => "IN" => Country Code
     * @method  json_data.requestId => String request ID.
     */
}else if (response1.status == 6 || response1.status == 5) {
  
    /**
     * VERIFICATION ATTEMPTS EXCEEDED
     * 
     * @var {Object} json_data 
     * @method  json_data.status =>  6 or 5  => Exceeded the limit of verification attempts
     */
} else {
     /**
     * UNKNOWN RESPONSE
     * 
     * @var {Object} json_data 
     * @method  json_data.status => status code
     * @method  json_data.message => message
     */ 
}
```

| status    | message                         |
| ----------|---------------------------------|
| 1         | OTP sent successfully           |
| 9         | Request in pending              |
| 6 or 5    | Verification Attempts Exceeded  |


- Save this json in a file or store in a variable. This json will be used to verify OTP in `verifyOtp()` function.

- Verifying OTP.

```js
import truecallerjs from "truecallerjs";

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

var json_data = await truecallerjs.login("+9199123456789"); // Phone number should be in international format and it must be a string

/**
 * Verifing mobile number with OTP
 *
 * @name truecallerjs.verifyOtp
 * @function verifyOtp(phonenumber,json_data,otp)
 * @param {String} phonenumber phone number in international formate.
 * @param {Object} json_data JSON response of @function login(phonenumber).
 * @param {String} otp 6-digits OTP .
 * @return {Object} Save this json output.It contains you installationId
 */

var otp = "145214"; /* OTP is here*/
var res = await truecallerjs.verifyOtp(phonenumber, json_data, otp);

console.log(res);

// {
//    "status": 2,
//    "message": "Verified",
//    "installationId": "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
//    "ttl": 259200,
//    "userId": 1234567890123456789,
//    "suspended": false,
//    "phones": [
//       {
//          "phoneNumber": 9199123456789,
//          "countryCode": "IN",
//          "priority": 1
//       }
//    ]
// }

if ((res.data.status == 2 && !res.data.suspended)) {
  /**
   * LOGIN SUCCESSFUL
   * 
   * @var {Object} json_data
   * @method res.data.status =>  2 => login successful.
   * @method res.data.userId => print's userId.
   * @method res.data.installationId => print's installationId.
   * @method res.data.suspended  => return's true if account suspended. 
   * @method res.data.phones[0].phoneNumber => print's phone number.
   * @method res.data.phones[0].countryCode => print's phone number.
   */
} else if (res.data.status == 11) {

  /**
   * INVALID OTP
   * 
   * @var {Object} json_data
   * @method res.data.status =>  11 or  40101 => Invalid OTP.
   */
} else if (res.data.status == 7) {

  /**
   * RETRIES LIMIT EXCEED
   * 
   * @var {Object} json_data
   * @method res.data.status =>  7 => Invalid OTP.
   */

} else if (res.data.suspended) {
  /**
   * ACCOUNT SUSPENDED
   * 
   * @var {Object} json_data
   * @method res.data.suspended  => return's true if account suspended. 
   */
} else {
  console.log( res.data.message);
    /**
   * UNKNOWN RESPONSE
   * 
   * @var {Object} json_data
   * @method res.data.status  =>  status code
   * @method res.data.message  =>  message
   */
}

```

 * `phonenumber` = phone number in international formate.
 * `json_data` = JSON response of function `truecallerjs.login(phonenumber)`.
 * `otp` = 6-digits OTP .
 * It return JSON Save this json output.It contains you [installationId](#installationid).

| status    | message                         |
| ----------|---------------------------------|
| 2         | Login Successful                |
| 11        | Invalid OTP                     |
| 7         | OTP Retries exceeded            |


### Simple Example of Searching Number

- Normal search for a phone number.

```js
import truecallerjs from "truecallerjs";

var search_data = {
  number: "9912345678",
  countryCode: "IN", // Country code to use by default if  phone number is not in `e164` format(Internation format)
  installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
};

/**
 *  Searching phone number on truecallerjs
 *
 * @name search
 * @function truecallerjs.search(search_data)
 * @param {Object} search_data It is a json containing phonenumber,countryCode,installationId
 * @return {Object} It contains details of the phone number
 */

var response = await truecallerjs.search(search_data);
console.log(response.json());

/**
 * @var response => {...}
 * @method response.json(color) JSON response. @param {Boolean} color
 * @method response.xml(color)  XML output. @param {Boolean} color .
 * @method response.yaml(color) YAML output. @param {Boolean} color
 * @method response.html(color) HTML output. @param {Boolean} color
 * @method response.text(color,space) JSON response. @param {Boolean} color . @param {Boolean} space Spacing between keys and values.
 *
 *
 * @method response.getName() => "Sumith Emmadi"
 * @method response.getAlternateName() => "sumith"
 * @method response.getAddresses() => {....}
 * @method response.getEmailId() => sumithemmadi244@gmail.com
 * @method response.getCountryDetails() => {...}
 */

```


* `number`: Phone number 
* `countryCode`: Country code to use by default If any phone number is not in `e164` format(Internation format). Eg: Country code for india is "IN".
* `installationId`: [InstallationId](#installationid) Here , You need to login first to use it. use `truecallerjs login` command to login to your account

> **Note** : use `truecallerjs -i` command to get your installation id.


- Bulk search on Multiple phone number. 

```js
import truecallerjs from "truecallerjs";

/**
 * Bulk search on truecallerjs
 *
 * @name bulkSearch
 * @function truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
 * @param {String} phoneNumbers phone number separted with coma.
 * @param {String} countryCode Country code to use by default if any phone number is not in `e164` format(Internation format)
 * @param {String} installationId 6-digits OTP .
 *
 * @return {Object} It contains phone numbers information in a array
 */

var countryCode = "IN";
var installationId = "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug";
var phoneNumbers = "+9912345678,+14051234567,+919987654321"; // Phone numbers seperated by comma's

var response = await truecallerjs.bulkSearch(
  phoneNumbers,
  countryCode,
  installationId
);
console.log(response);
```

* `phoneNumbers` phone number separted with coma.
* `countryCode` Country code to use by default If any phone number is not in `e164` format(Internation format). Eg: Country code for india is "IN".
* `installationId` 6-digits OTP. this should be a string.

