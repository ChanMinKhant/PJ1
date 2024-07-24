import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './nav.css';
import useIsLogined from '../hooks/useIsLogined';

function Nav() {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { isLogined, loading } = useIsLogined();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setVisible(false); // Close the main menu when opening dropdown (optional)
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleMenu = () => {
    setVisible(!visible);
    setDropdownVisible(false); // Close the dropdown when opening the main menu (optional)
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  if (!loading)
    return (
      <nav>
        <Link to='/home' className='title'>
          Septicon
        </Link>
        <div className='menu'>
          <i
            className={visible ? 'bi bi-x bar' : 'bi bi-list bar'}
            onClick={toggleMenu}
          ></i>
        </div>

        <ul className={visible ? 'up' : 'drop'}>
          <li>
            <Link to='/home' onClick={toggleMenu}>
              home
            </Link>
          </li>
          <li>
            <Link to='/dashboard' onClick={toggleMenu}>
              dashboard
            </Link>
          </li>
          {/* <li>
          <Link to='/examples' onClick={toggleMenu}>
            examples
          </Link>
        </li> */}
          <li>
            <Link to='/aboutUs' onClick={toggleMenu}>
              about us
            </Link>
          </li>
          {/* <li>
          <Link to='/store' onClick={toggleMenu}>
            store
          </Link>
        </li> */}
        </ul>
        <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
          <i className='bi bi-person lgsu'></i>
          {dropdownVisible && (
            <div
              className={`dropdown-content ${
                dropdownVisible ? 'dropvis' : 'drophid'
              }`}
            >
              {isLogined ? (
                <>
                  <Link to='/logout' className='sl' onClick={closeDropdown}>
                    Logout
                  </Link>
                  <div className='under' />
                  <Link
                    to='/logout-all-device'
                    className='sl'
                    onClick={closeDropdown}
                  >
                    LogoutAllDevice
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/login' className='sl' onClick={closeDropdown}>
                    Login
                  </Link>
                  <div className='under' />
                  <Link to='/register' className='sl' onClick={closeDropdown}>
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    );
}

export default Nav;
