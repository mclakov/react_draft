import React from 'react';

const MenuNav = (props) => {





    const selectMenu = (event) => {
        props.setSelectedMenu(event.target.id);
    };











    return (
        <div className={"menuNav"}>
            <div
                id="file"
                style={{backgroundColor: props.selectedMenu === "file" ? "#f1f1f1" : "#61dafb"}}
                onClick={selectMenu}
            >Файл</div>
            <div
                id="main"
                style={{backgroundColor: props.selectedMenu === "main" ? "#f1f1f1" : "#61dafb"}}
                onClick={selectMenu}
            >Главная</div>
            <div
                id="text"
                style={{backgroundColor: props.selectedMenu === "text" ? "#f1f1f1" : "#61dafb"}}

            >Текст</div>
        </div>
    );
};

export default MenuNav;