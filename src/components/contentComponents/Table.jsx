import React from 'react';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

const Table = (props) => {


    let newTable = [];
    let row = [];
    let table = props.elem.data.tableData.map((elemTableArr, indexTableArr) => {
        let row = [];
        for (let keyInObj in elemTableArr) {
            row.push(<td
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                // key={nanoid()}
                // key={1}
            >
                <input
                    // key={indexTableArr}
                    // key={nanoid()}
                    type="text"
                    value={elemTableArr[keyInObj]}
                    onChange={(e) => {
                        let index = props.edt.getIndex(props.elem.id);
                        props.handleChange(e, index, indexTableArr, keyInObj);
                    }}
                    onBlur={(e) => {
                        props.edt.template.data[props.edt.getIndex(props.elem.id)].data.changeCellValue(keyInObj, indexTableArr, e.target.value);
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        let newObj = cloneDeep(props.cellSelected)
                        newObj.posInArrViewElems = props.edt.getIndex(props.elem.id);
                        newObj.keyInObj = keyInObj;
                        newObj.indexTableArr = indexTableArr;// indexTableArr - ряд в отрисованной таблице (с нуля)
                        newObj.selected = true;
                        props.setCellSelected(newObj);
                    }}
                />
            </td>);
        }
        newTable.push(<tr
            // key={nanoid()}
            // key={''}
        >{row}</tr>)
    });

    return (<div
        // key={nanoid()}
        className="arrViewElems"
        style={{
            position: "relative",
            top: props.elem.data.position.y + "px",
            left: props.elem.data.position.x + "px",
        }}
        id={props.elem.id}
        onClick={(e) => {
            props.setSelectedElem(props.edt.getPropsSelectedElement(e.target.id));
        }}
    >
        <table>
            <thead></thead>
            <tbody>{newTable}</tbody>
            <tfoot></tfoot>
        </table>
    </div>);
};

export default Table;