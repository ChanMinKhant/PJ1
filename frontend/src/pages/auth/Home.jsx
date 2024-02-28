import './css/home.css';
import Nav from '../../components/Nav';
import myImg from './css/cogwheel.png';
import { Link } from 'react-router-dom';
// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className="color">
      <Nav />
      <div className="home">
        <div className="mainHome">
          <div className="m-left">
            <div className="animate-text">
              <h1>
                <span></span>
              </h1>
            </div>

            <Link to="/register">
              <button className="homebtn">Register Now</button>
            </Link>
          </div>
          <div className="m-right">
            <div className="flex-container">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
