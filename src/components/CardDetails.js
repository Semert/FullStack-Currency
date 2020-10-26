import React, { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, ButtonBase, Button, Grid } from "@material-ui/core";
import usd from "../images/usa.jpg";
import gbp from "../images/gbp.png";
import eur from "../images/eur.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 15,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const CardDetails = ({ match }) => {
  let { kod } = useParams();
  let location = useLocation();
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={classes.root} data-aos="flip-up">
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={
                  location.state.currency.$.Kod.toLowerCase() === "usd"
                    ? usd
                    : location.state.currency.$.Kod.toLowerCase() === "eur"
                    ? eur
                    : gbp
                }
                xs={12}
                sm={12}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container alignContent="center">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="button">
                  {location.state.currency.Isim}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {location.state.currency.CurrencyName}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  Alış Fiyatı : {location.state.currency.ForexBuying}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  Satış Fiyatı : {location.state.currency.ForexSelling}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="overline">Güncel</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <ArrowBackIcon style={{ fontSize: 18, marginRight: 10 }} />
            Geri Dön
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default CardDetails;
