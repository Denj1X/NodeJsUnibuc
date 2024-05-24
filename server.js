const express = require('express')
const app = express()

//routes
const restaurantRoute = require("./routes/restaurantRoute");
const userRoute = require("./routes/userRoute");
const tableRoute = require("./routes/tableRoute");
const reservationRoute = require("./routes/reservationRoute");

app.use(express.json());

app.use("/restaurants", restaurantRoute);
app.use("/tables", tableRoute);
app.use("/reservations", reservationRoute);
app.use("/auth", userRoute);

app.listen(3000, () => {
	console.log("Proiectul este pe portul 3000")
})

module.exports = { app };