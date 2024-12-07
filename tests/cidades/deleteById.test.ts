import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Delete By Id", () => {
    it("Deletar Registro", async () => {
        const resCreate = await testServer.post("/cidades").send({
            name: "Ji-Paraná",
        });
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
        const res1 = await testServer.delete(`/cidades/${resCreate.body}`);

        expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Tentar deletar registro com id zero!", async () => {
        const res1 = await testServer.delete("/cidades/0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });

    it("Tentar deletar registro inexistente!", async () => {
        const res1 = await testServer.delete("/cidades/99999");

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
