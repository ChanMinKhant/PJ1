import './css/home.css';
import progmer from '../../../assets/codebg.jpg';
import Nav from '../../components/Nav';
import { Link } from 'react-router-dom';
// import gameicon from './../../../assets/gameicon.png';
import a from '../../../assets/backgound.png';
import b from '../../../assets/bamboo.jpg';
import c from '../../../assets/bottombluepipe.png';
import d from '../../../assets/doodler-right.png';
import e from '../../../assets/greek.png';
import f from '../../../assets/panda.png';
import g from '../../../assets/ninja.png';
import h from '../../../assets/crossword.png';
import i from '../../../assets/write.png';
import j from '../../../assets/cloud-data.png';
import k from '../../../assets/url.png';
import l from '../../../assets/cloud.png';
import m from '../../../assets/hacker.png';
import n from '../../../assets/internet.png';
import o from '../../../assets/email.png';

import p from '../../../assets/question-mark.png';
import q from '../../../assets/skill.png';
import r from '../../../assets/ask.png';
import s from '../../../assets/question-mark (1).png';
import t from '../../../assets/star.png';

import thinkgirl from '../../../assets/adorable-young-woman-casual-outfit-standing-thinking-high-quality-photo-Photoroom.png';
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
              <div className='fhomeitem'>
                <img src={j} alt='' className='fhomeicon' />
                <div className='fhomecap'>Store your data on our server.</div>
              </div>
              <div className='fhomeitem'>
                <img src={k} alt='' className='fhomeicon' />
                <div className='fhomecap'>
                  Shorten your long and boring urls.
                </div>
              </div>
              <div className='fhomeitem'>
                <img src={n} alt='' className='fhomeicon' />
                <div className='fhamecap'>
                  Looking to host your website publicly?
                </div>
              </div>
              <div className='fhomeitem'>
                <img src={o} alt='' className='fhomeicon' />
                <div className='fhomecap'>
                  Get customized email sending system for your community.
                </div>
              </div>
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
          <div className='m-right'>
            <div className='flex-conta text-center'>
              <div>
                <Link to='http://fight.localhost:5173/' className='letter'>
                  <img src={e} alt='' className='home-img' />
                  Fight
                </Link>
              </div>
              <div>
                <Link to='http://doodle.localhost:5173/' className='letter'>
                  <img src={d} alt='' className='home-img' />
                  Doodle
                </Link>
              </div>
              <div>
                <Link to='http://panda.localhost:5173/' className='letter'>
                  <img src={f} alt='' className='home-img' />
                  Panda
                </Link>
              </div>
              <div>
                <Link to='http://ggpj.localhost:5173/' className='letter'>
                  <img src={h} alt='' className='home-img' />
                  Word
                </Link>
              </div>
              <div>
                <Link to='http://ninja.localhost:5173/' className='letter'>
                  <img src={g} alt='' className='home-img' />
                  Ninja
                </Link>
              </div>
              <div>
                <Link to='http://speed.localhost:5173/' className='letter'>
                  <img src={i} alt='' className='home-img' />
                  Speed
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h1>Welcome to Our Website!</h1>
        <p>
          Your one-stop destination for all your web hosting and file management
          needs! Here are some key features we offer:
        </p>
        <ul>
          {' '}
          <li>
            {' '}
            <h4>Hosting of HTML, CSS, and JavaScript Files</h4>
            <p>
              Upload and host your web projects effortlessly with our reliable
              hosting services. Whether you're a beginner or an experienced
              developer, we provide the platform you need to showcase your work.
            </p>{' '}
          </li>
          <li>
            {' '}
            <h4>File Uploading and Sharing</h4>
            <p>
              Seamlessly upload and share files with colleagues, friends, or
              clients. Our intuitive interface makes it easy to organize and
              distribute your files efficiently.
            </p>{' '}
          </li>
          <li>
            {' '}
            <h4>URL Shortening</h4>{' '}
            <p>
              Simplify and share URLs with our URL shortening feature. Transform
              long, cumbersome links into concise, easy-to-share URLs that are
              perfect for social media, emails, and more.
            </p>{' '}
          </li>
          <li>
            {' '}
            <h4>Email Sending</h4>{' '}
            <p>
              Communicate effectively with our integrated email sending
              functionality. Whether you're sending updates, newsletters, or
              exam results, our system ensures reliable delivery to your
              recipients' inboxes.
            </p>{' '}
          </li>
          <li>
            <h4>Automated Exam Result Distribution</h4>
            <p>
              Say goodbye to manual result distribution! With our advanced
              system, you can upload exam results for different batches or
              classes with just a few clicks. Each student receives their
              results directly, streamlining the process for administrators and
              students alike.
            </p>{' '}
          </li>
        </ul>{' '}
        <p>
          Experience the convenience and efficiency of our platform today. Sign
          up now to unlock these powerful features and take your web projects to
          the next level!
        </p>
        <div className='footermain'>
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
        </div>
      </div>
    </div>
  );
};
export default Home;
