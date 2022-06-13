import { useState, useEffect } from "react"
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import LogHabi from "../../assets/img/log-habi.png"
import initialIngredients from "../../data/ingredients.js"
import CreatePizza from "../CreatePizza"
import Clients from "../Clients"
import Orders from "../Orders"
import CustomAlert from '../../components/CustomAlert'
import { Carousel } from 'react-bootstrap'  
import "./style.scss"


const Home = () => {
    const [refresh, setRefresh] = useState(1);
    const [listIngredients,setListIngredients] = useState(initialIngredients);
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    const [configAlert, setConfigAlert] = useState(initialIngredients);
    const [total, setTotal] = useState(0);
    const [orderId, setOriderId] = useState(5300);
    const [listOrders, setListOrders] = useState([]);
    const [indexCarousel, setIndexCarousel] = useState(0);
    const [selectIngredients, setSelectIngredients] = useState([{id:16, name:"masa", price:10}]);


    useEffect(() => {
        calcTotal();
    }, [selectIngredients])

    useEffect(() => {
        if(refresh === 0){
            setRefresh(1);
        }
    }, [refresh])

    useEffect(() => {
        if(indexCarousel === 0){
            setRefresh(0);
            setSelectIngredients([{id:16, name:"masa", price:10}]);
        }
    }, [indexCarousel])

    const calcTotal = () =>{
        let sum = selectIngredients.reduce((acc, val) => acc + val.price, 0); 
        setTotal(sum); 
    }

    const handleIngredients = (status,ingredient) => {
        if(status){
            setSelectIngredients([...selectIngredients,ingredient]);
        }else{
            let filterList = selectIngredients.filter(item => item.id !== ingredient.id);
            setSelectIngredients(filterList);
        }
    }

    const handleIndexCarousel = (index) => {
        setIndexCarousel(index);
    }
    const moveCarousel = (flag) => {
        if(flag){
            let calcMax = indexCarousel + 1;
            calcMax > 2 ? setIndexCarousel(0) : setIndexCarousel(indexCarousel + 1);
        }else{
            let calcMax = indexCarousel - 1;
            calcMax < 0 ? setIndexCarousel(2) : setIndexCarousel(indexCarousel - 1);
        }
    }

    const saveOrder = (clientData) => {

        if (selectIngredients.length >= 2) {
            let timeElapsed = Date.now();
            let today = new Date(timeElapsed);
            let orderInfo = {
                orderId: orderId,
                ...clientData,
                total: total,
                date: today.toLocaleDateString(),
                time: today.toLocaleTimeString(),
                detail: selectIngredients
            }
            setListOrders([...listOrders, orderInfo]);
            setOriderId(orderId + 1);

            setIndexCarousel(2);
            setSelectIngredients([{ id: 16, name: "masa", price: 10 }]);
            sendAlert(true,"Orden Creada",true);
        }else{
            sendAlert(false,"Debes seleccionar almenos 1 ingrediente",true);
            setIndexCarousel(0);
        }

    }

    const sendAlert = (status, message, active) => {
        let stateAlert = {
            message:message,
            status:status,
            active:active
        }
        setConfigAlert(stateAlert);
    }

    const closeAlert = () => {
        setConfigAlert({...configAlert,active:false});
    }



    return(
        <div id="home-page">
            <CustomAlert {...configAlert} handleClose={closeAlert} />
            <div className="cont-sec">
                <div className="top-sec"> 
                    <div className="navigation">
                        <div className="log-cont">
                            <img src={LogHabi} />
                            <h3>Pizza</h3>
                        </div>
                        <div className="cta-cont d-flex justify-content-between">
                            <button onClick={() => moveCarousel(false)} className="btn1-style"><FontAwesomeIcon icon={faChevronLeft} /></button>
                            <button onClick={() => moveCarousel(true)} className="btn1-style"><FontAwesomeIcon icon={faChevronRight} /></button>
                        </div>
                    </div>
                    <div className="menu-cont">
                        <Row>
                            <Col>
                                <div className="item-nav">
                                    <p onClick={() => handleIndexCarousel(0)}>Crear pizza <FontAwesomeIcon icon={faChevronRight} /></p>
                                </div>
                            </Col>
                            <Col>
                                <div className="item-nav">
                                    <p onClick={() => handleIndexCarousel(1)}>Cliente <FontAwesomeIcon icon={faChevronRight} /></p>
                                </div>
                            </Col>
                            <Col>
                                <div className="item-nav">
                                    <p onClick={() => handleIndexCarousel(2)}>Ordenes <FontAwesomeIcon icon={faChevronRight} /></p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {indexCarousel !== 2  &&
                        <div className="total-sec">
                            <h3 >{numberFormat2.format(total)}</h3>
                        </div>
                    }
                </div>
                <Carousel  activeIndex={indexCarousel} indicators={false} controls={false}>
                    <Carousel.Item>
                        {refresh && 
                            <CreatePizza ingredients={ listIngredients } handleIngredients={ handleIngredients }/>
                        }
                        
                    </Carousel.Item>
                    <Carousel.Item>
                        <Clients saveOrder={saveOrder} alert={sendAlert} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Orders listOrders={listOrders} />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default Home;