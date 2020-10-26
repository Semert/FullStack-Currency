const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Currency = require("./models/currencyModel");
const oldCurrency = require("./models/oldCurrencyModel");

var cors = require("cors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const currencyRoutes = require("./routes/currencyRoutes");
const oldCurrencyRoutes = require("./routes/oldCurrencyRoutes");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Bağlantı başarılı");
  next();
});

io.on("connection", (socket) => {
  console.log("Socket başarıyla bağlandı.");

  socket.on("message", async (msg) => {
    const currency = await Currency.find({});

    const usdcur = await currency.find((cur) => cur.kod === "USD");
    const eurcur = await currency.find((cur) => cur.kod === "EUR");
    const gbpcur = await currency.find((cur) => cur.kod === "GBP");

    const usdmsg = await msg.find((cur) => cur.$.Kod === "USD");
    const eurmsg = await msg.find((cur) => cur.$.Kod === "EUR");
    const gbpmsg = await msg.find((cur) => cur.$.Kod === "GBP");

    console.log(usdmsg.ForexBuying[0]);

    const dynamicData = async (cur, msg) => {
      if (cur.alıs - msg.ForexBuying[0] === 0) {
        return console.log("Bir değişiklik algılanmadı.");
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            let kodeski = cur.kod;
            let eski = cur.alıs;

            const yeniKur = {
              kodeski,
              eski,
            };

            oldCurrency.updateOne(
              { kod: kodeski },
              yeniKur,
              (err, updatedBoard) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("oldCurrency updated");
                }
              }
            );

            let kodyeni = msg.$.Kod;
            let alıs = msg.ForexBuying[0];

            const alısKuru = {
              kodyeni,
              alıs,
            };

            Currency.updateOne(
              { kod: kodyeni },
              alısKuru,
              (err, updatedBoard) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Currency updated");
                }
              }
            );
            resolve("resolved");
          }, 1500);
        });
      }
    };
    async function asyncCall() {
      if (usdmsg && usdcur) {
        console.log("calling");
        const result = await dynamicData(usdcur, usdmsg);
        console.log(result);
      }
      if (eurcur && eurmsg) {
        console.log("calling..");
        const result1 = await dynamicData(eurcur, eurmsg);
        console.log(result1);
      }
      if (gbpmsg && gbpcur) {
        console.log("calling......");
        const result2 = await dynamicData(gbpcur, gbpmsg);
        console.log(result2);
      }
    }
    asyncCall();
  });
  socket.on("disconnect", () => {
    console.log("Kullanıcı ile bağlantı kesildi.");
  });
});

mongoose.connect(
  "mongodb+srv://mert:1234@cluster0.gdyo9.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose connected");
});

app.use("/mert", currencyRoutes);
app.use("/old", oldCurrencyRoutes);

app.get("/", (req, res) => {
  res.send("merhaba");
});

app.use(notFound);
app.use(errorHandler);

http.listen(4000, () => console.log("Server ile bağlantı başarılı."));
