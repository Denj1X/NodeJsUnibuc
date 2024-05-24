const { app } = require("../app.js");
const request = require("supertest");
const { StatusCodes } = require("http-status-codes");

describe("/restaurants", () => {
  test("getAllRestaurants, should return all restaurants", async () => {
    const response = await request(app).get("/restaurants/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GetById, should return BAD REQUEST, invalid ID given", async () => {
    const response = await request(app).get("/restaurants/-1");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test("createRestaurant without Token, should return Unauthorized", async () => {
    const requestBody = {
      name: "test",
      description: "test",
      stars: 3,
      rating: 2.5,
      location: "test",
      available_tables: 2,
      allowPets: true,
      parking: true,
    };
    const response = await request(app).post("/restaurants/add").send(requestBody);
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});

describe("/tables", () => {
  test("GetAll, should return all tables", async () => {
    const response = await request(app).get("/tables/");
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("deleteTable without Token, should return Unauthorized", async () => {
    const response = await request(app).delete("/tables/delete/1");
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  })
});


describe("/auth", () => {
  test("Register without request body, should return BAD REQUEST", async () => {
    const response = await request(app).post("/auth/register");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  })
})