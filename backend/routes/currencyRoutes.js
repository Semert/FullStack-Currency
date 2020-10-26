const express = require("express");
const Currency = require("../models/currencyModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const currency = await Currency.find({});

  if (currency) {
    res.status(201).json(currency);
    console.log("Getirildi");
  } else {
    res.status(404);
    throw new Error("Bu kura ait bir içerik bulunamadı.");
  }
});

router.get("/:kod", async (req, res) => {
  const kod = await Currency.findOne({ name: req.params.kod });
  if (kod) {
    res.status(201).json(kod);
    console.log("koda ait içerik getirildi.");
  } else {
    res.status(404);
    throw new Error("Bu kura ait bir içerik bulunamadı.");
  }
});

router.post("/gonder", (req, res) => {
  const yeniKur = new Currency({
    kod: req.body.kod,
    alıs: Number(req.body.alıs),
    satıs: Number(req.body.satıs),
  });

  yeniKur
    .save()
    .then((sonuc) => {
      res.json("kur eklendi", sonuc);
    })
    .catch((err) => res.json(err));
});

router.put("/kod", (req, res) => {
  let kod = req.body.kod;
  let alıs = req.body.alıs;
  let satıs = req.body.satıs;

  const yeniKur = {
    kod,
    alıs,
    satıs,
  };

  Currency.updateOne({ kod: kod }, yeniKur, (err, updatedBoard) => {
    if (err) {
      res.json({
        yeniKur,
        success: false,
        msg: "Failed to update board",
      });
    } else {
      res.json({ yeniKur, success: true, msg: "Board added" });
    }
  });
});
module.exports = router;
