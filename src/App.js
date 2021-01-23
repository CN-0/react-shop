import { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Context as DataContext } from "./context/dataContext";
import Navbar from "./components/Navbar";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import Home from "./screens/Home";

const App = () => {
  const {
    state: { data },
    getDataFromServer,
  } = useContext(DataContext);

  useEffect(() => {
    getDataFromServer();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {data ? (
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      ) : (
        "data is being fetched from server"
      )}
    </>
  );
};

export default App;
