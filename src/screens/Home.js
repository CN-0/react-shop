import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  IconButton,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ProductCard from "../components/ProductCard";
import { Context as DataContext } from "../context/dataContext";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "2px 10px",
    marginRight: "90px",
    display: "flex",
    alignItems: "center",
    width: 400,
    float: "right",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    marginLeft: theme.spacing(3),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const {
    state: { data },
  } = useContext(DataContext);
  const [products, setProducts] = useState(false);
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [search, setSearch] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (category === "all" && brand === "all") {
      setProducts([...data.products]);
    } else if (category === "all" || brand === "all") {
      var newProducts;
      if (category === "all") {
        newProducts = data.products.filter((product) =>
          product.brand.includes(brand)
        );
      } else {
        newProducts = data.products.filter((product) =>
          product.category.includes(category)
        );
      }
      setProducts(newProducts);
    } else {
      let newCategoryProducts = data.products.filter((product) =>
        product.category.includes(category)
      );
      let newBrandProducts = newCategoryProducts.filter((product) =>
        product.brand.includes(brand)
      );
      setProducts(newBrandProducts);
    }
    if (search.length > 0) {
      let newProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(newProducts);
    }
    // eslint-disable-next-line
  }, [category, brand, search]);

  return (
    <Container maxWidth="lg">
      <h1 style={{ marginTop: "15px", textAlign: "center" }}>HOME</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {data.categories.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="brand-label">Brand</InputLabel>
        <Select
          labelId="brand-label"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          {data.brands.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Paper component="form" className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="Search by Name"
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container>
        {products &&
          products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
      </Grid>
    </Container>
  );
}
export default Home;
