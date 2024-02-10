const express = require("express");
const nearestStopRouter = express.Router();
module.exports = nearestStopRouter;
const axios = require("axios");

nearestStopRouter.post("/:longitude/:latitude", async (req, res) => {
  const { longitude, latitude } = req.params;

  console.log(latitude);
  const fetchData = async () => {
    const url = "https://clientapi.dopravnakarta.sk/api/v2/GetNearestStops";
    const headers = {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language":
        "en-GB,en;q=0.9,sk-SK;q=0.8,sk;q=0.7,en-US;q=0.6,la;q=0.5",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua":
        '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "x-api-key": "00112233445566778899",
      "x-app-version": "1",
      Referer: "https://clientapi.dopravnakarta.sk/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    const data = `Longitude=${longitude}&Latitude=${latitude}&maxCount=13&radiusKilometers=3&cityID=0`;
    try {
      const response = await axios.post(url, data, { headers });
      // console.log("Response data:", response.data);
      res.status(200).json(response.data.NearestStops);
    } catch (error) {
      console.error("Error fetching data:", error);
      // res.send("Not found");
    }
  };

  fetchData();
});
