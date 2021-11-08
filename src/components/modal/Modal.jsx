import  style from  './Modal.module.css';

const Modal = ({close,title,children}) =>
{
    return (    
          <div className={`${style.modalMask}`}>
              <div className={`card ${style.modalBody}`}>
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