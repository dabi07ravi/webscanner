const axios = require('axios'); // legacy way

async function sendRequest(url) {
  try {
    const response = await axios.get(url);
    checkLogic(response);
  } catch (error) {
    console.error(error);
  }
}

async function performTask(urls = []) {
  urls.forEach(url => {
    sendRequest(url);
  });
}


async function checkLogic(response) {
  if (response["status"] === 200) {
    console.log(response["headers"]);
  }
  else {
    // dont do any thing
  }
}


function generateUrls(urls = []) {
  return urls.map(url => {
    return url
  });
}


module.exports = {
  generateUrls,
  sendRequest,
  performTask
}