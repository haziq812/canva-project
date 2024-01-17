import React from 'react'
import { Editor, Frame, Element, useNode, useEditor } from "@craftjs/core";
import TitleComp from './TitleComp';
import MyButton from './MyButton';
import { Col, Row } from 'react-bootstrap';
import Toolbox from './Toolbox';
import MyContainer from './MyContainer';
import MyTitle from './MyTitle';
import MyRow, { Row as mRow} from './MyRow';
import MyCol, {Column}  from './MyCol';
import {Typography, Paper, Grid} from '@mui/material';
export default function PageEditor() {
    // const { connectors, query } = useEditor();
    return (
        <>
            <Editor resolver={{ TitleComp, MyButton, MyContainer, MyTitle, MyRow, MyCol, Column, mRow }}>
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <Paper>
                            <Toolbox />

                        </Paper>          
                    </Grid>
                    <Grid item xs={8}>
                        <Frame>
                            <Element is={MyContainer} id='myroot' canvas />
                        </Frame>
                    </Grid>
                    <Grid item xs={0}>
                        <Paper>
                            <Toolbox />

                        </Paper>          
                    </Grid>
                </Grid>

            </Editor>
        </>
    )
}
