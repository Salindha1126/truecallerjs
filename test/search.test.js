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
