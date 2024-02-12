import Nav from '../../components/nav';
import './aboutUs.css';
import myImg from '../auth/css/cogwheel.png'




const AboutUs = () =>{
    return(
        <div className='AboutContainer'> 
            <Nav />
            <div className='sub-container'>
                <div className='item-1'>

                    <div className='item-1-sub-1'><img src={myImg} className='img-1'/></div>
                    <div></div>
                    
                </div>
                <div className='item-2'></div>
                <div className='item-3'></div>
                <div className='itme-4'></div>
                <div className='footer'></div>
            </div>
        </div>
    )
}
export default AboutUs;