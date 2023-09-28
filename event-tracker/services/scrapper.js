const cheerio = require("cheerio");
let axios = require("axios");
// const HttpsProxyAgent = require("https-proxy-agent");
// const httpsAgent = new HttpsProxyAgent({ host: "92.222.153.172", port: "3128", auth: "username:password" })
// axios = axios.create({ httpsAgent });

const dataScrapper = async (url, fields) => {
  try {
    const result = {};
    const headers = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,en-IN;q=0.7,hi;q=0.6",
      "User-Agent": "Your User Agent String Here",
    };
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    // Extract data for each field based on the provided class names
    for (const fieldName in fields) {
      if (fields.hasOwnProperty(fieldName)) {
        result[fieldName] = $(fields[fieldName]).text().trim();
      }
    }
    for (let key in result) {
      if (result[key]) {
        return result
      } else {
        return result = {}
      }
    }
  } catch (error) {
    return {}
  }
};

module.exports = dataScrapper;
