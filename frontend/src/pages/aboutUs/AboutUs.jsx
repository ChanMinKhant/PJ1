import Nav from '../../components/nav';
import './aboutUs.css';

import Chart1 from '../auth/css/chart4.jpg';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="AboutContainer">
      <Nav />
      <div className="sub-container">
        <div className="item-1">
          <div className="hero-image">
            <div className="hero-text">
              <h1>Grow Your Work Speed</h1>
              {/* <p>And I'm a Photographer</p> */}
              <button>
                <Link to="/register" className="rfb">
                  Register
                </Link>
              </button>
            </div>
          </div>
          <p className="par">
            In our pursuit of increased productivity, we're committed to
            optimizing work speed. Through streamlined processes, advanced
            tools, and a culture of efficiency, we empower our team to deliver
            high-quality results swiftly. Embracing agility and innovation, we
            strive to meet the demands of today's dynamic work environment,
            fostering both individual and organizational growth.
          </p>
        </div>
        <div className="item-2">
          <div className="hero-image1">
            <div className="hero-text1">
              <h1>Our Goals</h1>
              {/* <p>And I'm a Photographer</p> */}
            </div>
          </div>
          <p className="par">
            Our strategy revolves around four key elements: Market Expansion,
            Monetization Growth, Community Engagement, and Continuous
            Innovation. Together, these pillars propel our mission for sustained
            growth and success.
          </p>
        </div>
        <div className="item-3">
          <div className="hero-image2">
            <div className="hero-text2">
              <h1>Our Goals</h1>
              {/* <p>And I'm a Photographer</p> */}
            </div>
          </div>
        </div>
        <div className="itme-4"></div>
        <div className="footer"></div>
      </div>
    </div>
  );
};
export default AboutUs;
