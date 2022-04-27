import React, {useState, useRef} from 'react';

const MenuTable = (props) => {



    const [tableSettDisplay, setTableSettDisplay] = useState('none');
    const [tableId, setTableId] = useState('');
    const [tableRows, setTableRows] = useState(1);
    const [tableCols, setTableCols] = useState(1);
    const [url, setUrl] = useState();
    const [count, setCount] = useState(0);
    const fileInput =useRef("");
    const fileTemplate =useRef("");



    function setNull (e) {
        fileInput.current.value = null;
    };


    function loadFile () {
        let blob = new Blob([fileInput.current.files[0]], {type: "image/png"});
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            // setUrl(reader.result);
            props.edt.addElement("Img");
            props.edt.template.data[props.edt.template.data.length-1].url = reader.result;
            props.loadEditorData(props.edt.loadTemplateArrElem());
        }
    };

    function saveTemplateToFile () {
        let link = document.createElement('a');
        link.download = 'template.txt';
        let jsonse = JSON.stringify(props.edt.loadTemplateArrElem());
        let blob = new Blob([jsonse], {type: "application/json"});
        let reader = new FileReader();
        reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload
        reader.onload = function() {
            link.href = reader.result; // url с данными
            link.click();
        };
    };

    function loadTemplateFromFile () {
        let blob = new Blob([fileTemplate.current.files[0]], {type: "application/json"});
        let reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = function() {
            props.setArrViewElems(JSON.parse(reader.result));
        };
    };

    const tableSett = (
        <div
            className="tableSett"
            style={{"display": tableSettDisplay}}
        >
            <span>Количество строк</span>
            <input
                value={tableRows}
                type="number"
                min={0}
                max={10}
                onChange={(e)=> {
                    setTableRows(e.target.value)
                }}
            /><br/>
            <span>Количество столбцов</span>
            <input
                value={tableCols}
                type="number"
                min={0}
                max={10}
                onChange={(e)=> {
                    setTableCols(e.target.value)
                }}
            /><br/>
            <button
                onClick={() => {
                    setTableSettDisplay('none');
                    props.edt.template.data[props.edt.getIndex(props.edt.addElement("Table"))].data.createTable(tableRows, tableCols);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить</button>
            <button
                onClick={() => {
                    setTableSettDisplay('none')
                }}
            >Отмена</button>
        </div>
    )















    return (
        <div className={"menuTable"}>
            menuTable
            <button
                onClick={ () => {
                    setTableSettDisplay('')
                }}
            >Таблица</button>
            {tableSett}
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.deleteRow(props.cellSelected.indexTableArr);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Удалить строку</button>
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.deleteCol(props.cellSelected.keyInObj);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                    console.log(props.cellSelected.keyInObj);
                }}
            >Удалить столбец</button>
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.addNewRow(props.cellSelected.indexTableArr, 0);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить строку вверх</button>
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.addNewRow(props.cellSelected.indexTableArr, 1);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить строку вниз</button>
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.addNewCol(props.cellSelected.keyInObj, 0);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить столбец слева</button>
            <button
                onClick={() => {
                    props.edt.template.data[props.cellSelected.posInArrViewElems].data.addNewCol(props.cellSelected.keyInObj, 1);
                    props.loadEditorData(props.edt.loadTemplateArrElem());
                }}
            >Добавить столбец справа</button>





            <div>
                Добавить картинку
                <label className="custom-file-upload">
                    <input type="file"

                           onClick={setNull}
                           onChange={loadFile}

                           ref={fileInput}
                    />
                </label>
                <button
                    onClick={() => {
                        props.edt.addElement("Img");
                        props.edt.template.data[props.edt.template.data.length-1].url = url;
                        props.loadEditorData(props.edt.loadTemplateArrElem());
                    }}
                >Картинка</button>
            </div>
            <div>
                <div>
                    Открыть шаблон
                    <label className="custom-file-upload">
                        <input type="file" onChange={loadTemplateFromFile}
                               ref={fileTemplate}
                        />
                    </label>
                    <button
                        onClick={() => {
                            saveTemplateToFile()
                        }}
                    >Сохранить шаблон</button>
                </div>
            </div>
        </div>
    );
};

export default MenuTable;