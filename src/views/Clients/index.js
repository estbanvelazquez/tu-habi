import { useState } from 'react';
import { Form } from 'react-bootstrap'; 
import { useForm } from 'react-hook-form';
import "./style.scss"
const Clients = ({saveOrder, alert}) => {
    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        saveOrder(data);
        reset();
    }


    return (
        <div className="main-card data-clients">
            <div className="card-body">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Datos del cliente</h3>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Nombre"
                          { ...register("name", {
                            required: {
                              value:true,
                              message: "El campo es requerido"
                            },
                            minLength:{
                                value: 10,
                                message: "Se requieren almenos 15 caracteres"
                            },
                            pattern: {
                              value: /^[A-Za-z]+$/,
                              message: "El nombre solo debe contener letras"
                            }
                          }) }/>
                        {errors.name &&
                            <p>* {errors.name.message}</p>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="number" placeholder="Telefono"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "El campo es requerido"
                                },
                                minLength:{
                                    value: 10,
                                    message: "Se requieren almenos 10 digitos"
                                },
                                maxLength:{
                                    value: 10,
                                    message: "No pueden ser mas de 10 digitos"
                                }
                            })}
                        />
                        {errors.phone &&
                            <p>* {errors.phone.message}</p>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Añade una descripcion"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "El campo es requerido"
                                },
                                minLength:{
                                    value: 10,
                                    message: "Se requieren almenos 10 caracteres"
                                }

                            })}
                        />
                        {errors.description &&
                            <p>* {errors.description.message}</p>
                        }
                    </Form.Group>
                    <button className="btn1-style" type="submit">Confirmar</button>
                </Form>
            </div>
        </div>
    )
}

export default Clients