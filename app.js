"use strict";
// Library imports
var request = require("request");
var Push = require("pushover-notifications");
const vaccineAPIURL =
  "https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json";
var intervalObj;

const CITIES_TO_CHECK = [
  "TEMPLE",
  "BELTON",
  "HARKER HEIGHTS",
  "KILLEEN",
  "COPPERAS COVE",
  "WOODWAY",
  "GATESVILLE",
  "WACO",
  "GEORGETOWN",
  "TAYLOR",
  "WACO",
  "GEORGETOWN",
  "BELLMEAD",
  "ROUND ROCK",
  "HUTTO",
  "LEANDER",
  "CEDAR PARK",
];

// temple https://heb.secure.force.com/FlexibleScheduler/FSAppointment?event_ID=a8h4P000000GuenQAC&s=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkZsZXhTY2hlZENlcnQifQ.eyJldmVudElkIjoiYThoNFAwMDAwMDBHdWVuUUFDIiwiZXhwIjoxNjE0NTM2NjQwLCJuYmYiOjE2MTQ1MzY1MjAsImlhdCI6MTYxNDUzNjUyMCwiaXNzIjoiaHR0cHM6Ly9oZWIuY29tIn0.Fx17iPkOoWBIQJcz8fzYsLZktiaXrm1LZ6KU80dJR1EVo9DQ0BwjRGxMa776yr1hgmDbtgfZOD12Lv7GrEE45ykUByreSXfS8F-9i1S0ZZOKR0yGbQbYwv4Mr9GEaGB9YC4Ax3H5j1MZ55Fb-JsflvjIKx5Q1001kk0oW__k-opQ888ykw4mlNiOS_mvy47d9uPwDJ54vPpNseGt52yHIdwicEXvjJ-6zOsWdz-BtFL5F4FlTQn0nXFu7qMqyHZAIzPLgt2PF4eAaPc9dogagdlPFp--ta5LtdmCw0fxPI5DT2J7FZuhrNGgv631iPT-bA7yjxVtnCuFGcZOqoSpsA
// temple https://heb.secure.force.com/FlexibleScheduler/FSAppointment?event_ID=a8h4P000000GuadQAC&s=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkZsZXhTY2hlZENlcnQifQ.eyJldmVudElkIjoiYThoNFAwMDAwMDBHdWFkUUFDIiwiZXhwIjoxNjE0NTM3NDIwLCJuYmYiOjE2MTQ1MzczMDAsImlhdCI6MTYxNDUzNzMwMCwiaXNzIjoiaHR0cHM6Ly9oZWIuY29tIn0.KPl5dKhJYUHMdYzjZQGTysj6Vro0ekCf20CXmUChSqdyWTJYIZPepC_D07AKrnoA3dUOUvYeeekJF0gth8UbvAG-Va6jNS6R4EnoqL2C02LCosIFk9OGITDefSy9bKAMlMWaTqsM2WszhPKrwqg4nu5iXBffkPOzUbqfgNV5ONScI072jtRVoZXMnF8Fpq-8I5Q0051s-JQ1PUtUHz5rxbvxp8WtseVVNuPv5PUPxVWRMVrbwrXoyKeIo6e-4MNubjo4s0WhgDvTyqX_hge6hEMQl9Dn8CbURegaMn0xHlBOYYIrMkmA4duEv-6qsLEBEmJfhew2YPG1YUnhyrviKw
// ft hood https://heb.secure.force.com/FlexibleScheduler/FSAppointment?event_ID=a8h4P000000GueOQAS&s=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkZsZXhTY2hlZENlcnQifQ.eyJldmVudElkIjoiYThoNFAwMDAwMDBHdWVPUUFTIiwiZXhwIjoxNjE0NTM3NTQwLCJuYmYiOjE2MTQ1Mzc0MjAsImlhdCI6MTYxNDUzNzQyMCwiaXNzIjoiaHR0cHM6Ly9oZWIuY29tIn0.E7_d_XzzJ8ZunAj89beYkITt8ZW3u9RGohYMf70vq5w1B2DwzO_0jQPwIvHnWh6r_83JMV2r9aYIfnz1OzCGulce29yd9GDjJRyZVMH4xhvkuIc_e34qJeubF0RcPFP-Co2xS9_j56_HQlIF5f10tdLSxs6WTW_MFPHUFDxcaRaJpW9EutHkIFzebaTcfJvQedt-D9G-p8Ed_Ci1kH-6CgvHIFwrKUHWBYb95vWkA3UyVtxb1bMF1uMOtImHxTB8SkE8pvVIpq5HsBs0CoBOSy8fqBj6fibTEpTi7kSGeoiBxDuRAv6LI8Jz7HYNAPEXoKW7LACYGSAgFc9ukpChwA

const pushNotificationAPIURL = "api.pushover.net:443";
const PUSHOVER_TOKEN = "ahyqzpz4fh1qq8pp7wccoyatns2ur2"; // os.getenv('PUSHOVER_TOKEN')
const PUSHOVER_USER = "gtz958ezhi2nwsem9bh8k67sbjo5cr"; // os.getenv('PUSHOVER_USER')

function pushLocations(locationsWithVaccineAvailable) {
  console.log("Vaccine is now available here:");
  console.log(locationsWithVaccineAvailable);

  var p = new Push({
    // user: process.env['PUSHOVER_USER'],
    // token: process.env['PUSHOVER_TOKEN'],

    user: PUSHOVER_USER,
    token: PUSHOVER_TOKEN,
    // httpOptions: {
    //   proxy: process.env['http_proxy'],
    //},
    // onerror: function(error) {},
    // update_sounds: true // update the list of sounds every day - will
    // prevent app from exiting.
  });

  var msg = {
    message: JSON.stringify(locationsWithVaccineAvailable),
    title: "Vaccine available",
    sound: "pushover",
    // device: 'test_device',
    priority: 1,
    // retry: 30,
    // expire: 10800,
    url: "https://vaccine.heb.com/scheduler",
    url_title: "vaccine.heb.com/scheduler",
  };

  p.send(msg, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log("Wait a minute before we check again");
      clearInterval(intervalObj);
      setTimeout(() => {
        intervalObj = setInterval(() => {
          callAPI(vaccineAPIURL);
        }, 5000);
      }, 60000);
    }

    console.log(result);
  });
}

function handleAPIResponse(body) {
  const locations = body.locations;

  const locationsWithVaccineAvailable = locations.filter(
    (location) =>
      CITIES_TO_CHECK.includes(location.city) &&
      (location.openAppointmentSlots > 0 || location.openTimeslots > 0)
  );
  if (locationsWithVaccineAvailable.length > 0) {
    pushLocations(locationsWithVaccineAvailable);
  }
  // locations.forEach((location) => console.log(location));
}

// Vaccine API
function callAPI(url) {
  var headers = {
    "Content-Type": "application/json",
  };

  var options = {
    url: url,
    method: "GET",
    headers: headers,
    body: null,
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      handleAPIResponse(JSON.parse(body));
    } else {
      console.error(error);
    }
  }

  // Make the API request
  request(options, callback);
}

console.log("Monitoring vaccine availability");
intervalObj = setInterval(() => {
  callAPI(vaccineAPIURL);
}, 5000);
