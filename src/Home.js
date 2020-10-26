import React, { useEffect, useState } from "react";
import xml2js from "xml2js";
import axios from "axios";
import CardCurrency from "./components/CardCurrency";
import { Container, CircularProgress, Grid } from "@material-ui/core/";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const Home = () => {
  const [value, setValue] = useState([{}]);
  const [veri, setVeri] = useState([]);
  const [oldVeri, setOldVeri] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const api = async () => {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://www.tcmb.gov.tr/kurlar/today.xml",
        {
          "Content-Type": "application/xml; charset=utf-8",
        }
      );
      xmlParser(response.data);
      setLoading(false);
    };
    api();
  }, []);

  const xmlParser = (data) => {
    let parser = new xml2js.Parser();
    parser.parseString(data, function (err, result) {
      setValue([
        ...value,
        result?.Tarih_Date.Currency[0],
        result?.Tarih_Date.Currency[3],
        result?.Tarih_Date.Currency[4],
      ]);
      socket.emit("message", [
        result?.Tarih_Date.Currency[0],
        result?.Tarih_Date.Currency[3],
        result?.Tarih_Date.Currency[4],
      ]);
    });
  };

  const apiGet = async (code) => {
    const response = await axios.get("http://localhost:4000/old");
    let alıs = await response.data.alıs.map((x) => ({
      kod: x.kod,
      alıs: x.alıs,
    }));
    let eski = await response.data.eski.map((x) => ({
      kod: x.kod,
      eski: x.eski,
    }));

    socket.on("false", (same) => {
      console.log(same, "socket io");
    });

    setVeri([...alıs]);
    setOldVeri([...eski]);
  };

  let finalArray = [];

  const forFunc = () => {
    oldVeri.forEach((eskiveri) => {
      veri.forEach((yeniveri) => {
        if (eskiveri.kod === yeniveri.kod) {
          finalArray.push({
            kod: yeniveri.kod,
            eski: eskiveri.eski,
            alıs: yeniveri.alıs,
          });
        }
      });
    });
    return finalArray;
  };

  useEffect(() => {
    apiGet();
  }, []);

  useEffect(() => {
    forFunc(); //"For func rendered"
  }, [forFunc()]);

  return (
    <div className="App">
      {loading ? (
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <CircularProgress color="secondary" />
        </Container>
      ) : (
        <Grid container style={{ marginTop: "20px" }} justify="center">
          {value?.map((currency, index) => {
            if (
              currency?.$?.Kod === "USD" ||
              currency?.$?.Kod === "EUR" ||
              currency?.$?.Kod === "GBP"
            )
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <CardCurrency
                    kod={currency.$.Kod}
                    kurAlış={currency.ForexBuying}
                    kurSatış={currency.ForexSelling}
                    isim={currency.Isim}
                    sonuc={finalArray}
                    currency={currency}
                  />
                </Grid>
              );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Home;
