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
             

             <Link to='/register'><button className='homebtn'>Register Now</button></Link>
             {/* <div className="proton">
              < img src={myImg} alt="" className='wheel1'/>
                  <div className="electron">
                  
                     <div className='electron-1'></div>
                     <div className='electron-2'></div>
                     <div className='electron-3'></div>
                  </div>
               </div>  */}
             
             {/* < img src={myImg} alt="" className='wheel2'/>
             < img src={myImg} alt="" className='wheel3'/>  */}
             </div> 
         </div>
    
         
     </div>
     {/* <div className='aboutUs'>
     <div className='aboutUsleft'>
        <div>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero veniam consequatur rerum sequi, optio fugiat consectetur unde adipisci? Expedita recusandae minus commodi ea at culpa aperiam fugiat magnam officiis earum.</p>
        <br />
        <h2>How to use?</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus totam perferendis ullam minus rerum debitis odit reprehenderit ipsam! Dolor animi vel voluptatem. Suscipit velit iure amet corrupti. Soluta, deserunt laudantium?</p>
        <h2>Step by step guide</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus est itaque consequuntur, suscipit quisquam ducimus nisi non molestias magnam quam animi enim cum, earum asperiores incidunt delectus? Dignissimos, minima hic?</p>
        </div>
        
     </div>
     <div className="aboutUsright">
      <Loading/>
      <svg height={"100%"} width={"200%"}>
         <circle cx={"100%"} cy={"30%"} r={"100%"}
         stroke='black' stroke-width={"3px"} fill='navy'/>
      </svg>
     </div>
  </div> */}
  </div>
    
)
}
export default Home;