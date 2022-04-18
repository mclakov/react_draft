import React, {Component, useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromHTML  } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ContentState from "draft-js/lib/ContentState";


const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [tempState, setTempState] = useState();
    const HTML = {__html:draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' + '<a href="http://www.facebook.com">Example link</a>';
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    const onEditorStateChange = (editorState) => {
          setEditorState(editorState);
      };

  return (
      <div className="">
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
        />

          <button onClick={()=>{
              setTempState(editorState);
          }}>Save</button>
          <button onClick={()=>{
              setEditorState(EditorState.createWithContent(state));
          }}>Load</button>
          <textarea
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                  ></textarea>
          <div
                        style={{border: "1px solid red"}}
                        dangerouslySetInnerHTML={HTML}
                    ></div>
      </div>
  );
};

export default TextEditor;
