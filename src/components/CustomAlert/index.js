import { Modal } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import "./style.scss"

const CustomAlert = ({status, message, active, handleClose }) => {

    return (
        <Modal  className="custom-alert" show={active}  onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <h3>{message}</h3>
                {status? 
                    <div className="ico-cont"><FontAwesomeIcon icon={faCircleCheck} /></div>
                    : <div className="ico-cont2"><FontAwesomeIcon icon={faExclamationCircle} /></div>
                }
                
            </Modal.Body>
        </Modal>
    )
}

export default CustomAlert