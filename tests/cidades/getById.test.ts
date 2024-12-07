import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Get By Id", () => {
    it("buscar Registro", async () => {
        const resCreate = await testServer.post("/cidades").send({
            name: "Ji-Paraná",
        });
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
        const res1 = await testServer.get(`/cidades/${resCreate.body}`);

        expect(Number(res1.header["x-total-count"])).toBeGreaterThan(0);
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        //expect(res1.body.length).toBeGreaterThan(0);
    });

    it("Tentar buscar registro com id zero!", async () => {
        const res1 = await testServer.get("/cidades/0").send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });

    it("Tentar buscar registro inexistente!", async () => {
        const res1 = await testServer.get("/cidades/99999").send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
