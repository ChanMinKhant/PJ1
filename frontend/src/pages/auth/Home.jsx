import './css/home.css';
import progmer from '../../../assets/programing.png';
import Nav from '../../components/Nav';
import myImg from './css/cogwheel.png';
import { Link } from 'react-router-dom';
import gameicon from './../../../assets/gameicon.png';
import a from '../../../assets/backgound.png';
import b from '../../../assets/bamboo.jpg';
import c from '../../../assets/bottombluepipe.png';
import d from '../../../assets/doodler-right.png';
import e from '../../../assets/greek.png';
import f from '../../../assets/panda.png';
import g from '../../../assets/ninja.png';
import h from '../../../assets/crossword.png';
import i from '../../../assets/write.png';

// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className="color">
      <Nav />
      <div className="home">
        <div className="mainHome text-center">
          <div className="m-left">
            <div className="animate-text">
              <img src={progmer} alt="" className="progme" />
              <h1>
                <span></span>
              </h1>
            </div>

            <Link to="/">
              <button className="homebtn">Sharing</button>
            </Link>
          </div>
          <div className="m-right">
            <div className="flex-conta text-center">
              <div>
                <img src={e} alt="" className="home-img" />
                <Link to="http://fight.localhost:5173/" className="letter">
                  Fight
                </Link>
              </div>
              <div>
                <img src={d} alt="" className="home-img" />
                <Link to="http://doodle.localhost:5173/" className="letter">
                  Doodle
                </Link>
              </div>
              <div>
                <img src={f} alt="" className="home-img" />
                <Link to="http://panda.localhost:5173/" className="letter">
                  Panda
                </Link>
              </div>
              <div>
                <img src={h} alt="" className="home-img" />
                <Link to="http://ggpj.localhost:5173/" className="letter">
                  Word
                </Link>
              </div>
              <div>
                <img src={g} alt="" className="home-img" />
                <Link to="http://ninja.localhost:5173/" className="letter">
                  Ninja
                </Link>
              </div>
              <div>
                <img src={i} alt="" className="home-img" />
                <Link to="http://speed.localhost:5173/" className="letter">
                  Speed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
