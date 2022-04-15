import React, {Component, useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

// export default class TextEditor extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   };
//
//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };
//
//   render() {
//     const { editorState } = this.state;
//     const HTML = {__html:draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//     let tempState;
//
//
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="wrapperClassName"
//           editorClassName="editorClassName"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         ></textarea>
//           <button onClick={()=>{
//               // console.log("editorState", editorState._immutable)
//               tempState = editorState;
//           }}>Save</button>
//           <button onClick={()=>{
//               console.log(tempState);
//               console.log(editorState);
//
//
//               // this.onEditorStateChange(tempState);
//           }}>Load</button>
//           <div
//               style={{border: "1px solid red"}}
//               dangerouslySetInnerHTML={HTML}
//           >
//
//           </div>
//
//       </div>
//     );
//   }
// }




const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [tempState, setTempState] = useState();
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
              console.log(tempState);
              console.log(editorState);
              console.log(editorState);

              setEditorState(tempState)

          }}>Load</button>
      </div>
  );
};

export default TextEditor;
