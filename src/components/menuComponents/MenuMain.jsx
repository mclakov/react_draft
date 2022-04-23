import React from 'react';
import MenuPage from './mainMenu/MenuPage';
import MenuTable from './mainMenu/MenuTable';
import MenuText from './mainMenu/MenuText';
// import MenuBind from './menuComponents/mainMenu/MenuBind';
import MenuBind from './mainMenu/MenuBind';



const MenuMain = (props) => {
    return (
        <div
            className="menuMain"
            style={{display: props.selectedMenu === "main" ? "grid" : "none"}}
        >
            <MenuText
                loadEditorData={props.loadEditorData}
                edt={props.edt}
            />
            <MenuTable/>
            <MenuPage/>
            <MenuBind
                showBindModalWindow={props.showBindModalWindow}
                setShowBindModalWindow={props.setShowBindModalWindow}
                loadEditorData={props.loadEditorData}
                edt={props.edt}
            />
        </div>
    );
};

export default MenuMain;