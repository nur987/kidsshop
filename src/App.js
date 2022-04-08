import "./App.css";
import "./stylesheets/layout.scss"; //global css styles
import "./stylesheets/products.scss"; //global css styles

import { Route, BrowserRouter, Routes } from "react-router-dom";

import HomePages from "./pages/HomePages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePages />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/productInfo/:productId" exact element={<ProductInfo />} />
          <Route path="/cart" exact element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
