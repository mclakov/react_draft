import React from 'react';
import TextEditor from "./textEditorMenu/TextEditor";

const MenuTextEditor = (props) => {
    return (
        <div
            className="menuTextEditor"
            style={{display: props.selectedMenu === "text" ? "grid" : "none"}}
        >
            <TextEditor
                edt={props.edt}
                tempText={props.tempText}
                setTempText={props.setTempText}
                selectedElem={props.selectedElem}
                loadEditorData={props.loadEditorData}
                setSelectedMenu={props.setSelectedMenu}
            />
        </div>
    );
};

export default MenuTextEditor;