import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";

const CurrenctDate = () => {
  const [time, setTime] = useState();
  const dateBuilder = (d) => {
    let months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    let days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let time = d.toLocaleTimeString();

    return `${day} ${date} ${month} ${year} ${time}`;
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    let setTimer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(setTimer);
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center" }} data-aos="fade-up">
      <Typography
        component="div"
        variant="button"
        style={{ marginTop: "70px" }}
      >
        {dateBuilder(new Date())}
      </Typography>
    </Container>
  );
};

export default CurrenctDate;
