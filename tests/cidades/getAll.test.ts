import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Get All", () => {
    it("Get All Registro", async () => {
        const resCreate = await testServer.post("/cidades").send({
            name: "Ji-Paraná",
        });
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

        const res1 = await testServer.get("/cidades").query({
            page: 5,
            limit: 10,
            filter: "TESTE",
        });

        expect(Number(res1.header["x-total-count"])).toBeGreaterThan(0);
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body.length).toBeGreaterThan(0);
    });

    it("Get All com page zero", async () => {
        const res1 = await testServer.get("/cidades").query({
            page: 0,
            limit: 10,
            filter: "TESTE",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });

    it("Get All com limit zero", async () => {
        const res1 = await testServer.get("/cidades").query({
            page: 5,
            limit: 0,
            filter: "TESTE",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });
});
