// import { Link } from 'react-router-dom';
// // import { Register } from './pages/auth';
// // import Login from './pages/auth';
// import { useState, useRef, useEffect } from 'react';
// import './nav.css';
// function Nav() {
//   const [visible, setVisible] = useState(false);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//     setVisible(false); // Close the main menu when opening dropdown (optional)
//   };

//   const closeDropdown = () => {
//     setDropdownVisible(false);
//   };

//   const toggleMenu = () => {
//     setVisible(!visible);
//     setDropdownVisible(false); // Close the dropdown when opening the main menu (optional)
//   };
//   return (
//     <nav>
//       <Link to='/' className='title'>
//         Website
//       </Link>
//       <div className='menu'>
//         <i
//           className={visible ? 'bi bi-x bar' : 'bi bi-list bar'}
//           onClick={toggleMenu}
//         ></i>
//       </div>

//       <ul className={visible ? 'up' : 'drop'}>
//         <li>
//           <Link to='/home' onClick={toggleMenu}>
//             home
//           </Link>
//         </li>
//         <li>
//           <Link to='/dashboard' onClick={toggleMenu}>
//             dashboard
//           </Link>
//         </li>
//         <li>
//           <Link to='/examples' onClick={toggleMenu}>
//             examples
//           </Link>
//         </li>
//         <li>
//           <Link to='/about us' onClick={toggleMenu}>
//             about us
//           </Link>
//         </li>
//         <li>
//           <Link to='/store' onClick={toggleMenu}>
//             store
//           </Link>
//         </li>
//       </ul>
//       <div className='dropdown' onClick={toggleDropdown}>
//         <i className='bi bi-person lgsu'></i>
//         {dropdownVisible && (
//           <div
//             className={`dropdown-content ${
//               dropdownVisible ? 'dropvis' : 'drophid'
//             }`}
//             onMouseLeave={closeDropdown}
//           >
//             <Link to='/login' className='sl'>
//               Login
//             </Link>
//             <div className='under' />
//             <Link to='/register' className='sl'>
//               Signup
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
// export default Nav;
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './nav.css';

function Nav() {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <nav>
      <Link to='/' className='title'>
        Website
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
        <li>
          <Link to='/examples' onClick={toggleMenu}>
            examples
          </Link>
        </li>
        <li>
          <Link to='/about us' onClick={toggleMenu}>
            about us
          </Link>
        </li>
        <li>
          <Link to='/store' onClick={toggleMenu}>
            store
          </Link>
        </li>
      </ul>
      <div className='dropdown' onClick={toggleDropdown} ref={dropdownRef}>
        <i className='bi bi-person lgsu'></i>
        {dropdownVisible && (
          <div
            className={`dropdown-content ${
              dropdownVisible ? 'dropvis' : 'drophid'
            }`}
          >
            <Link to='/login' className='sl' onClick={closeDropdown}>
              Login
            </Link>
            <div className='under' />
            <Link to='/register' className='sl' onClick={closeDropdown}>
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
