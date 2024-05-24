const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createRestaurant = async (request, response) => {
  try {
    const restaurant = await prisma.restaurant.create({ data: request.body });
    response.status(StatusCodes.CREATED).json(restaurant);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error creating restaurant: ${error}` });
  }
};

const getAllRestaurants = async (request, response) => {
  try {
    const queryKeys = Object.keys(request.query);
    const createdQuery = {};
    let sortingCriteria;
    let sortingDirection;

    if (queryKeys.length === 0) {
      var restaurants = await prisma.restaurant.findMany();
    } else {
      queryKeys.forEach((key) => {
        if (key !== "sort" && key !== "orderBy") {
          if (key === "stars") {
            createdQuery[key] = parseInt(request.query[key]);
          } else if (
            ["parking", "allowPets"].includes(key)
          ) {
            createdQuery[key] = request.query[key] === "true";
          } else if (key === "location") {
            createdQuery[key] = request.query[key];
          } else {
            throw new Error("Invalid parameter!");
          }
        } else if (key === "orderBy") {
          sortingCriteria = request.query[key];
        } else if (key === "sort") {
          sortingDirection = request.query[key];
        }
      })

      if (sortingCriteria) {
        let orderByBody = sortingDirection
          ? { [sortingCriteria]: sortingDirection }
          : { [sortingCriteria]: "asc" };
        var restaurants = await prisma.restaurant.findMany({
          where: { ...createdQuery },
          orderBy: [orderByBody],
        });
      } else {
        var restaurants = await prisma.restaurant.findMany({
          where: { ...createdQuery },
        });
      }
    }

    response.status(StatusCodes.OK).json(restaurants);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data: ${error}` });
  }
};

const getRestaurantById = async (request, response) => {
  try {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    response.status(StatusCodes.OK).json(restaurant);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data: ${error}` });
  }
};

const updateRestaurant = async (request, response) => {
  try {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: parseInt(id) },
      data: request.body,
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `Restaurant with id: ${id} successfully updated!` });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error updating restaurant: ${error}` });
  }
};

const deleteRestaurant = async (request, response) => {
  try {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id: parseInt(id) },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `Restaurant with id: ${id} successfully deleted!` });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error deleting restaurant: ${error}` });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};