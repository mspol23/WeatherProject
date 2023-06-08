const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});



app.post("/", (req, res) => {
    const city = req.body.cityName
    const apiKey = "aefdc9aa7e6a24ff07fb54bfaa2c8379";
    const units = "metric";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
    console.log(apiUrl)
    
    https.get(apiUrl, (response) => {
        console.log("statusCode:", response.statusCode)

        response.on("data", (data) => {
            const parsedData = JSON.parse(data)
            console.log(parsedData);
            const temperature = parsedData.main.temp;
            const weatherDescription = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon
            res.write("<h1>The temperature in " + city + " is " + temperature + " degrees Celsius</h1>")
            res.write("<h3>The weather is " + weatherDescription + "</h3>")
            res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'/>")
            res.send()
        })
    })
});

app.listen(3000, () => {
    console.log("Server running at port 3000.")
})
