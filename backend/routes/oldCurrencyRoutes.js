const express = require("express");
const oldCurrency = require("../models/oldCurrencyModel");
const Currency = require("../models/currencyModel");

const router = express.Router();

router.get("/", async (req, res) => {
  let oldCurrencyData = await oldCurrency.find({});
  let currency = await Currency.find({});

  if (oldCurrencyData) {
    res.status(201).json({ eski: oldCurrencyData, alıs: currency });
    console.log("Getirildi");
  } else {
    res.status(404);
    throw new Error("Bu kura ait bir içerik bulunamadı.");
  }
});

router.post("/gonder", (req, res) => {
  console.log(req.body.alıs);

  const yeniKur = new oldCurrency({
    kod: req.body.kod,
    eski: Number(req.body.alıs),
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
  let eski = req.body.satıs;

  const yeniKur = {
    kod,
    eski,
  };

  Currency.updateOne({ kod: kod }, yeniKur, (err, updatedBoard) => {
    if (err) {
      res.json({
        yeniKur,
        success: false,
        msg: "Failed to update board",
      });
    } else {
      res.json({ yeniKur, success: true, msg: "Board added to old" });
    }
  });
});

module.exports = router;
