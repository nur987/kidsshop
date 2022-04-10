import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import fireDB from "../firebaseConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc, key) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  //!for update Data from db firebase
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose(); //! close after updated
      toast.success("Product upadted successfully");
      window.location.reload();
    } catch (error) {
      console.log("error");
      toast.success("Product upadted failed");
      setLoading(false);
    }
  };

  const addHundler = () => {
    setAdd(true);
    handleShow();
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose(); //! close after updated
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      console.log("error");
      toast.success("Product add failed");
      setLoading(false);
    }
  };
  return (
    <Layout loading={loading}>
      <div className="d-flex justify-content-between">
        <h3>Product list</h3>
        <button onClick={addHundler}>Add Product</button>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td>
                  <img
                    src={item.image}
                    alt={item.category}
                    height="80"
                    width="80"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.price} $</td>
                <td>
                  <FaTrash className="text-primary" />

                  <FaEdit
                    onClick={() => editHandler(item)}
                    className="text-danger"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add ? `Add a product` : `Edit Product`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Name..."
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Image url..."
              value={product.image}
              onChange={(e) => {
                setProduct({ ...product, image: e.target.value });
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Price..."
              value={product.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Category..."
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            />
            <hr />
            <Link to="/login"> Click herer to Login</Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button>Close</button>
          {add ? (
            <button onClick={addProduct}>Save</button>
          ) : (
            <button onClick={updateProduct}>Save</button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default AdminPage;
