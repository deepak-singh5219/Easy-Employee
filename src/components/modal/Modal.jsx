import { useEffect, useState } from 'react';
import  style from  './Modal.module.css';


const Modal = ({close,title,children,width}) =>
{
    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
    console.log(windowWidth);

    const updateWidth = () =>
    {
        setWindowWidth(window.innerWidth);
    }
    
    useEffect(()=>{
        window.addEventListener("resize", updateWidth);
        
        return () => window.removeEventListener("resize", updateWidth);
    })

    return (    
          <div className={`${style.modalMask}`}>
              <div className={`card ${style.modalBody}`} style={{width:windowWidth>800 ? width : ''}}>
              <div className="card-header justify-content-between">
                  <h4>{title}</h4>
                  <button className='btn' onClick={close}><i className="fas fa-times"></i></button>
            </div>
            <div className="card-body p-0">
                {children}
            </div>
              </div>
          </div>
    )
}

export default Modal;