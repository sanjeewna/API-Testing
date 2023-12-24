const request = require("supertest")("https://airportgap.com/api");
const expect = require("chai").expect;
require('dotenv').config();
let bearerToken = process.env.AIRPORT_GAP_TOKEN;

// added a get case for airport api
describe("GET /airports", function () {
  it("returns all airports, limited to 30 per page", async function () {
    const response = await request.get("/airports").set('Authorization', `Bearer token=${bearerToken}`);
    
    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30);
  });
});

//added a post request for airport api
describe("POST /airports/distance", function () {
    it("calculates the distance between two airports", async function () {
      const response = await request
        .post("/airports/distance")
        .set('Authorization', `Bearer token=${bearerToken}`)
        .send({ from: "KIX", to: "SFO" });
  
      expect(response.status).to.eql(200);
  
      const attributes = response.body.data.attributes;
      expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
     
    });
  });
