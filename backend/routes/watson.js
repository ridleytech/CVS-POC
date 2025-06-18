var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const watsonAuth = process.env.WATSON_AUTH;
const watsonSkillID = process.env.WATSON_SKILL_ID;

//Endpoint to process Watson assistant webhook calls

router.post("/processResponse", function (req, res, next) {
  processResponse(req, res);
});

const processResponse = (req, res) => {
  console.log("body", req.body);

  if (req.body.data == "message") {
    sendWatsonMessage(req, res);
  } else if (req.body.providers) {
    console.log("has providers");
    getProviders(req, res);
  } else {
    console.log("no params");
    res.send({
      status: "success",
      data: "Webhook successful. No valid params were provided from Watson to process response.",
    });
  }

  if (req.body.insertLog) {
    console.log("insertLog");
    insertLog(req, res);
  }
};

const sendWatsonMessage = async (req, res) => {
  console.log("req.body: ", req.body);

  var data = {
    input: {
      text: req.body.userMessage,
    },
  };

  if (req.body.context) {
    console.log("has context");
    data.context = req.body.context;
  }

  var url = `https://api.us-south.assistant.watson.cloud.ibm.com/v1/workspaces/${watsonSkillID}/message?version=2019-02-28`;

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${watsonAuth}`,
    },
    data: JSON.stringify(data),
  };

  axios
    .request(config)
    .then((response) => {
      res.send({ status: "successful", data: response.data });
    })
    .catch((error) => {
      console.log(error);

      res.send({ status: "error", data: error });
    });
};

const getProviders = (req, res) => {
  //mocks database call to retrieve providers

  const data = {
    providers: [
      {
        name: "Dr. Lisa Hernandez, MD",
        address: "1200 McKinney St, Houston, TX 77010",
        distance_miles: 1.2,
      },
      {
        name: "Dr. Kevin Patel, DO",
        address: "500 Crawford St, Suite 250, Houston, TX 77002",
        distance_miles: 0.6,
      },
      {
        name: "Dr. Maria Gomez, MD",
        address: "1415 Louisiana St, Houston, TX 77002",
        distance_miles: 0.8,
      },
      {
        name: "Dr. Angela Wu, MD",
        address: "2800 Kirby Dr, Suite B100, Houston, TX 77098",
        distance_miles: 3.4,
      },
      {
        name: "Dr. Brian Thompson, MD",
        address: "3201 Allen Pkwy, Houston, TX 77019",
        distance_miles: 2.9,
      },
    ],
  };

  res.send({
    status: "successful",
    data,
    queryType: "providers",
    recordTotal: data.providers.length,
  });
};

module.exports = router;
