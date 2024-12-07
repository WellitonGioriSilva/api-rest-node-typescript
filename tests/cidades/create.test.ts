import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cidades - Create", () => {
    it("Cria Registro", async () => {
        const res1 = await testServer.post("/cidades").send({
            name: "Ji-Paraná",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        //expect(typeof res1.body).toEqual("number");
    });

    it("Tentar criar registro com nome muito curto!", async () => {
        const res1 = await testServer.post("/cidades").send({
            name: "A",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });

    it("Tentar criar registro com nome muito longo!", async () => {
        const res1 = await testServer.post("/cidades").send({
            name: "TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE TESTE T",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });
});
