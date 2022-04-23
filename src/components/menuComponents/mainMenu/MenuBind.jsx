import React from 'react';



const MenuBind = (props) => {
    return (
        <div className={"menuBind"}>
            menuBind
            <button
                onClick={() => {
                    props.setShowBindModalWindow(!props.showBindModalWindow);
                    console.log(!props.showBindModalWindow)
                }}
            >Добавить привязки</button>
            <button
                onClick={() => {
                    props.edt.applyBinds();
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Заменить привязки</button>
        </div>
    );
};

export default MenuBind;