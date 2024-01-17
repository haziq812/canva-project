import React, { useEffect, useState } from 'react'
import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";

export default function MyTitle({text, userEditable = true, className = '' , fontSize ='20' }) {
  
  const [editable, setEditable] = useState(false);

    const {
        connectors: { connect, drag },
        selected,
        actions: { setProp },
      } = useNode((state) => ({
        selected: state.events.selected,
        dragged: state.events.dragged,
      }));

      useEffect(() => {
        if (selected) {
          return;
        }
    
        if (userEditable) {
          setEditable(false);
        }
      }, [selected]);

      

  return (
    <>
    { userEditable ?  (<ContentEditable
      
      html={text}
      // disabled={!editable}
      onChange={(e) =>
        setProp(
          (props) =>
            (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
          500
        )
      }
      tagName="p"
      style={{ fontSize: `${fontSize}px` }}
      className={className} />) :   <h1  ref={(ref) => connect(drag(ref))} 
      onClick={() =>  {
        alert('Clicked');
        selected && userEditable && setEditable(true); }}
      className='display-inline'>{text}</h1> }
      </>
  
  )
}



const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <label>
      Font size
      <input
        type="range"
        defaultValue={fontSize || 7}
        step={7}
        min={1}
        max={50}
        onChange={(e) => {
          setProp((props) => (props.fontSize = e.target.value), 1000);
        }}
      />
    </label>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};