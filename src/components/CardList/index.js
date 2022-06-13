import "./style.scss"
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const CardList = ({ data, statusIngredient, }) => {
    const [check, setCheck] = useState(false);
    const firstUpdate = useRef(true);
    
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if(check){
            statusIngredient(true, data);
        }else{
            statusIngredient(false, data);
        }
    },[check])

    return (
        <div className="item-card">
            <div className="info-cont" onClick={() => setCheck(!check)}>
                <div className="check">
                    {check ? <div className='ico-check fill'><FontAwesomeIcon icon={faCheck} /></div> : <div className='ico-check'></div>}
                </div>
                <div className="description"><p>{data.name}</p></div>
            </div>
        </div>
    )
}

export default CardList;