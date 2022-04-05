import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireProducts } from "../kidsshop-products";
function HomePages() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
    }
  }

  /*   function addDataProductstoFireBase() {
    fireProducts.map(async (product) => {
      try {
        await addDoc(collection(fireDB, "products"), JSON.stringify(product));
      } catch (error) {
        console.log(error);
      }
    });
  } */
  return (
    <Layout>
      <div className="container">
        {products.map((product) => {
          return (
            <div className="col-md-4">
              <div className="m-2 p-2 product position-relative">
                <div className="product-content">
                  <p className="text-center">
                    {product.title.length > 30
                      ? product.title.slice(0, 32)
                      : product.title}
                  </p>
                  <div className="text-center">
                    <img src={product.image} alt="" className="product-img" />
                  </div>
                </div>
                <div className="price">
                  <span>price: {Number.parseInt(product.price)}$</span>
                  <span>{product.rating.rate}</span>
                </div>
                <div className="product-actions">
                  <div className="d-flex">
                    <button className="mx-2">Add to cart</button>
                    <button>View</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default HomePages;
