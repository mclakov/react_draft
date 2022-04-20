import React, {useEffect} from 'react';
import {Modal, Form} from "react-bootstrap";
import Button from "../Components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus,} from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';
import {useState} from "react";
import { cloneDeep, find, extend } from 'lodash';

library.add(faTrash, faPlus);

const BindModalWindow = (props) => {
// const BindModalWindow = ({bindArr = tempBindArr }) => {

    let [newBindName, setNewBindName] = useState();
    let [newBindType, setNewBindType] = useState();
    let [newBindValue, setNewBindValue] = useState();

    let styleInput = {
        outline: "1px solid red",
    }




    function delTr (e, id) {
        let posArr =  props.bindArr.map((e, i) => e.id);
        let pos = (posArr.indexOf(id));//позиция id в массиве
        let tempArr  = cloneDeep(props.bindArr);//копирование массива
        tempArr.splice(pos,1);
        props.setBindArr(tempArr);
    };



    function createArr() {
        console.log("props.bindArr", props.bindArr);
        if (props.bindArr === undefined){
            return;
        }
        else {
            return( props.bindArr.map((item, index) => {
                    let arrValue = [];
                    for (let key in item.data) {
                        arrValue.push(item.data[key]);

                    };
                    arrValue = arrValue.map ((i)=>
                        (<td>{i}</td>)
                    )
                    return (
                        <tr key={index} id={item.id}>
                            {arrValue}
                            <Button id={item.id} buttonName={<FontAwesomeIcon icon="trash" />} classNameBtn={props.classNameBtn} buttonHandler={delTr}/>
                        </tr>
                    )
                }
            ))
        };
    };

    function handleChange (e) {
        if (e.target.id === "inputBindName"){
            setNewBindName(e.target.value);
        }
        if (e.target.id === "inputBindType"){
            setNewBindType(e.target.value);
        }
        if (e.target.id === "inputBindValue"){
            setNewBindValue(e.target.value);
        }
    };

    function addNewBind() {
        let newBindObj = {
            id: nanoid(),
            data: {
                name: newBindName,
                type: newBindType,
                value: newBindValue,
                pls:"",
            },
        };
        let tempArr  = cloneDeep(props.bindArr);//копирование массива
        tempArr.push (newBindObj);
        props.setBindArr(tempArr);
    };





    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={props.closeBindWindowHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Привязки
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table style={{width: "100%"}}>
                        <tr>
                            <th>Имя</th>
                            <th>Тип</th>
                            <th>Значение</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {createArr()}
                        <td>
                            <input
                                type={"text"}
                                value={newBindName}
                                onChange={handleChange}
                                id="inputBindName"
                            />
                        </td>
                        <td>
                            <Form.Select id="inputBindType" aria-label="Default select example" onChange={handleChange}>
                                <option selected value="Text">Text</option>
                                <option value="Date">Date</option>
                            </Form.Select>
                        </td>
                        <td>
                            <input
                                type={"text"}
                                value={newBindValue}
                                onChange={handleChange}
                                id="inputBindValue"
                            />
                        </td>
                        <td>
                            <Button
                                buttonName={<FontAwesomeIcon icon="plus" />}
                                classNameBtn={props.classNameBtn}
                                buttonHandler={props.closeBindWindowHandler}
                                buttonHandler={()=>{
                                    addNewBind();
                                    // props.closeTemplateWindowHandler();
                                }}
                            />
                        </td>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button buttonName={"Применить"} buttonHandler={props.closeBindWindowHandler} classNameBtn={"btn btn-primary"}/>
                    <Button buttonName={"Закрыть"} buttonHandler={props.closeBindWindowHandler} classNameBtn={"btn btn-danger"}/>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BindModalWindow;



