const express = require("express");
const modelUrl = require("../model/urlSchema");
const router = express.Router();
const axios = require("axios");
const shortid = require("short-id");
const validUrl = require("valid-url");
const redis = require("redis");
const { promisify } = require("util");

//connection to redis server.
// const redisClient = redis.createClient(
//   15549,
//   "redis-15549.c301.ap-south-1-1.ec2.cloud.redislabs.com",
//   { no_ready_check: true }
// );

// redisClient.auth("vgiGcnhTRPPnfwO5RBv3kKEaAUj0XwRk", function (err) {
//   if (err) {
//     throw err;
//   }
// });

// redisClient.on("connect", async () => {
//   console.log("connected to redis.");
// });

//setAsync and getAsync is a promisified version of client.set and client.get.
// const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
// const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

router.post("/shorten", async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    if (Object.keys(req.body).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Request body is empty please provide long url details.",
      });
    }
    if (Object.keys(req.body) > 1) {
      return res.status(400).send({
        status: false,
        message: "Request body should only contain long URL details.",
      });
    }
    if (!longUrl) {
      return res.status(400).send({
        status: false,
        message: "Long URL is mandatory.",
      });
    }
    if (!validUrl.isUri(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid long URL." });
    }
    let correctUrl = true;
    await axios
      .get(longUrl)
      .then(() => {
        correctUrl = true;
      })
      .catch(() => {
        correctUrl = false;
      });
    if (!correctUrl)
      return res
        .status(200)
        .send({ status: false, message: "Send a valid URL" });
    // const cachedUrl = await GET_ASYNC(`${longUrl}`);
    // if (cachedUrl) {
    //   const data = JSON.parse(cachedUrl);
    //   return res.status(400).send({
    //     status: true,
    //     message: "It was already present in the DB and cached in the redis.",
    //     data,
    //   });
    // }
    const url = await modelUrl.findOne({ longUrl: longUrl });
    if (url) {
      return res.status(200).send({
        status: true,
        message: "It was already present in the DB.",
        url,
      });
    } else {
      const urlCode = shortid.generate(longUrl);
      const shortUrl = `http://localhost:3000/${urlCode}`;
      const obj = {
        urlCode: urlCode,
        longUrl: longUrl,
        shortUrl: shortUrl,
      };
      const user = new modelUrl(obj);
      const url = await user.save();
      // await SET_ASYNC(`${short.longUrl}`, JSON.stringify(short));
      // redisClient.expire(`${short.longUrl}`, 300);
      return res.status(201).send({ status: true, url });
    }
  } catch (e) {
    return res.status(500).send({ status: false, error: e.message });
  }
});

router.get("/:urlCode", async (req, res) => {
  try {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
      return res
        .status(400)
        .send({ status: false, message: "Not a valid urlCode" });
    }
    // const cachedUrlData = await GET_ASYNC(`${urlCode}`);
    // if (cachedUrlData) {
    //   const data = JSON.parse(cachedUrlData);
    //   return res.status(302).redirect(data.longUrl);
    // }
    const url = await modelUrl.findOne({ urlCode: urlCode });
    if (url) {
      // await SET_ASYNC(`${urlCode}`, JSON.stringify(url));
      // redisClient.expire(`${urlCode}`, 300);
      return res.status(302).redirect(url.longUrl);
    } else {
      return res.status(404).send({ status: false, message: "Not found" });
    }
  } catch (e) {
    return res.status(500).send({ status: false, error: e.message });
  }
});

module.exports = router;
