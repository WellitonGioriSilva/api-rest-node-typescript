import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Update By Id", () => {
    it("Atualizar Registro", async () => {
        const resCreate = await testServer.post("/cidades").send({
            name: "Ji-Paraná",
        });
        expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
        const res1 = await testServer.put(`/cidades/${resCreate.body}`).send({
            name: "Jipa",
        });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        //expect(typeof res1.body).toEqual("number");
    });

    it("Tentar atualizar registro com nome muito curto!", async () => {
        const res1 = await testServer.put("/cidades/1").send({
            name: "A",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });

    it("Tentar atualizar registro com nome muito longo!", async () => {
        const res1 = await testServer.put("/cidades/1").send({
            name: "TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE T",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });

    it("Tentar atualizar registro com id zero!", async () => {
        const res1 = await testServer.put("/cidades/0").send({
            name: "Ji-Paraná",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });

    it("Tentar atualizar registro inexistente!", async () => {
        const res1 = await testServer.put("/cidades/99999").send({
            name: "Ji-Paraná",
        });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty("errors.default");
    });
});
