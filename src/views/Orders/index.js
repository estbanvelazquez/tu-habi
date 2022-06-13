import { Accordion } from 'react-bootstrap'  
import "./style.scss"
const Orders = ({listOrders}) => {
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    return (
        <div className="main-card orders">
            <div className="head-card">
                <div className="title-head">
                    <h3>Ordenes</h3>
                </div>
            </div>
            <div className="card-body">
                {listOrders.length > 0?
                    <Accordion>
                        {listOrders?.map(item => (
                            <Accordion.Item key={item.orderId} eventKey={item.orderId}>
                                <Accordion.Header>
                                    <span>#{item.orderId} <span>{item.name}</span></span> <span>{item.date} {item.time}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="detail-cont">
                                        <p><b>Total: </b>{numberFormat2.format(item.total)}</p>
                                        <p><b>Telefono: </b>{item.phone}</p>
                                        <p><b>Descripcion: </b>{item.description}</p>
                                        <p><b>Ingredientes: </b>{item.detail?.map(ingredient => ingredient.name + ", ")}</p>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion> : <p>Sin ordenes</p>
                }

            </div>
        </div>
    )
}

export default Orders