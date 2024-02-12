import Nav from '../../components/nav';
import './aboutUs.css';
import Coder1 from '../auth/css/coder-1.jpg'
import Coder2 from '../auth/css/coder-2.jpg'




const AboutUs = () =>{
    return(
        <div className='AboutContainer'> 
            <Nav />
            <div className='sub-container'>
                <div className='item-1'>

                    <div className='item-1-sub-1'>
                        <img src={Coder1} className='img-1'/>
                        <img src={Coder2} className='img-2'/>
                        
                        </div>
                    <div className='item-1-sub-2'>
                        <h1>Grow Your Workflow Speed</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Ullam culpa quasi ut incidunt quaerat dicta, 
                            nostrum quisquam. 
                            Natus officiis officia modi impedit nam, 
                            accusamus explicabo, at, ab animi corporis fuga!</p>
                    </div>
                    
                </div>
                <div className='item-2'>
                    <div className='item-2-sub-1'>
                        <p>
                            <h1>Our Goal</h1>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi incidunt delectus atque voluptas omnis quibusdam ipsa dolorum sunt minima. Aspernatur, nemo soluta facilis sapiente rerum impedit esse inventore commodi quam?
                        </p>
                    </div>
                    <div className='item-2-sub-2'>
                    <img src={Coder1} className='img-1'/>
                    </div>
                </div>
                <div className='item-3'>
                    <div className='item-3-sub-1'>
                        <h1>Our Member</h1>
                    </div>
                    <div className='item-3-sub-2'>    
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className='itme-4'>
                    
                </div>
                <div className='footer'></div>
            </div>
        </div>
    )
}
export default AboutUs;