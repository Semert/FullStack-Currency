import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Popover,
} from "@material-ui/core";
import usd from "../images/usa.jpg";
import gbp from "../images/gbp.png";
import eur from "../images/eur.png";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import axios from "axios";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    padding: 15,
    marginTop: 20,
    margin: "auto",
    minWidth: 200,
    borderBottom: "5px solid blue",
  },
});

const CardCurrency = ({ kod, kurAlış, kurSatış, isim, sonuc, currency }) => {
  const classes = useStyles();
  const handleFlag = (type) => {
    if (type === "USD") {
      return usd;
    } else if (type === "GBP") {
      return gbp;
    } else {
      return eur;
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleMark = (type) => {
    for (let i = 0; i < 3; i++) {
      if (type === sonuc[i]?.kod) {
        let solution = sonuc[i]?.alıs - sonuc[i]?.eski;
        if (solution === 0) {
          return "default";
        } else if (solution > 0) {
          return true;
        } else if (solution < 0) {
          return false;
        }
      }
    }
  };

  //Initial Veriyi Post etmek için.
  const apiPost = async (kod, satıs, alıs) => {
    const response = await axios.post("http://localhost:4000/mert/gonder", {
      kod,
      satıs,
      alıs,
    });
    if (response.data.errors) {
      console.log("Hata ile karşılaşıldı", response.data.message);
    } else {
      console.log(response.data, "Sonuçlandı.");
    }

    const old = await axios.post("http://localhost:4000/old/gonder", {
      kod,
      alıs,
    });
    if (old.data.errors) {
      console.log("Hata ile karşılaşıldı", old.data.message);
    } else {
      console.log(old.data, "Sonuçlandı.");
    }
  };
  // Initial Veriyi Update etmek için.
  const apiPut = async (kod, alıs, satıs) => {
    const response = await axios.put("http://localhost:4000/mert/kod", {
      kod,
      alıs,
      satıs,
    });
    if (response.data.errors) {
      console.log("Hata ile karşılaşıldı");
    } else {
      console.log(response.data, "Sonuçlandı.");
    }
  };

  return (
    <Card className={classes.root} data-aos="fade-up">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="120"
          image={handleFlag(kod)}
        />
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h6" component="h6">
            {isim}
          </Typography>
          <Typography variant="button">{kod}</Typography>

          <Typography
            style={{
              display: "flex",
              textAlign: "center",
              color:
                handleMark(kod) === "default"
                  ? "blue"
                  : handleMark(kod)
                  ? "green"
                  : "red",
            }}
            variant="subtitle2"
            component="p"
          >
            Alış:{" "}
            <CountUp
              start={0}
              end={Number(kurAlış[0])}
              duration={2}
              decimals={4}
              style={{ marginLeft: 5, marginRight: 5, fontSize: 15 }}
            />
            TRY{" "}
            {handleMark(kod) === "default" ? (
              ""
            ) : handleMark(kod) ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon style={{ fontSize: 21 }} />
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                {...bindTrigger(popupState)}
                style={{ fontSize: 10 }}
              >
                TCMB
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box p={1.5}>
                  <Typography>
                    {" "}
                    <a
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      href="https://www.tcmb.gov.tr/kurlar/today.xml"
                    >
                      {" "}
                      Veri TCMB'ye aittir.
                    </a>
                  </Typography>
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>

        <Link to={{ pathname: `/details/${kod}`, state: { currency } }}>
          <Button style={{ fontSize: "10px" }} size="small" color="primary">
            Detaylar
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardCurrency;
