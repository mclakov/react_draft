import React from 'react';

const MenuBind = (props) => {
    return (
        <div className={"menuBind"}>
            menuBind
            <button
                onClick={() => {
                    props.edt.addBind();
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить привязки</button>
        </div>
    );
};

export default MenuBind;