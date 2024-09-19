// src/GameSection.js

import { Link } from 'react-router-dom';
import Gear from '../components/Gear';
import d from '../../assets/doodler-right.png';
import e from '../../assets/greek.png';
import f from '../../assets/panda.png';
import g from '../../assets/ninja.png';
import h from '../../assets/crossword.png';
import i from '../../assets/write.png';
import './GameSection.css';

const GameSection = () => {
  return (
    <div className='m-right'>
      <div>
        <h3>
          Getting bored ???
          <br />
          Explore our games
        </h3>
        <Gear />
      </div>
      <div className='flex-conta text-center'>
        <div>
          <Link to='http://fight.localhost:5173/' className='letter'>
            <img src={e} alt='Fight Game' className='home-img' />
            <br />
            Fight
          </Link>
        </div>
        <div>
          <Link to='http://doodle.localhost:5173/' className='letter'>
            <img src={d} alt='Doodle Game' className='home-img' />
            <br />
            Doodle
          </Link>
        </div>
        <div>
          <Link to='http://panda.localhost:5173/' className='letter'>
            <img src={f} alt='Panda Game' className='home-img' />
            <br />
            Panda
          </Link>
        </div>
        <div>
          <Link to='http://ggpj.localhost:5173/' className='letter'>
            <img src={h} alt='Word Game' className='home-img' />
            <br />
            Word
          </Link>
        </div>
        <div>
          <Link to='http://ninja.localhost:5173/' className='letter'>
            <img src={g} alt='Ninja Game' className='home-img' />
            <br />
            Ninja
          </Link>
        </div>
        <div>
          <Link to='http://speed.localhost:5173/' className='letter'>
            <img src={i} alt='Speed Game' className='home-img' />
            <br />
            Speed
          </Link>
        </div>
      </div>
      <div className='moregames'>
        <span>Want more games?</span>
        <Link to='/games'>Explore</Link>
      </div>
    </div>
  );
};

export default GameSection;
