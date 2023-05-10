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
import xml2js from "xml2js";
import converter_pkg from "./converter.cjs";
const { toPlainText, toYaml, toHTML } = converter_pkg;

import countries from "./data/countries.js";

class Format {
  constructor(data) {
    this.json = () => data;
    // eslint-disable-next-line no-unused-vars
    this.xml = function (color = false) {
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(JSON.parse(JSON.stringify(this.json())));
      return xml;
    };
    this.yaml = function (color = false) {
      return toYaml(JSON.parse(JSON.stringify(this.json())), color);
    };
    this.html = function (color = false) {
      return toHTML(this.json(), color);
    };
    this.text = function (color = false, space = false) {
      return toPlainText(JSON.parse(JSON.stringify(this.json())), color, space);
    };
    this.getName = function () {
      return this.json()?.data[0]?.name || "unknown name";
    };
    this.getAlternateName = function () {
      return this.json()?.data[0]?.altName || "no alternate name";
    };
    this.getAddresses = function () {
      return this.json()?.data[0]?.addresses[0] || [];
    };
    this.getEmailId = function () {
      return this.json()?.data[0]?.internetAddresses[0]?.id || "unknown email";
    };
    this.getCountryDetails = function () {
      return countries[
        this.json()?.data[0]?.addresses[0]?.countryCode || "UNKNOWN"
      ];
    };
  }
}
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

/**
 *  Searching phone number on truecallerjs
 *
 * @name search
 * @function truecallerjs.search(search_data)
 * @param {Object} search_data It is a json containing phonenumber,countryCode,installationId
 * @return {Object} It contains details of the phone number
 */

function search(search_data) {
  let pn = parsePhoneNumber(search_data.number.toString(), {
    regionCode: search_data.countryCode,
  });
  return axios
    .get(`https://search5-noneu.truecaller.com/v2/search`, {
      params: {
        q: pn.number.significant,
        countryCode: pn.regionCode,
        type: 4,
        locAddr: "",
        placement: "SEARCHRESULTS,HISTORY,DETAILS",
        encoding: "json",
      },
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
        "user-agent": "Truecaller/11.75.5 (Android;10)",
        Authorization: `Bearer ${search_data.installationId}`,
      },
    })
    .then(
      (response) => {
        return new Format(response.data);
      },
      (error) => {
        return new Format(error);
      }
    );
}

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
function bulkSearch(phoneNumbers, regionCode, installationId) {
  return axios
    .get(`https://search5-noneu.truecaller.com/v2/bulk`, {
      params: {
        q: phoneNumbers,
        countryCode: regionCode,
        type: 14,
        placement: "SEARCHRESULTS,HISTORY,DETAILS",
        encoding: "json",
      },
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
        "user-agent": "Truecaller/11.75.5 (Android;10)",
        Authorization: `Bearer ${installationId}`,
      },
    })
    .then(
      (response) => {
        let constructed_data = new Format(response.data);
        return constructed_data.json();
      },
      (error) => {
        let constructed_data = new Format(error);
        return JSON.parse(JSON.stringify(constructed_data.json()));
      }
    );
}

export { search, bulkSearch };
