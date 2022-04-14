import * as React from 'react';
import { useState } from 'react';




const Header = (props) => {
    // let nameTemplate: string
    const [nameTemplate, setNameTemplate] = useState("default");



    return (
        <div className={"header"}>
            <p>Документ {nameTemplate}</p>
        </div>
    );
};

export default Header;