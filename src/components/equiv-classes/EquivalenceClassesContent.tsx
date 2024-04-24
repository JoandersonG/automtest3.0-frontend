import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField } from "@mui/material";
import { Stack, Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import { ContentType } from "../insert-methods-info/ContentType";
import { useState } from "react";
import { EquivalenceClass } from "../../models/EquivalenceClass";
import { v1 as uuidv1 } from 'uuid';
import EquivClassList from "./EquivClassList";
import EquivClassCreateOrUpdate from "./EquivClassCreateOrUpdate";


export default function EquivalenceClassesContent(props: {methods: Method[]}) {

    function updateView(newContent: ContentType) {
        if (newContent == ContentType.NEW_EQUIV_CLASS) {
            setCurrentView(possibleViews.newEquivClass)
        }
    }

    const [newEquivClass, setnewEquivClass] = useState<EquivalenceClass>({
        identifier: uuidv1(),
        name: '',
        numberOfCases: 0,
        expectedOutputRange: {
            v1: '',
            v2: '',
            v3: ''
        },
        acceptableParamRanges: [
            {
                param_id: '1',//TODO: como vai ficar?
                v1: '',
                v2: '',
                v3: ''
            }
        ]
    })

    const [possibleViews, setPossibleView] = useState({
        equivClassList: <EquivClassList methods={props.methods} showCreateContent={() => setCurrentView(possibleViews.newEquivClass)} />,
        newEquivClass: <EquivClassCreateOrUpdate methodsAvaliable={props.methods}/>
    });

    const [currentView, setCurrentView] = useState(possibleViews.equivClassList)

    return (
        <>
            {currentView}
        </>
    )
}