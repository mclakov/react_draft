import React, {Component, useState, useEffect} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromHTML  } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ContentState from "draft-js/lib/ContentState";


const TextEditor = (props) => {

    const sampleMarkup = props.tempText;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const tempState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );



    const [editorState, setEditorState] = useState(EditorState.createWithContent(tempState));

    // const HTML = {__html:draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    // const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' + '<a href="http://www.facebook.com">Example link</a>';

    const onEditorStateChange = (editorState) => {
          setEditorState(editorState);
      };

    useEffect(() => {
        setEditorState(EditorState.createWithContent(tempState));
    }, [props.tempText, props.selectedElem.id]);




  return (
      <div className="">
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
        />
{/*//**************************************************8*/}

          <button onClick={()=>{
              setEditorState(EditorState.createWithContent(tempState));
          }}>Load</button>

          <button onClick={()=>{
              props.edt.changeText (props.selectedElem.id, draftToHtml(convertToRaw(editorState.getCurrentContent())));
              props.loadEditorData();
              props.setSelectedMenu("main");
          }}>Save</button>


          {/*<textarea*/}
          {/*          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
          {/*        ></textarea>*/}
          {/*<div*/}
          {/*              style={{border: "1px solid red"}}*/}
          {/*              dangerouslySetInnerHTML={HTML}*/}
          {/*          ></div>*/}

          {/*//**************************************************8*/}



      </div>
  );
};

export default TextEditor;
