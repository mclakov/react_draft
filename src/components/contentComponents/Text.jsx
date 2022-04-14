import React from 'react';

const Text = (props) => {

    function createText() {
        return ({__html: props.elem.data.textData});
    };



    return (<div>
            <div
                className="arrViewElems"
                style={{
                    position: "relative",
                    top: props.elem.data.position.y + "px",
                    left: props.elem.data.position.x + "px",
                }}
                id={props.elem.id}
                onClick={(e) => {
                    props.setSelectedElem(props.edt.getPropsSelectedElement(props.elem.id));
                }}
                onDoubleClick={() => {
                    props.setViewTextareaFlag("");
                }}
                dangerouslySetInnerHTML={createText()}
            >
            </div>
            <textarea
                style={{
                    position: "absolute",
                    top: props.selectedElem.data.position.y + "px",
                    left: props.selectedElem.data.position.x + "px",
                    display: props.viewTextareaFlag,
                }}
                value={props.selectedElem.data.textData}
                onChange={(e)=>{
                    props.handleChangeText(e.target.value);
                }}
                onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                }}
            />
        </div>
    );
};

export default Text;