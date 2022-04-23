import React, {useState, useEffect} from 'react';
import {Modal, Form} from "react-bootstrap";
// import {useState} from "@types/react";


const BindModalWindow = (props) => {

    const [newBindName, setNewBindName] = useState("");
    const [newBindValue, setNewBindValue] = useState("");
    const [selectedBind, setSelectedBind] = useState("");

    // useEffect(() => {
    //     setNewBindName("");
    //     setNewBindValue("");
    //     setSelectedBind("");
    // }, [props.bindArray]);//почему не работает?


    const checkBindName = () => {
        props.bindArray.map ((elem, index) => {
            if("{"+newBindName+"}" == elem.bindName) {
                alert("Имя занято! Выберите другое")
                setNewBindName("");
            };
        })
    }

    const createBindTable = () => {
        let tbody = [];
        props.bindArray.map ((elem, index) => {
            let tableBindName = elem.bindName.slice(1, -1)
            tbody.push(<tr>
                <td
                    id={elem.id}
                    style={{outline: (selectedBind === elem.id) ? "1px solid red" : "none"}}
                    onClick={(e)=>setSelectedBind(e.target.id)}
                >{tableBindName}</td>
                <td>{elem.value}</td>
            </tr>)
        });
        return (<table>
            <tr>
                <th>Название привязки</th>
                <th>Значение</th>
            </tr>
            {tbody}
            <tr>
                <td><input
                    value={newBindName}
                    onChange={e => {
                        setNewBindName(e.target.value);
                    }}
                    onBlur={()=>{
                        checkBindName()
                    }}
                    // onFocus={}
                /></td>
                <td><input
                    value={newBindValue}
                    onChange={e => setNewBindValue(e.target.value)}
                /></td>
            </tr>
        </table>)
    };






    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.showBindModalWindow}
                onHide={() => props.setShowBindModalWindow(!props.showBindModalWindow)}
            >
                <Modal.Header
                    closeButton
                >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Привязки
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {createBindTable()}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        // onClick={()=>props.setShowBindModalWindow(false)}
                        disabled = {(newBindValue == "" || newBindName == "") ? true : false}
                        onClick={()=> {
                            props.edt.addBind(newBindName, newBindValue);
                            props.loadBindData();
                            setNewBindName("");
                            setNewBindValue("");
                            setSelectedBind("");
                        }}
                    >Добавить привязку</button>
                    <button
                        disabled = {(selectedBind == "") ? true : false}
                        onClick={()=> {
                            props.edt.delBind(selectedBind);
                            props.loadBindData();
                            props.loadBindData();
                            setNewBindName("");
                            setNewBindValue("");
                            setSelectedBind("");
                        }}
                    >Удалить привязку</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BindModalWindow;



