const { PrismaClient } = require("@prisma/client");
const { response, request } = require("express");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const validateReservation = async (request, response, next) => {
  try {
    const { restaurantId, tableId } = request.body;
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    
    const reservation = request.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(userId) },
    });

    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(restaurantId) },
    });
    if (restaurant.available_tables === 0) {
      throw new Error(
        `There are no tables available for the selected restaurant: ${restaurantId}`
      );
    } else if (restaurant.allowPets === false && reservation.hasPets === true) {
      throw new Error(`Pets are no allowed in this restaurant! ${restaurantId}`);
    } else if (
      restaurant.parking === false &&
      reservation.needParkingSpot === true
    ) {
      throw new Error(`This restaurant doesn't offer a parking slot! ${restaurantId}`);
    }

    const table = await prisma.table.findUniqueOrThrow({
      where: { id: parseInt(tableId) },
    });
    if (table.available === false) {
      throw new Error(
        `Table with ID ${tableId} is occupied until ${table.availableFrom}`
      );
    } else if (table.allowPets === false && reservation.hasPets === true) {
      throw new Error(`Pets are not allowed in this table (ID ${tableId}!`);
    } else if (
      table.offersParkingSpot === false &&
      reservation.needParkingSpot === true
    ) {
      throw new Error(
        `Reservation for this table (ID ${tableId}) doesn't include a parking spot!`
      );
    } else if (table.max_capacity < reservation.number_of_people) {
      throw new Error(`You exceed table (ID ${tableId}) capacity!`);
    }
    next();
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

module.exports = validateReservation;