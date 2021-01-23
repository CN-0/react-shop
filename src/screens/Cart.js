import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Image from "../assets/images/iphone.png";
import { Context as DataContext } from "../context/dataContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "30px",
    padding: "20px 20px 0px 20px",
    width: 840,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  },
  card: {
    display: "flex",
    height: 180,
    padding: "10px 20px",
    marginBottom: 20,
  },
  media: {
    height: 150,
    objectFit: "cover",
    width: 100,
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
  content: {
    padding: "20px 5px 20px 15px",
  },
  button: {
    borderColor: "#2196f3",
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "150px",
    paddingRight: "0px",
  },
  icon: {
    padding: "4px",
  },
  checkout: {
    height: "250px",
    padding: "20px",
  },
  divider: {
    margin: "15px 0px",
  },
  checkoutBtn: {
    margin: "40px 50px 5px 50px",
  },
  heading: {
    marginBottom: "15px",
  },
}));

function Cart(props) {
  const {
    state: { cartItems, totalCost },
    addItemToCart,
  } = useContext(DataContext);
  const classes = useStyles();

  const addQuantity = (index) => {
    let newCartItems = [...cartItems];
    let item = newCartItems[index];
    newCartItems[index] = {
      product: item.product,
      quantity: item.quantity + 1,
    };
    addItemToCart(newCartItems, totalCost + parseInt(item.product.cost));
  };

  const removeQuantity = (index) => {
    let newCartItems = [...cartItems];
    let item = newCartItems[index];
    if (item.quantity === 1) {
      newCartItems.splice(index, 1);
    } else {
      newCartItems[index] = {
        product: item.product,
        quantity: item.quantity - 1,
      };
    }
    addItemToCart(newCartItems, totalCost - parseInt(item.product.cost));
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Box display="flex" width="80%" margin="30px auto">
          <Card className={classes.root}>
            <Typography
              variant="h5"
              className={classes.heading}
              color="textPrimary"
            >
              Cart
            </Typography>
            {cartItems.map((item, index) => {
              return (
                <Card key={index} className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={Image}
                    title="image"
                  />
                  <CardContent className={classes.content}>
                    <Typography variant="h6" color="textPrimary">
                      {item.product.name}
                    </Typography>
                    <Box className={classes.box}>{item.product.category}</Box>
                    <Box className={classes.box}>{item.product.brand}</Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.product.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions} disableSpacing>
                    <Typography variant="h6" color="textSecondary">
                      Quantity:<span>{item.quantity}</span>
                    </Typography>
                    <Box display="inline">
                      <IconButton
                        className={classes.icon}
                        onClick={() => addQuantity(index)}
                        aria-label="delete"
                      >
                        <AddIcon />
                      </IconButton>
                      Quant
                      <IconButton
                        className={classes.icon}
                        onClick={() => removeQuantity(index)}
                        aria-label="delete"
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              );
            })}
          </Card>
          <Card className={classes.checkout}>
            {cartItems.map((item, index) => {
              return (
                <Typography
                  variant="body2"
                  key={index}
                  color="textPrimary"
                  component="p"
                >
                  {item.product.name} X {item.quantity} ={" "}
                  {parseInt(item.product.cost) * item.quantity}
                </Typography>
              );
            })}
            <Divider variant="middle" className={classes.divider} />
            <Typography variant="body1" color="textPrimary" component="p">
              Total = {totalCost}
            </Typography>
            <Link to="/checkout">
              <Button
                className={classes.checkoutBtn}
                variant="contained"
                color="primary"
              >
                Checkout
              </Button>
            </Link>
          </Card>
        </Box>
      ) : (
        <h2>Cart is Empty add some items</h2>
      )}
    </>
  );
}

export default Cart;
