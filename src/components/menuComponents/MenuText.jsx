import React from 'react';

const MenuText = (props) => {

    return (
        <div className={"menuText"}>
            menuText
            <button
                onClick={ () => {
                    props.edt.addElement("Text");
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Текст</button>
        </div>
    );
};

export default MenuText;