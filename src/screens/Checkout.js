import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Divider,
  Button,
  Typography,
  Box,
  TextField,
} from "@material-ui/core";
import { Context as DataContext } from "../context/dataContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "80px",
    padding: "20px 40px 40px 20px",
    width: 700,
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  checkout: {
    height: "250px",
    width: "300px",
    padding: "20px",
  },
  divider: {
    margin: "15px 0px",
  },
  checkoutBtn: {
    margin: "50px 40px 5px 40px",
  },
}));

function Checkout() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const {
    state: { cartItems, totalCost },
  } = useContext(DataContext);
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Box display="flex" width="60%" margin="30px auto">
          <Card className={classes.root}>
            <Typography variant="h5" color="textPrimary">
              Checkout Form
            </Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField
                id="fn"
                label="First Name"
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
              <TextField
                id="ln"
                label="First Name"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
              <TextField
                id="standard-full-width"
                label="Email Address"
                fullWidth
                value={values.email}
                onChange={handleChange("email")}
              />
              <TextField
                id="address"
                label="Address"
                fullWidth
                value={values.address}
                onChange={handleChange("address")}
              />
            </form>
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
            <Button
              className={classes.checkoutBtn}
              variant="contained"
              color="primary"
              onClick={() =>
                alert(
                  `Hi ${values.firstName} ${values.lastName}, your order is placed!! `
                )
              }
            >
              Place Order
            </Button>
          </Card>
        </Box>
      ) : (
        <h2>Checkout is Empty add some items</h2>
      )}
    </>
  );
}

export default Checkout;
