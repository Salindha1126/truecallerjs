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
