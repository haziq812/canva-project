import { useNode } from "@craftjs/core";
import React from 'react';
import { Button } from 'react-bootstrap';

export default function MyButton({ref, text, icon}) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Button  ref={(ref) => connect(drag(ref))} >{ text }</Button>
  );
}
