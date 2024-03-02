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

// import Loading from '../../components/Loading';

const Home = () => {
  return (
    <div className="color">
      <Nav />
      <div className="home">
        <div className="mainHome text-center">
          <div className="m-left">
            <div className="m-left-top">
              <div className="m-left-top-left1">
                <img src={progmer} alt="" className="progmer" />
              </div>
              <div className="m-left-top-right">
                <p className="ooop">
                  - Versatile website for code hosting, file sharing, URL
                  shortening, and community communication.{' '}
                </p>
                <p className="ooop">
                  - Streamline collaboration, file exchange, and URL shortening
                  effortlessly.
                </p>
                <p className="ooop">
                  - Open dialogue and exam result sharing in a supportive
                  digital space.{' '}
                </p>
                <p className="ooop">
                  - Your all-in-one solution for an enhanced online experience.
                </p>
              </div>
            </div>
            <div className="animate-text">
              <h1>
                <span></span>
              </h1>
            </div>
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
        <div className="footermain">
          <div className="footermaintop">
            <h3>Our Features</h3>
            <ul className="footerul">
              <li>Shorten Url</li>
              <li>File Upload</li>
              <li>Hosting</li>
              <li>Sending Email</li>
              <li>Online games</li>
            </ul>
          </div>
          <div className="copyright">copyright</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
