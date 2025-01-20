import { open } from "sqlite";
import sqlite3 from "sqlite3";

export async function openDB() {
  try {
    return open({
      filename: "./src/BD_CNAEEcoImpactAPI.db",
      driver: sqlite3.Database,
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    throw err;
  }
}
