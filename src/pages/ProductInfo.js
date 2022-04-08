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
      <h1>ProductInfo</h1>
      {product && (<h1>{product.title}</h1>)}
    </Layout>
  );
};

export default ProductInfo;
