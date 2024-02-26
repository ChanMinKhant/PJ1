import './css/home.css';
import Nav from '../../components/Nav';
import myImg from './css/cogwheel.png';
import { Link } from 'react-router-dom';
// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className='color'>
      <Nav />
      <div className='home'>
        <div className='mainHome'>
          <div className='m-left'>
            <div className='animate-text'>
              <h1>
                <span></span>
              </h1>
            </div>
            <br />
            <br />
            <br />
            <Link to='/register'>
              <button className='homebtn'>Register Now</button>
            </Link>
          </div>
          <div className='m-right'>
            {/* <div className='circle'>
              <div className='logo'> </div>
              <div className='text'></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
