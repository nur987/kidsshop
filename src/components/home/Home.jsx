import Back from "../../assets/background.webp";
import Producs from "../products/Producs";
const Home = () => {
  return (
    <div className="hero">
      <div className="card bg-dark text-white">
        <img src={Back} class="card-img" alt="background" height="550px" />
        <div className="card-img-overlay d-flex flex-column justify-content-around">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder mb-0 text-dark">
              New Season Arrivals
            </h5>
            <p className="card-text lead fs-2 fw-bolder text-dark">
              Chek out all the thends
            </p>
          </div>
        </div>
      </div>
      <Producs />
    </div>
  );
};

export default Home;
