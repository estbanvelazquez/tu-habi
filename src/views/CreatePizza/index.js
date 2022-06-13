import Pizza from "../../assets/img/pizza.png"
import CardList from "../../components/CardList"
import "./style.scss"
import { useState } from "react"
import { Row, Col } from 'react-bootstrap'  
const CreatePizza = ({ingredients, handleIngredients}) =>{

  const sendIngredient = (status,ingredient) =>{
    if(status){
      handleIngredients(status,ingredient);
    }else{
      handleIngredients(status,ingredient);
    }
  }

  return (
    <div className="main-card create-pizza">
      <div className="head-card">
        <div className="title-head">
          <h3>Selecciona los ingredientes</h3>
        </div>
      </div>
      <div className="card-body">
        <Row className="align-items-center">
          <Col md={4}>
            <div className="ico-pizza">
              <div className="img-cont">
                <img src={Pizza} />
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex flex-wrap justify-content-center">
              {ingredients.length > 0 && ingredients.map(item => (
                <CardList  key={item.id} data={item} statusIngredient={sendIngredient} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CreatePizza;