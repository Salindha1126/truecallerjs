
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

## [Command Line Usage](https://github.com/sumithemmadi/truecallerjs)


# Requirements

* Valid Mobile Number(Phone number verification for truecaller)
* [Truecaller InstallationId](https://github.com/sumithemmadi/truecallerjs#installationid)


### Installation

Install this npm package globally.

Stable version:

```bash
npm install -g  truecallerjs
```

- Run `truecallerjs` with `--help` to see the help for truecallerjs.


```sh
~$ truecallerjs --help
Usage:

truecallerjs  login (Login to truecaller).
truecallerjs -s [number] (command to search a number).

Options:
      --version           Show version number                          [boolean]
  -s, --search            To search caller name and related information of a num
                          ber
  -r, --raw               Print's raw output                           [boolean]
      --bulksearch, --bs  Make a bulk number search
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
```

> **Note** : If you are using truecallerjs version less than [1.1.2](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2). follow [truecallerjs-v1.1.2](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2) documentation.

> **Note** : If you are using truecallerjs version from [1.1.3](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2) to [1.1.5](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.5). follow [truecallerjs-v1.1.5](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.5) documentation.



### Login

Then  login to your truecaller account .

```bash
~$ truecallerjs login
```

> If you get any error, try running '**sudo truecallerjs login**'. If you are using Windows try the command with **Adminitrative Privilege**.

### InstallationId

Enter the below command to see your **InstallationId**.

```bash
truecallerjs --installationid
```

Print only installation Id.

```bash
truecallerjs -i -r
```

### Searching a number

```bash
~$ truecallerjs -s [number]
```

```yaml
data                : 
id                  : jsiebejebbeebhee/dnss00w==
name                : Sumith Emmadi
imId                : 1g7rm006b356o
gender              : UNKNOWN
image               : https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb
score               : 0.9
access              : PUBLIC
enhanced            : true
phones              : 
e164Format          : +000000000000
numberType          : MOBILE
nationalFormat      : +000000000000
dialingCode         : 91
countryCode         : IN
carrier             : Airtel
type                : openPhone
addresses           : 
city                : Andhra Pradesh
countryCode         : IN
timeZone            : +05:30
type                : address
internetAddresses   : 
id                  : email@gmail.com
service             : email
caption             : Sumith Emmadi
type                : internetAddress
badges              : verified, user
cacheTtl            :
sources             : []
searchWarnings      : []
surveys             : []
provider            : ss-nu
stats               :
sourceStats         : []

```


## To make a bulk number search 

```sh
~$ truecallerjs --bs [Numbers seperated by comma]
```

Example : 

```bash
 ~$ truecallerjs --bs 9912345678,+14051234567,+919987654321
 ```

- raw output
- 
 ```bash
 ~$ truecallerjs --bs 9912345678,+14051234567,+919987654321 -r 
 ```

- no color
  
 ```bash
 ~$ truecallerjs --bs 9912345678,+14051234567,+919987654321 --nc
 ```

To print only name.

```bash
~$ truecallerjs -s [number] --name

Name : Sumith Emmadi
```

Other command's

```bash
~$ truecallerjs -s [number] -r --name

Sumith Emmadi
```

### Output Formats

* 1 . JSON
* 2 . XML
* 3 . YAML
* 4 . TEXT
* 5 . HTML

- Example : 
```bash
~$ truecallerjs -s [number] --text
```
- Output without colouring

```bash
~$ truecallerjs -s [number] --text --nc
```

#### To get only JSON output

```bash
~$ truecallerjs -s [number] --json
```
```bash
~$ truecallerjs -s [number] --json
```
- Prints data without color

```bash
~$ truecallerjs -s [number] --json --nc
```


#### To get XML output

```bash
~$ truecallerjs -s [number] --xml
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<root>
  <data>
    <id>jsiebejebbeebhee/dnss00w==</id>
    <name>Sumith Emmadi</name>
    <imId>1g7rm006b356o</imId>
    <gender>UNKNOWN</gender>
    <image>https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb</image>
    <score>0.9</score>
    <access>PUBLIC</access>
    <enhanced>true</enhanced>
    <phones>
      <e164Format>+000000000000</e164Format>
      <numberType>MOBILE</numberType>
      <nationalFormat>+000000000000</nationalFormat>
      <dialingCode>91</dialingCode>
      <countryCode>IN</countryCode>
      <carrier>Airtel</carrier>
      <type>openPhone</type>
    </phones>
    <addresses>
      <city>Andhra Pradesh</city>
      <countryCode>IN</countryCode>
      <timeZone>+05:30</timeZone>
      <type>address</type>
    </addresses>
    <internetAddresses>
      <id>email@gmail.com</id>
      <service>email</service>
      <caption>Sumith Emmadi</caption>
      <type>internetAddress</type>
    </internetAddresses>
    <badges>verified</badges>
    <badges>user</badges>
    <cacheTtl>
    </cacheTtl>
    <sources/>
    <searchWarnings/>
    <surveys/>
  </data>
  <provider>ss-nu</provider>
  <stats>
    <sourceStats/>
  </stats>
</root>
```

#### To get YAML output

```bash
~$ truecallerjs -s [number] --yaml
```

```yaml
data: 
 - 
   id: "jsiebejebbeebhee/dnss00w=="
  name: "Sumith Emmadi"
  imId: 1g7rm006b356o
  gender: UNKNOWN
  image: "https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb"
  score: 0.9
  access: PUBLIC
  enhanced: true
  phones: 
   - 
   e164Format: "+000000000000"
    numberType: MOBILE
    nationalFormat: "+000000000000"
    dialingCode: 91
    countryCode: IN
    carrier: "Airtel"
    type: openPhone
  addresses: 
   - 
   city: "Andhra Pradesh"
    countryCode: IN
    timeZone: "+05:30"
    type: address
  internetAddresses: 
   - 
   id: "email@gmail.com"
    service: email
    caption: "Sumith Emmadi"
    type: internetAddress
  badges: 
   - 
   verified
   - 
   user
  tags: 
  nameFeedback: 
   nameSource: 1
   nameElectionAlgo: ""
  cacheTtl: ""
  sources: 
  searchWarnings: 
  surveys: 
provider: "ss-nu"
stats: 
 sourceStats: 
```

#### To get output as a plain text

```bash
~$ truecallerjs -s [number] --text

```

#### To get HTML output

```bash
~$ truecallerjs -s [number] --html
```



## Usage


```bash
npm install truecallerjs
```

### Simple Example

- Normal search for a phone number.

```js
import truecallerjs from "truecallerjs";

var search_data = {
  number: "9912345678",
  countryCode: "IN",
  installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
};

var response = await truecallerjs.search(search_data);
console.log(response.json());

// response.json() 
// response.xml()
// response.yaml()
// response.html()
// response.text()

// response.getName() => "Sumith Emmadi"
// response.getAlternateName() => "sumith"  
// response.getAddresses() => {....}
// response.getEmailId() => example@domain.com
// response.getCountryDetails() => {...}
```


* `number`: Phone number 
* `countryCode`: Country code to use by default If any phone number is not in `e164` format(Internation format). Eg: Country code for india is "IN".
* `installationId`: [InstallationId](#installationid) Here , You need to login first to use it. use `truecallerjs login` command to login to your account

> **Note** : use `truecallerjs -i` command to get your installation id.


- Bulk search on Multiple phone number. 

```js
import truecallerjs from "truecallerjs";


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

 * Follow this documentation for more details [https://github.com/sumithemmadi/truecallerjs/tree/main/docs](https://github.com/sumithemmadi/truecallerjs/tree/main/docs/#login)


###  Implement Login function

```js
import truecallerjs from "truecallerjs";

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

```

- Save this json in a file or store in a variable. This json will be used to verify OTP in `verifyOtp()` function.

- Verifying OTP.

```js
import truecallerjs from "truecallerjs";

var json_data = await truecallerjs.login("+9199123456789"); // Phone number should be in international format and it must be a string

var otp = "145214"; /* OTP is here*/

var data = await truecallerjs.verifyOtp(phonenumber, json_data, otp);

console.log(data);

// {
//    "status": 2,
//    "message": "Verified",
//    "installationId": "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
//    "ttl": 259200,
//    "userId": 1234567890123456789,
//    "suspended": false,
//    "phones": [
//       {
//          "phoneNumber": 919912857147,
//          "countryCode": "IN",
//          "priority": 1
//       }
//    ]
// }
```


 * `phonenumber` = phone number in international formate.
 * `json_data` = JSON response of function `truecallerjs.login(phonenumber)`.
 * `otp` = 6-digits OTP .
 * It return JSON Save this json output.It contains you [installationId](#installationid).

 * Follow this documentation for more details [https://github.com/sumithemmadi/truecallerjs/tree/main/docs](https://github.com/sumithemmadi/truecallerjs/tree/main/docs)


## License

MIT License

Copyright (c) 2021 Emmadi Sumith Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
