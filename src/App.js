import React, { Component, useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Menu from "./components/Menu";
import { cloneDeep } from 'lodash';
import {Editor} from "./Editor";
import 'bootstrap/dist/css/bootstrap.min.css';
import BindModalWindow from "./components/modalComponents/BindModalWindow";

const  edt = new Editor();

function App() {

    const [cellSelected, setCellSelected] = useState({
        posInArrViewElems: "",
        keyInObj: "",
        indexTableArr: "",
        selected: false,
    });
    const [arrViewElems, setArrViewElems] = useState([
        {
            id: "id",
            data:   {
                type:"",
                position: {
                    x: 0,
                    y: 0,
                }
            }
        }
    ]);
    const [selectedElem, setSelectedElem] = useState({
        id: "",
        data: {
            position: {
                x: 0,
                y: 0,
            }
        }
    });
    const [selectedMenu, setSelectedMenu] = useState("main");
    const [tempText, setTempText] = useState("TEMP_TEXT");
    const [showBindModalWindow, setShowBindModalWindow] = useState(false);
    const [bindArray, setBindArray] = useState(edt.loadBindArr());




    const handleChange = (e, index, indexTableArr, keyInObj) => {
        let newArr = cloneDeep(arrViewElems);
        newArr[index].data.tableData[indexTableArr][keyInObj] = e.target.value;
        setArrViewElems(newArr);
    };

    const loadEditorData = () => {
        let newArr = cloneDeep(edt.loadTemplateArrElem());
        setArrViewElems(newArr);
    };

    const loadBindData = () => {
        setBindArray(edt.loadBindArr());
    };

  return (
    <div className="App">
        <Header/>
        <Menu
            showBindModalWindow={showBindModalWindow}
            setShowBindModalWindow={setShowBindModalWindow}
            loadEditorData={loadEditorData}
            edt={edt}
            selectedElem={selectedElem}
            cellSelected={cellSelected}
            setCellSelected={setCellSelected}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            tempText={tempText}
            setTempText={setTempText}
        />
        <BindModalWindow
            edt={edt}
            bindArray={bindArray}
            showBindModalWindow={showBindModalWindow}
            setShowBindModalWindow={setShowBindModalWindow}
            loadBindData={loadBindData}
        />
        <Content
            arrViewElems={arrViewElems}
            setSelectedElem={setSelectedElem}
            edt={edt}
            handleChange={handleChange}
            cellSelected={cellSelected}
            setCellSelected={setCellSelected}
            setTempText={setTempText}
            setSelectedMenu={setSelectedMenu}
        />
        <Footer/>
    </div>
  );
}

export default App;
