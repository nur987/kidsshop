import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
const ProductInfo = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const producTemp = await getDoc(
        doc(fireDB, "products", params.productId)
      );
      setProduct(producTemp.data());
    } catch (error) {
      console.log(error);
    }
  }
  console.log(product);
  return (
    <Layout>
      {product && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p>
                <b>{product.title}</b>
              </p>
              <img
                src={product.image}
                alt={`${product.category} image`}
                className="product-info-img"
              />
              <hr />
              <p>{product.description}</p>
              <div className="d-flex justify-content-end my-3">
                <button>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductInfo;
