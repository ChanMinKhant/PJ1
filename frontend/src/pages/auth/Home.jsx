import './css/home.css';
import progmer from '../../../assets/codebg.jpg';
import Nav from '../../components/Nav';
import { Link } from 'react-router-dom';
// import gameicon from './../../../assets/gameicon.png';
import Gear from '../../components/Gear';
// import d from '../../../assets/doodler-right.png';
// import e from '../../../assets/greek.png';
// import f from '../../../assets/panda.png';
// import g from '../../../assets/ninja.png';
// import h from '../../../assets/crossword.png';
// import i from '../../../assets/write.png';
import j from '../../../assets/cloud-data.png';
import k from '../../../assets/url.png';
import l from '../../../assets/cloud.png';
import m from '../../../assets/hacker.png';
import n from '../../../assets/internet.png';
import o from '../../../assets/email.png';
import GameSection from '../../components/Game';
import p from '../../../assets/question-mark.png';
import q from '../../../assets/skill.png';
import r from '../../../assets/ask.png';
import s from '../../../assets/question-mark (1).png';
import t from '../../../assets/star.png';

import thinkgirl from '../../../assets/adorable-young-woman-casual-outfit-standing-thinking-high-quality-photo-Photoroom.png';
import Welcome from '../../components/Welcome';
import Divider from '../../components/Divider';
import Footer from '../../components/Footer';
// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className='color'>
      <Nav />
      <div className='home'>
        <div className='mainHome text-center'>
          <div className='m-left'>
            <div className='m-left-top'>
              <div className='m-left-top-left1'>
                <img src={m} alt='' className='progmer' />
              </div>

              <div className='m-left-top-right'>
                <h1 className='h3l'>Explore our features</h1>
                <p className='ooop'>
                  - Versatile website for code hosting, file sharing, URL
                  shortening, and community communication.{' '}
                </p>
                <p className='ooop'>
                  - Streamline collaboration, file exchange, and URL shortening
                  effortlessly.
                </p>
                <p className='ooop'>
                  - Open dialogue and exam result sharing in a supportive
                  digital space.{' '}
                </p>
                <p className='ooop'>
                  - Your all-in-one solution for an enhanced online experience.
                </p>
                <div className='animate-text'>
                  <h1>
                    <span></span>
                  </h1>
                </div>
              </div>
            </div>
            {/* <div className='animate-text'>
              <h1>
                <span></span>
              </h1>
            </div> */}
          </div>
          <div className='flexhome'>
            {/* <img src={progmer} alt='' className='progmer' /> */}
            <div className='fhomeitems'>
              <Link to={'/dashboard/files'} className='fhomeitem'>
                <img src={j} alt='' className='fhomeicon' />
                <div className='fhomecap'>Store your data on our server.</div>
              </Link>
              <Link to={'/dashboard/url'} className='fhomeitem'>
                <img src={k} alt='' className='fhomeicon' />
                <div className='fhomecap'>
                  Shorten your long and boring urls.
                </div>
              </Link>
              <Link to={'/dashboard/host'} className='fhomeitem'>
                <img src={n} alt='' className='fhomeicon' />
                <div className='fhamecap'>
                  Looking to host your website publicly?
                </div>
              </Link>
              <Link to={'/dashboard/sendInfo'} className='fhomeitem'>
                <img src={o} alt='' className='fhomeicon' />
                <div className='fhomecap'>
                  Get customized email sending system for your community.
                </div>
              </Link>
            </div>
          </div>
          <div className='thinking'>
            <div className='thinkdiv'>
              <img src={r} alt='' className='ask' />
              <img src={s} alt='' className='question1' />
              <img src={q} alt='' className='skill' />

              <img src={thinkgirl} alt='' className='thinkimg' />
              <img src={p} alt='' className='question' />
            </div>
            <div className='thinkletter'>
              <h2>Why should people use our website</h2>
              <ul>
                <li>
                  <h3>
                    <img src={t} alt='' className='starmark' />
                    User-Friendly Interface
                  </h3>
                  Our website offers a user-friendly interface that ensures a
                  seamless experience for all users.
                </li>
                <li>
                  <h3>
                    <img src={t} alt='' className='starmark' />
                    Diverse Features
                  </h3>
                  We provide a wide range of features designed to meet the
                  diverse needs of our users, from beginners to experts.
                </li>
                <li>
                  <h3>
                    <img src={t} alt='' className='starmark' />
                    Latest Technology
                  </h3>
                  Our platform is built with the latest technology, ensuring
                  fast load times and high reliability.
                </li>
                <li>
                  <h3>
                    <img src={t} alt='' className='starmark' />
                    Exceptional Customer Support
                  </h3>
                  We offer exceptional customer support, ready to assist you
                  with any questions or issues you may encounter.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Divider />
        <GameSection />

        <div className='welcomewrap'>
          {' '}
          <Welcome />
        </div>
        {/* <div className='footermain'>
          <div className='footermaintop'>
            <i>
              <h3>Our Features</h3>
              <ul className='footerul'>
                <li>Shorten Url</li>
                <li>File Upload</li>
                <li>Hosting</li>
                <li>Sending Email</li>
                <li>Online games</li>
              </ul>
            </i>
          </div>
          <div className='copyright'>
            <i>@Copyright All Right Reserved</i>{' '}
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};
export default Home;
