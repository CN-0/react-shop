import * as React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  dflex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  link: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  appbar: {
    backgroundColor: "#2196f3",
  },
  home: {
    fontSize: "25px",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <Container maxWidth="lg" className={classes.dflex}>
          <Button
            className={classes.home}
            edge="start"
            color="inherit"
            aria-label="home"
          >
            <Link to="/" className={classes.link}>
              React Shop
            </Link>
          </Button>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.dflex}
          >
            <Link to="/cart" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"cart"} />
              </ListItem>
            </Link>
            <Link to="/checkout" className={classes.link}>
              <ListItem button>
                <ListItemText primary={"checkout"} />
              </ListItem>
            </Link>
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
