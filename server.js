const express = require('express')
const app = express()

//routes
const hotelRoute = require("./routes/hotelRoute");
const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const reservationRoute = require("./routes/reservationRoute");

app.use(express.json());

app.use("/hotels", hotelRoute);
app.use("/rooms", roomRoute);
app.use("/reservations", reservationRoute);
app.use("/auth", userRoute);

app.listen(3000, () => {
	console.log("Proiectul este pe portul 3000")
})

module.exports = { app };