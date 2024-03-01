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
              <h1>We're working</h1>
            </div>
          </div>
          <p className="par">
            We are working on a comprehensive platform designed to streamline
            online activities. Our focus encompasses providing a seamless
            solution for users to store and share files effortlessly, ensuring
            efficient collaboration and data management. The platform also
            serves as a reliable host for HTML, CSS, and JavaScript code,
            catering to the needs of developers. Simplifying the process of URL
            shortening is another key feature, enabling users to create concise
            web links with ease. Moreover, our project facilitates community
            communication by allowing users to send emails effortlessly,
            fostering a connected and collaborative digital space.
          </p>
        </div>
        <div className="itme-4">
          Contant Us :
          <a href="mailto:chanminkhant@ucspyay.edu.mm">Admin@gmail</a>
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
};
export default AboutUs;
