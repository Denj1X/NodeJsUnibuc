const { PrismaClient } = require("@prisma/client");
const { request, response, query } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createTable = async (request, response) => {
  try {
    const { restaurantId } = request.body;
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(restaurantId) },
    });
    const table = await prisma.table.create({
      data: { ...request.body, availableFrom: new Date() },
    });
    response.status(StatusCodes.CREATED).json(table);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error creating table: ${error}` });
  }
};

const getAllTables = async (request, response) => {
  try {
    const queryKeys = Object.keys(request.query);
    const createdQuery = {};
    let sortingCriteria;
    let sortingDirection;

    if (queryKeys.length === 0) {
      var tables = await prisma.table.findMany();
    } else {
      queryKeys.forEach((key) => {
        if (key !== "sort" && key !== "orderBy") {
          if (key === "restaurantId") {
            createdQuery[key] = parseInt(request.query[key]);
          } else if (
            ["available", "allowPets", "offersParkingSpot"].includes(key)
          ) {
            createdQuery[key] = request.query[key] === "true";
          } else if (key === "fee") {
            createdQuery[key] = parseFloat(request.query[key]);
          } else {
            throw new Error("Invalid parameter!");
          }
        } else if (key === "orderBy") {
          sortingCriteria = request.query[key];
        } else if (key === "sort") {
          sortingDirection = request.query[key];
        }
      });

      if (sortingCriteria) {
        let orderByBody = sortingDirection
          ? { [sortingCriteria]: sortingDirection }
          : { [sortingCriteria]: "asc" };
        var tables = await prisma.table.findMany({
          where: { ...createdQuery },
          orderBy: [orderByBody],
        });
      } else {
        var tables = await prisma.table.findMany({
          where: { ...createdQuery },
        });
      }
    }

    response.status(StatusCodes.OK).json(tables);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data ${error}` });
  }
};

const getTableById = async (request, response) => {
  const { id } = request.params;
  try {
    const table = await prisma.table.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    response.status(StatusCodes.OK).json(table);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data ${error}` });
  }
};

const updateTable = async (request, response) => {
  try {
    const { id } = request.params;
    const table = await prisma.table.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: { id: parseInt(request.body.restaurantId) },
    });
    const updatedTable = await prisma.table.update({
      where: { id: parseInt(id) },
      data: request.body,
    });
    response.status(StatusCodes.OK).json({
      message: `Table with id: ${id} successfully updated!`,
      updatedTable,
    });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error updating table: ${error}` });
  }
};

const deleteTable = async (request, response) => {
  try {
    const { id } = request.params;
    const table = await prisma.table.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const deletedRestaurant = await prisma.table.delete({
      where: { id: parseInt(id) },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: "Table successfully deleted!" });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error deleting table: ${error}` });
  }
};

module.exports = {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
};