import React from 'react';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';
import Table from "./Table";
import Text from "./Text";
import Image from "./Image";
import TextEditor from "../menuComponents/textEditorMenu/TextEditor";
import BindModalWindow from "../modalComponents/BindModalWindow";

const TemplatePage = (props) => {


    // elem={elem}++
    // selectedElem={props.selectedElem}--
    // viewTextareaFlag={props.viewTextareaFlag}--
    // changeText={props.changeText}--
    // loadEditorData={props.loadEditorData}--
    // setSelectedElem={props.setSelectedElem}++
    // setViewTextareaFlag={props.setViewTextareaFlag}--
    // edt={props.edt}++
    // handleChangeText={props.handleChangeText}--
    // tempText={props.tempText}--
    // setTempText={props.setTempText}++
    // setSelectedMenu={props.setSelectedMenu}++




    let arrElem = props.arrViewElems.map((elem,i)=> {
        if (elem.data.type === "text") {
            return (
                <Text
                    elem={elem}
                    setSelectedElem={props.setSelectedElem}
                    edt={props.edt}
                    setTempText={props.setTempText}
                    setSelectedMenu={props.setSelectedMenu}
                >
                </Text>
            )
        }
        if (elem.data.type === "table") {
            return (
                <Table
                    elem={elem}
                    edt={props.edt}
                    handleChange={props.handleChange}
                    cellSelected={props.cellSelected}
                    setCellSelected={props.setCellSelected}
                    setSelectedElem={props.setSelectedElem}
                >
                </Table>
            )
        }
        if (elem.data.type === "img") {
            return (
                <Image
                    elem={elem}
                >
                </Image>
            )
        }
    }
    )












    return (
        <div className={"templatePage"}
             onClick={()=>{
                 // props.setViewTextareaFlag("none");


                 props.setSelectedMenu("main");

             }}
        >
            templatePage
            {arrElem}
        </div>
    );
};

export default TemplatePage;