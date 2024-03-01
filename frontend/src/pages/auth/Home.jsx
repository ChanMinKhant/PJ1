import './css/home.css';
import Nav from '../../components/Nav';
import myImg from './css/cogwheel.png';
import { Link } from 'react-router-dom';
import gameicon from './../../../assets/gameicon.png';
import a from '../../../assets/backgound.png';
import b from '../../../assets/bamboo.jpg';
import c from '../../../assets/bottombluepipe.png';
import d from '../../../assets/doodler-right.png';
import e from '../../../assets/night.jpg';
import f from '../../../assets/panda.png';
import g from '../../../assets/ninja.png';
// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className='color'>
      <Nav />
      <div className='home'>
        <div className='mainHome text-center'>
          <div className='m-left'>
            <div className='animate-text'>
              <h1>
                <span></span>
              </h1>
            </div>

            <Link to='/'>
              <button className='homebtn'>Sharing</button>
            </Link>
          </div>
          <div className='m-right'>
            <div className='flex-conta text-center'>
              <div>
                <img src={e} alt='' className='home-img fig' />
                <Link to='http://fight.localhost:5173/'>fight</Link>
              </div>
              <div>
                <img src={d} alt='' className='home-img' />
                <Link to='http://doodle.localhost:5173/'>doodle</Link>
              </div>
              <div>
                <img src={f} alt='' className='home-img' />
                <Link to='http://panda.localhost:5173/'>panda</Link>
              </div>
              <div>
                <img src={g} alt='' className='home-img' />
                <Link to='http://ggpj.localhost:5173/'>ggpj</Link>
              </div>
              <div>
                <img src={gameicon} alt='' className='home-img' />
                <Link to='http://ninja.localhost:5173/'>ninja</Link>
              </div>
              <div>
                <img src={gameicon} alt='' className='home-img' />
                <Link to='http://speed.localhost:5173/'>speed</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
