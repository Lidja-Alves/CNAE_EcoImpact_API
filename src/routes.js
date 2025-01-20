import { Router } from "express";
import {
  selectAllCnae,
  selectCnae,
  insertCnae,
  updateCnae,
  deleteCnae,
} from "./Controler/ControlerApi.js";

const router = Router();

//Rota de health check
router.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    msg: "Health check OK",
  });
});

router.get("/allcnae", selectAllCnae);
router.get("/cnae", selectCnae);
router.post("/insertcnae", insertCnae);
router.put("/updatecnae", updateCnae);
router.delete("/deletecnae", deleteCnae);

export default router;
