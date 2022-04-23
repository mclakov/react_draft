import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';

const EMPTY_TEMPLATE = {
    title: "",
    data: [],
    saved: false,
    page: {
        orientation: "",
        size: "",
        margins: {
            top: "",
            right: "",
            bottom: "",
            left: "",
        }
    },
    BIND_ARRAY: [
        {
            id: nanoid(),
            bindName: "{time}",
            // value: new Date(),
            value: "04/04/2022",
        },
        {
            id: nanoid(),
            bindName: "{title}",
            value: "***TITLE 1****",
        }
    ],
};

const EMPTY_ELEMENT = {
    position: {
        x: 0,
        y: 0,
    },
    type: "",
};

// const BIND_ARRAY = [
//     {
//         id: nanoid(),
//         bindName: "{time}",
//         // value: new Date(),
//         value: "04/04/2022",
//     },
//     {
//         id: nanoid(),
//         bindName: "{title}",
//         value: "***TITLE 1****",
//     }
// ];


class Element {
    constructor(element = JSON.parse(JSON.stringify(EMPTY_ELEMENT))) {
        Object.assign(this, element);// копирует все свойства из передоваемого объекта
    }
};

class Table extends Element {
    constructor(rows, cols, position, tableData = [

    ], type = "table") {
        super(position);
        this.type = type;
        this.rows = rows;
        this.cols = cols;
        this.tableData = tableData;
    }

    // createTable(arrHeaders) {//arrHeaders поля для отображеня ['date', 'id', 'time']
    createTable(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        let newArr = [];
        for (let j = 1; j<=(rows); j++) {
            let col = {};
            let key = nanoid();
            for (let i = 1; i<=(cols); i++) {
                col[i + "i"] = '*';
            };
            newArr.push(col);
        };
        this.tableData = cloneDeep(newArr);
    };

    addNewCol(keyInObj, direction) {
        let id = nanoid();
        let newArr = []
        this.tableData.map((elem)=>{
            let newObj = {};
            for (let key in elem){
                if (keyInObj === key && direction === 1) {
                    newObj[key] = elem[key];
                    newObj[id] = "";
                }
                if (keyInObj === key && direction === 0) {
                    newObj[id] = "";
                    newObj[key] = elem[key];
                }
                else {
                    newObj[key] = elem[key];
                }
            }
            newArr.push(newObj)
        })
        this.tableData = cloneDeep(newArr);
    };

    addNewRow(row = 0, direction = 0) {
        //direction up = 0; direction down = 1
        let newElem = {};
        for (let key in this.tableData[0]){
            newElem[key] = "";
        };
        this.tableData.splice(row + direction, 0, newElem);
    };

    changeCellValue(key, index, value) {
        let newData = cloneDeep(this.tableData)
        newData[index][key] = value;
        this.tableData = newData;
    };

    deleteRow(index) {
        this.tableData.splice(index, 1);
    };

    deleteCol(key) {
        this.tableData.forEach(elem => {
            delete elem[key];
        });
    };
};

class Text extends Element {
    constructor(size, font, position, textData = "text", type = "text" ) {
        super(position);
        this.type = type;
        this.size = size;
        this.font = font;
        this.textData = textData;
    }
};

class Img extends Element {
    constructor(size , position, url = "", type = "img") {
        super(position);
        this.type = type;
        this.size = size;
        this.url = url;
    }
};

const TEMP_ELEMENTS_ARRAY = [
    {"type": Table},
    {"type": Text},
    {"type": Img},
];


class Editor {
    // constructor(template = {...EMPTY_TEMPLATE, data: [...EMPTY_TEMPLATE.data]}) {
    constructor(template = JSON.parse(JSON.stringify(EMPTY_TEMPLATE))) {
        this.template = template;
    }
    loadTemplate(template) {
        try {
            let tempTemplate = JSON.parse(template);
            this.template = {...tempTemplate};
        }
        catch (err) {
            console.log("+++++++++++++++error+++++++++++++++++",err);
            return {}
        }
    }

    saveTemplate() {
        this.template.saved = true;
        return JSON.stringify({...this.template});
    }

    loadTemplateArrElem() {
        return  this.template.data;
    }

    loadBindArr() {
        return  this.template.BIND_ARRAY;
    }

    addBind(bindName, value) {
        this.template.BIND_ARRAY.push(
            {
                id: nanoid(),
                bindName: "{" + bindName + "}",
                value: value,
            }
        )
        console.log("add new bind", bindName, value)
    }

    delBind(id) {
        let index = this.template.BIND_ARRAY.findIndex(el => el.id === id);
        if(index === -1) {
            console.log('Ошибка привязки. Неверный ID элемента')
        }
        else {
            this.template.BIND_ARRAY.splice(index, 1)
        }
    }


    applyBinds() {
        console.log("applyBinds");
        console.log("this.template.data.", this.template.data);


        this.template.data.map(elem => {
            if (elem.data.type === "text") {
                this.template.BIND_ARRAY.map (bind => {
                    let pos = 0;
                    while (true) {
                        let bindStart = elem.data.textData.indexOf(bind.bindName, pos);
                        if (bindStart != -1) {
                            let strWithBind = elem.data.textData.slice(0, bindStart) + bind.value + elem.data.textData.slice(bindStart + bind.bindName.length);
                            console.log("strWithBind", strWithBind);
                            elem.data.textData = strWithBind;
                        }
                        if (bindStart == -1) break;
                        pos = bindStart + 1;
                    }
                })
            }
        })
    }


    addElement(typeElem) {
        let index = TEMP_ELEMENTS_ARRAY.findIndex(elem => {
            if (typeElem === elem.type.name) {
                return true;
            }
        });

        if (index === -1) {
            let nameTEMP_ELEMENTS_ARRAY = [];
            TEMP_ELEMENTS_ARRAY.map((e)=> {
                nameTEMP_ELEMENTS_ARRAY.push(" " + e.type.name);
            });
            console.log (`Выберети другой элемент. Доступны:${nameTEMP_ELEMENTS_ARRAY}`)
            return;
        }
        let newElement = {
            id: nanoid(),
            data: new TEMP_ELEMENTS_ARRAY[index].type,
        }
        this.template.data.push(newElement);
        return newElement.id;
    }

    setPageProps(orientation = "portrait", size = "a4", margins = {top:0, right: 0, bottom: 0, left: 0}) {
        let tempPage =  {
            orientation: orientation,//landscape
            size: size,
            margins: {
                top: margins.top,
                right: margins.right,
                bottom: margins.bottom,
                left: margins.left,
            }
        };
        this.template.page = {...tempPage};
    }

    getIndex(id) {
        let index = this.template.data.findIndex(elem =>  elem.id === id)
        if (index === -1) {
            console.log ("некорректный id")
            return;
        }
        else {
            return index;
        }
    };

    setPosition (id, top, left) {
        this.template.data[this.getIndex(id)].data.position.x = left;
        this.template.data[this.getIndex(id)].data.position.y = top;
    };



    getPropsSelectedElement (id) {
        return   this.template.data[this.getIndex(id)];
    };



    changeText (id, textValue) {
        console.log("id", id)
        console.log("textValue", textValue)

        this.template.data[this.getIndex(id)].data.textData = textValue;
    }

};

export {Editor};