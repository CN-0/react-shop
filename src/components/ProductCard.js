import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Image from "../assets/images/iphone.png";
import { Context as DataContext } from "../context/dataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    paddingTop: "10px",
    margin: 20,
    cursor: "pointer",
  },
  media: {
    height: 200,
    objectFit: "cover",
    width: 150,
    margin: "auto",
  },
  box: {
    color: "white",
    display: "inline",
    backgroundColor: "#2196f3",
    fontFamily: "Monospace",
    padding: "1px 2px",
    margin: "0px 2px 8px 0px",
  },
  button: {
    margin: "-15px auto 5px auto",
    borderColor: "#2196f3",
  },
}));

function ProductCard(props) {
  const [raised, setRaised] = useState(false);
  const {
    state: { cartItems, totalCost },
    addItemToCart,
  } = useContext(DataContext);
  const classes = useStyles();

  const addToCart = () => {
    let index = cartItems.findIndex((item) => item.product === props.product);
    if (index === -1) {
      addItemToCart(
        [...cartItems, { product: props.product, quantity: 1 }],
        totalCost + parseInt(props.product.cost)
      );
    } else {
      let newCartItems = [...cartItems];
      newCartItems[index] = {
        product: props.product,
        quantity: cartItems[index].quantity + 1,
      };
      addItemToCart(newCartItems, totalCost + parseInt(props.product.cost));
    }
    props.history.push("/cart");
  };

  return (
    <Card
      className={classes.root}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
      raised={raised}
    >
      <CardMedia className={classes.media} image={Image} title="image" />
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          {props.product.name}
        </Typography>
        <Box className={classes.box}>{props.product.category}</Box>
        <Box className={classes.box}>{props.product.brand}</Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={classes.button}
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(ProductCard);
