import './css/home.css';
import Nav from '../../components/nav';
import myImg from './css/cogwheel.png'
import { Link } from 'react-router-dom';
// import Loading from '../../components/Loading';



const Home = () => {

  
  
return (
    <div className='color'>
    <Nav/>
     <div className="home">
         
      
           <div className="mainHome">
            <div className="m-left">
            {/* <div className="proton">

              < img src={myImg} alt="" className='wheel1'/>
                  <div className="electron">
                  
                     <div className='electron-1'></div>
                     <div className='electron-2'></div>
                     <div className='electron-3'></div>
                  </div>
               </div>  */}
                <div className='animate-text'>
                <h1><span></span></h1>
                </div>
             <Link to='/register'><button className='homebtn'>Register Now</button></Link>
            </div>
             <div className="m-right">
             

            
             
             </div> 
         </div>
    
         
     </div>

  </div>
    
)
}
export default Home;