import React from 'react';
import TemplatePage from'./contentComponents/TemplatePage';

const Content = (props) => {





    return (
        <div className={"content"}>
            <TemplatePage
                setViewTextareaFlag={props.setViewTextareaFlag}
                arrViewElems={props.arrViewElems}
                selectedElem={props.selectedElem}
                viewTextareaFlag={props.viewTextareaFlag}
                changeText={props.edt.changeText}
                loadEditorData={props.loadEditorData}
                setSelectedElem={props.setSelectedElem}
                edt={props.edt}
                handleChange={props.handleChange}
                handleChangeText={props.handleChangeText}
                cellSelected={props.cellSelected}
                setCellSelected={props.setCellSelected}
            />
        </div>
    );
};

export default Content;