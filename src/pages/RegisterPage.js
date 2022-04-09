import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const register = async() => {
    try {
      setLoading(true);
      const result =await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      setLoading(false);
      toast.success("Registration successful");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="register-parent">
      {loading && <Loader />}
      <div className="register-top"></div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_q6wsiidu.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Email..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password..."
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
            <button className="my-3" onClick={register}>
              Register
            </button>
            <hr />
            <Link to="/login"> Click herer to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
