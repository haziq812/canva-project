import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import MyButton from './MyButton';
import { Element, Frame, useEditor } from "@craftjs/core";
import MyTitle from './MyTitle';
import MyRow from './MyRow';
import MyCol from './MyCol';

export default function Toolbox() {

    const { connectors, query } = useEditor();
    
    const ToolboxButton = React.forwardRef(({ icon, text }, ref) => (
        <Button ref={(ref) => connectors.create(ref, <MyButton text={text} />)}> { text }</Button>
      ));
      const ToolboxTitle = React.forwardRef(({ icon, text }, ref) => (
        <h1 ref={(ref) => connectors.create(ref, <MyTitle text={text} />)}> { text }</h1>
      ));
      const ToolboxRow = React.forwardRef(({ icon, text }, ref) => (
        <div ref={(ref) => connectors.create(ref, <MyRow />)}> { text }</div>
      ));
      const ToolboxCol = React.forwardRef(({ icon, text }, ref) => (
        <div ref={(ref) => connectors.create(ref, <MyCol />)}> { text }</div>
      ));
  return (
   <>
   <Card>
    <Card.Header>
        Toolbox
    </Card.Header>
   <Card.Body>
    <Row>
       <ToolboxButton text={'My Button'} />
       <ToolboxTitle text={'My Title'} />
       <ToolboxRow text={'My Row'} />
       <ToolboxCol text={'My Col'} />
     </Row>
   </Card.Body>
   </Card>
   </>
  ); 
}
