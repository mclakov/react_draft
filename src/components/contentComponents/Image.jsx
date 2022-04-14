import React from 'react';

const Image = (props) => {
    return (
        <div>
            <img src={props.elem.url} style={{
                width: "100px",
                height: "100px",
            }}/>
        </div>
    );
};

export default Image;