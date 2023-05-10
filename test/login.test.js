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

import truecallerjs from "..";

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

console.log(json_data);
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
