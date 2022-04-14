import React from 'react';
import { useState } from 'react';

const Footer = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [countPage, setCountPage] = useState(1);





    return (
        <div className={"footer"}>
            <p>Страница {currentPage} из {countPage}</p>
        </div>
    );
};

export default Footer;