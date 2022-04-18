import React, { Component, useEffect, useState} from "react";
import "./App.css";
import TextEditor from "./components/menuComponents/textEditorMenu/TextEditor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Menu from "./components/Menu";
import { cloneDeep } from 'lodash';
import {Editor} from "./Editor";

const  edt = new Editor();

function App() {

    const [dataEditor, setDataEditor] = useState();
    const [cellSelected, setCellSelected] = useState({
        posInArrViewElems: "",
        keyInObj: "",
        indexTableArr: "",
        selected: false,
    });
    const [tableCellValue, setTableCellValue] = useState('');
    const [viewTextareaFlag, setViewTextareaFlag] = useState("none");
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




    function handleChange (e, index, indexTableArr, keyInObj) {
        let newArr = cloneDeep(arrViewElems);
        newArr[index].data.tableData[indexTableArr][keyInObj] = e.target.value;
        setArrViewElems(newArr);
    };

    function handleChangeText (value) {
        let newObj = cloneDeep(selectedElem);
        newObj.data.textData = value;
        setSelectedElem(newObj);
        edt.changeText(selectedElem.id, value);
        loadEditorData();
    };

    function loadEditorData () {
        let newArr = cloneDeep(edt.loadTemplateArrElem());
        setArrViewElems(newArr);
    };

    function setBold(selectedText) {
        let newObj = cloneDeep(selectedElem);
        newObj.data.textData = selectedElem.data.textData.replace(selectedText, `<b>${selectedText}</b>`);
        setSelectedElem(newObj);
        edt.changeText(selectedElem.id, newObj.data.textData);
        loadEditorData();
    };

  return (
    <div className="App">
        <Header/>
        <Menu
            setArrViewElems={setArrViewElems}
            loadEditorData={loadEditorData}
            edt={edt}
            selectedElem={selectedElem}
            cellSelected={cellSelected}
            setCellSelected={setCellSelected}
            setViewTextareaFlag={setViewTextareaFlag}
            setBold={setBold}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            tempText={tempText}
            setTempText={setTempText}

        />
        <Content
            setViewTextareaFlag={setViewTextareaFlag}
            arrViewElems={arrViewElems}
            selectedElem={selectedElem}
            viewTextareaFlag={viewTextareaFlag}
            changeText={edt.changeText}
            loadEditorData={loadEditorData}
            setSelectedElem={setSelectedElem}
            edt={edt}
            handleChange={handleChange}
            handleChangeText={handleChangeText}
            cellSelected={cellSelected}
            setCellSelected={setCellSelected}
            tempText={tempText}
            setTempText={setTempText}
            setSelectedMenu={setSelectedMenu}
        />
        <Footer/>
      {/*<div className="editor">*/}
      {/*  <TextEditor />*/}
      {/*</div>*/}
    </div>
  );
}

export default App;
