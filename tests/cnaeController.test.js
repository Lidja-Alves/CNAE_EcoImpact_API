import request from "supertest";
import app from "../src/app";
import { openDB } from "../src/ConsultDB";

jest.mock("../src/ConsultDB"); // Mock do openDB para simular o banco de dados

describe("CNAE Controller", () => {
  let dbMock;

  beforeEach(() => {
    dbMock = {
      all: jest.fn(),
      get: jest.fn(),
      run: jest.fn(),
    };
    openDB.mockResolvedValue(dbMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Teste unitário para rota: selectAllCnae
  describe("GET /allcnae", () => {
    it("deve retornar a lista completa de CNAEs", async () => {
      const mockData = [
        {
          cod_cnae: "123",
          dsc_cnae: "CNAE Teste",
          impact_social: "alto",
          impact_ambiental: "alto",
          impact_climatico: "alto",
        },
      ];
      dbMock.all.mockResolvedValue(mockData);

      const response = await request(app).get("/allcnae");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
      expect(dbMock.all).toHaveBeenCalledWith("SELECT * FROM tb_cnae_esg");
    });
  });

  //Teste unitário para rota: selectCnae
  describe("GET /cnae", () => {
    it("deve retornar um CNAE específico", async () => {
      const mockCnae = {
        cod_cnae: 123,
        dsc_cnae: "CNAE Específico",
        impact_social: "alto",
        impact_ambiental: "alto",
        impact_climatico: "alto",
      };
      dbMock.get.mockResolvedValue(mockCnae);

      const response = await request(app).get("/cnae").send({ cnae: 123 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCnae);
      expect(dbMock.get).toHaveBeenCalledWith(
        "SELECT * FROM tb_cnae_esg WHERE cod_cnae = ?",
        [123]
      );
    });
  });

  //Teste unitário para rota: insertCnae
  describe("POST /insertcnae", () => {
    it("deve inserir um novo CNAE", async () => {
      const newCnae = {
        cod_cnae: 456,
        dsc_cnae: "Novo CNAE",
        impact_social: "alto",
        impact_ambiental: "alto",
        impact_climatico: "alto",
      };

      const response = await request(app).post("/insertcnae").send(newCnae);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        statusCode: 200,
        message: "Dados inseridos com sucesso.",
      });
      expect(dbMock.run).toHaveBeenCalledWith(
        "INSERT INTO tb_cnae_esg (cod_cnae, dsc_cnae, impact_social, impact_ambiental, impact_climatico) VALUES (?, ?, ?, ?, ?)",
        [
          newCnae.cod_cnae,
          newCnae.dsc_cnae,
          newCnae.impact_social,
          newCnae.impact_ambiental,
          newCnae.impact_climatico,
        ]
      );
    });
  });

  //Teste unitário para rota: updateCnae
  describe("PUT /updatecnae", () => {
    it("deve atualizar um CNAE existente", async () => {
      const updatedCnae = {
        cod_cnae: 456,
        dsc_cnae: "CNAE Atualizado",
        impact_social: "baixo",
        impact_ambiental: "baixo",
        impact_climatico: "baixo",
      };

      const response = await request(app).put("/updatecnae").send(updatedCnae);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        statusCode: 200,
        message: "Dados atualizados com sucesso.",
      });
      expect(dbMock.run).toHaveBeenCalledWith(
        "UPDATE tb_cnae_esg SET dsc_cnae = ?, impact_social = ?, impact_ambiental = ?, impact_climatico = ? WHERE cod_cnae = ?",
        [
          updatedCnae.dsc_cnae,
          updatedCnae.impact_social,
          updatedCnae.impact_ambiental,
          updatedCnae.impact_climatico,
          updatedCnae.cod_cnae,
        ]
      );
    });
  });

  //Teste unitário para rota: deleteCnae
  describe("DELETE /deletecnae", () => {
    it("deve excluir um CNAE", async () => {
      dbMock.run.mockResolvedValue({ changes: 1 });

      const response = await request(app)
        .delete("/deletecnae")
        .send({ cnae: 456 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        statusCode: 200,
        message: "CNAE excluído com sucesso.",
      });
      expect(dbMock.run).toHaveBeenCalledWith(
        "DELETE FROM tb_cnae_esg WHERE cod_cnae = ?",
        [456]
      );
    });
  });
});
