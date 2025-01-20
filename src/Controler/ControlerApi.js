import { openDB } from "../ConsultDB.js";

export async function selectAllCnae(req, res) {
  try {
    const db = await openDB();
    const impactList = await db.all("SELECT * FROM tb_cnae_esg");
    res.json(impactList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao consultar os CNAEs." });
  }
}

export async function selectCnae(req, res) {
  try {
    const { cnae } = req.body;
    const db = await openDB();
    const cnaeItem = await db.get(
      "SELECT * FROM tb_cnae_esg WHERE cod_cnae = ?",
      [cnae]
    );
    if (cnaeItem) {
      res.json(cnaeItem);
    } else {
      res.status(404).json({ error: "CNAE não encontrado." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao consultar o CNAE." });
  }
}

export async function insertCnae(req, res) {
  try {
    const {
      cod_cnae,
      dsc_cnae,
      impact_social,
      impact_ambiental,
      impact_climatico,
    } = req.body;
    const db = await openDB();
    await db.run(
      "INSERT INTO tb_cnae_esg (cod_cnae, dsc_cnae, impact_social, impact_ambiental, impact_climatico) VALUES (?, ?, ?, ?, ?)",
      [cod_cnae, dsc_cnae, impact_social, impact_ambiental, impact_climatico]
    );
    res.json({ statusCode: 200, message: "Dados inseridos com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir os dados." });
  }
}

export async function updateCnae(req, res) {
  try {
    const {
      cod_cnae,
      dsc_cnae,
      impact_social,
      impact_ambiental,
      impact_climatico,
    } = req.body;
    const db = await openDB();
    await db.run(
      "UPDATE tb_cnae_esg SET dsc_cnae = ?, impact_social = ?, impact_ambiental = ?, impact_climatico = ? WHERE cod_cnae = ?",
      [dsc_cnae, impact_social, impact_ambiental, impact_climatico, cod_cnae]
    );
    res.json({ statusCode: 200, message: "Dados atualizados com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar os dados." });
  }
}

export async function deleteCnae(req, res) {
  try {
    const { cnae } = req.body;
    const db = await openDB();
    const result = await db.run("DELETE FROM tb_cnae_esg WHERE cod_cnae = ?", [
      cnae,
    ]);

    if (result.changes > 0) {
      res.json({ statusCode: 200, message: "CNAE excluído com sucesso." });
    } else {
      res.status(404).json({ error: "CNAE não encontrado para exclusão." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir o CNAE." });
  }
}
