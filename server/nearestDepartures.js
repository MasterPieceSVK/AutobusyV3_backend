const express = require("express");
const nearestDeparturesRouter = express.Router();
module.exports = nearestDeparturesRouter;
const axios = require("axios");

nearestDeparturesRouter.post("/:longitude/:latitude", async (req, res) => {
  const { longitude, latitude } = req.params;

  let date = new Date();
  let encodedDate = encodeURIComponent(date.toUTCString());
  console.log(encodedDate);

  let data = `Longitude=${longitude}&Latitude=${latitude}&fromDateTime=${encodedDate}&maxStops=1&maxMinutes=1440&radiusKilometers=3&maxDepartures=10`;

  axios({
    method: "post",
    url: "https://clientapi.dopravnakarta.sk/api/v2/GetPlannedDeparturesFromNearStops",
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
    data: data,
  })
    .then(function (response) {
      // handle success
      console.dir(
        response.data.PlannedDeparturesFromNearestStops[0].PlannedDepartures,
        {
          depth: null,
        }
      );
      res.json(
        response.data.PlannedDeparturesFromNearestStops[0].PlannedDepartures
      );
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});
