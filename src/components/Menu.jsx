import React from 'react';
import MenuNav from'./menuComponents/MenuNav';
import MenuPage from'./menuComponents/MenuPage';
import MenuTable from'./menuComponents/MenuTable';
import MenuText from'./menuComponents/MenuText';
import MenuBind from'./menuComponents/MenuBind';




const Menu = (props) => {
    return (
        <div className={"menu"}>
            <MenuNav

            />
            <MenuText
                loadEditorData={props.loadEditorData}
                edt={props.edt}
            />
            <MenuTable/>
            <MenuPage/>
            <MenuBind
                loadEditorData={props.loadEditorData}
                edt={props.edt}
            />
        </div>
    );
};

export default Menu;