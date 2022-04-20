import React from 'react';

const Text = (props) => {

    function createText() {
        return ({__html: props.elem.data.textData});
    };

    return (
            <div
                className="textElem"
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
                    props.setTempText(props.elem.data.textData);//переделать без props
                    props.setSelectedMenu("text");
                }}
                dangerouslySetInnerHTML={createText()}
            >
        </div>
    );
};

export default Text;