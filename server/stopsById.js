const express = require("express");
const stopsByIdRouter = express.Router();
module.exports = stopsByIdRouter;
const axios = require("axios");

stopsByIdRouter.post("/:stop_id/:time", (req, res) => {
  const { stop_id, time } = req.params;
  let date = new Date();
  date.setHours(date.getHours() - time);

  let encodedDate = encodeURIComponent(date.toUTCString());

  const fetchData = async () => {
    axios({
      method: "post",
      url: "https://clientapi.dopravnakarta.sk/api/v2/GetPlannedDeparturesFromStop",
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language":
          "en-GB,en;q=0.9,sk-SK;q=0.8,sk;q=0.7,en-US;q=0.6,la;q=0.5",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-api-key": "00112233445566778899",
        "x-app-version": "1",
        Referer: "https://clientapi.dopravnakarta.sk/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      data: `stopID=${stop_id}&platformNumber=-1&fromDateTime=${encodedDate}&maxDepartures=50&maxMinutes=1440`,
    })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  fetchData();
});
