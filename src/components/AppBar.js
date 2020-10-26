import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link to="/" style={{ color: "white" }}>
              <AccountBalanceIcon />
            </Link>
          </IconButton>
          <Typography
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
            variant="h6"
            className={classes.title}
          >
            Kurlar
          </Typography>
          <Button color="inherit">Mert Efe</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
