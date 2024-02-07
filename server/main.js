const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/ping", (req, res) => {
  res.status(200).send();
});

apiRouter.get("/", (req, res) => {
  res.json({
    working: true,
  });
});
const nearestStopRouter = require("./nearestStop");
apiRouter.use("/nearestStop", nearestStopRouter);

const nearestDeparturesRouter = require("./nearestDepartures");
apiRouter.use("/nearestDepartures", nearestDeparturesRouter);

const searchStopsRouter = require("./searchStops");
apiRouter.use("/searchStops", searchStopsRouter);

const stopsByIdRouter = require("./stopsById");
apiRouter.use("/stopsById", stopsByIdRouter);

const nameOfStopByIdRouter = require("./nameOfStopById");
apiRouter.use("/stopName", nameOfStopByIdRouter);

module.exports = apiRouter;
