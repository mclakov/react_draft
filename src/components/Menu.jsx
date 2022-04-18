import React from 'react';
import MenuNav from'./menuComponents/MenuNav';
import MenuMain from "./menuComponents/MenuMain";
import MenuTextEditor from "./menuComponents/MenuTextEditor";





const Menu = (props) => {
    return (
        <div className={"menu"}>
            <MenuNav
                selectedMenu={props.selectedMenu}
                setSelectedMenu={props.setSelectedMenu}
            />
            <MenuMain
                selectedMenu={props.selectedMenu}
                loadEditorData={props.loadEditorData}
                edt={props.edt}
            />
            <MenuTextEditor
                edt={props.edt}
                selectedMenu={props.selectedMenu}
                setSelectedMenu={props.setSelectedMenu}
                tempText={props.tempText}
                setTempText={props.setTempText}
                selectedElem={props.selectedElem}
                loadEditorData={props.loadEditorData}
            />
        </div>
    );
};

export default Menu;