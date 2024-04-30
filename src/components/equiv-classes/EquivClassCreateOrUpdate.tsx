import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Text3, Text5 } from "@telefonica/mistica"
import { buildTextField } from "../CustomComponents"
import { Method } from "../../models/Method"
import { useEffect, useState } from "react"
import { EquivalenceClass } from "../../models/EquivalenceClass"
import { DataType, DataTypes } from "../../models/DataType"
import { DataRange } from "../../models/DataRange"
import { StringDataRange, StringDataRangePiece, StringRangePieceType } from "../../models/StringDataRange"
import { v1 as uuidv1 } from 'uuid';

export default function EquivClassCreateOrUpdate(props: {methodsAvaliable: Method[], isCreate: boolean, setMethods: any, showEquivClassList: any, methodIndex?: number, equivClass?: EquivalenceClass}) {

    useEffect(() => {
        console.log('equivClass', props.equivClass)        
    }, [props.equivClass])
    const [currentMethod, setCurrentMethod] = useState(props.methodsAvaliable[props.methodIndex ? props.methodIndex : 0])

    const [selectedMethodName, setSelectedMethodName] = useState(currentMethod.name)
    const [equivClassName, setEquivClassName] = useState(props.equivClass ? props.equivClass.name : '')
    const [numberOfCases, setNumberOfCases] = useState(props.equivClass ? props.equivClass.numberOfCases: '')
    // const [returnValue, setReturnValue] = useState<DataRange>({v1: '[numbers][abc123]', v2: '[1~2][3~4]', v3: ''})
    const [returnValue, setReturnValue] = useState<DataRange>(props.equivClass ? props.equivClass.expectedOutputRange : {v1: '', v2: '', v3: ''})

    useEffect(() => {
        console.log('updatedReturnValue=', returnValue)
    }, [returnValue])

    function getMethodsFromMethodList() {
        return props.methodsAvaliable.map(m => {return {value: m.name, text: m.name}})
    }

    function removeElementByIndex(input: string, index: number): string {
        console.log({input, index})
        const elements = input.match(/\[[^\]]*\]/g);
      
        if (!elements || index < 0 || index >= elements.length) {
          return input;
        }
      
        elements.splice(index, 1);
        console.log(elements)
        return elements.join('');
      }

    return (
        <div>
            <Box
                sx={{
                height: 500,
                overflow: 'auto',
                paddingRight: '16px'
            }}
            >
                <Text5 color="black">{props.isCreate ? "Choose a method and specify an Equivalence Class for it:" : "Edit the Equivalence Class for the method:"}</Text5>
                <FormControl fullWidth style={{marginTop: '24px'}}>
    
                        <FormControl fullWidth style={{marginBottom: '12px'}}>
                            <InputLabel  id="demo-simple-select-label">Method related to this Equivalence Class*</InputLabel>
                            <Select
                                id="outlined-basic"
                                variant="outlined" 
                                value={selectedMethodName}
                                disabled={!props.isCreate}
                                label="Method related to this Equivalence Class*"
                                onChange={val => setSelectedMethodName(val.target.value)}>
                                {
                                    getMethodsFromMethodList().map(v => <MenuItem value={v.value}>{v.text}</MenuItem>)
                                }
                            </Select>
                        </FormControl>     

                        {buildTextField("Equivalence class name*", equivClassName, (v: any) => setEquivClassName(v.target.value))}
                        {buildTextField("Number of test cases to be generated*", '' + numberOfCases, (v: any) => setNumberOfCases(v.target.value))}
                                
                        {/* Below: Return range for the equivalence class */}
                        
                        <Box style={{
                            // backgroundColor: 'red',
                            marginTop: '16px',
                            marginBottom: '12px',
                            paddingTop: '16px',
                            // backgroundColor: 'white',
                            border: '1px solid lightgray',
                            borderRadius: '5px', }}
                        >
                            <div style={{marginLeft: '12px'}}><Text3  regular color="black">Below, design the pattern of the returning String:</Text3></div>

                            <HorizontalStringRangeScroll 
                                range={returnValue} 
                                setRange={setReturnValue}
                                addEmptyStringRange={() => setReturnValue({...returnValue, v1: returnValue.v1 + '[]', v2: returnValue.v2 + '[]'})}
                                onRemove={(index: number) => setReturnValue({...returnValue, v1: removeElementByIndex(returnValue.v1, index), v2: removeElementByIndex(returnValue.v2, index)})}
                            />

                        </Box>
                </FormControl>
            </Box>
            <Grid container justifyContent="flex-end" spacing={1} marginTop={1}>
                <Grid item xs={2}>
                    <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={() => props.showEquivClassList()}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '55px'}} 
                        onClick={() => {
                            
                            //TODO: validações

                            const updatedEquivClass : EquivalenceClass = {
                                identifier: props.equivClass ? props.equivClass.identifier : uuidv1(),
                                name: equivClassName,
                                numberOfCases: parseInt('' + numberOfCases),
                                expectedOutputRange: returnValue,
                                acceptableParamRanges: []//TODO: to be implemented
                            }
                            
                            
                            //console.log('saving:', updatedEquivClass)
                            
                            //const currentMethodIndex = props.methodIndex ? props.methodIndex : props.methodsAvaliable.findIndex(m => m.name == selectedMethodName)
                            props.setMethods((methods: Method[]) => methods.map(m => {
                                if (m.name == selectedMethodName) {
                                    if (props.isCreate) {
                                        m.equivClasses.push(updatedEquivClass)
                                    } else {
                                        m.equivClasses = m.equivClasses.map(ec => ec.identifier == updatedEquivClass.identifier ? updatedEquivClass : ec)
                                    }
                                }
                                return m
                            }))

                            console.log('updatedMethodList=', props.methodsAvaliable)

                            props.showEquivClassList()
                        }}>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}

function StringRangeComponent(props: { onRemove: any, piece: StringDataRangePiece, updatePiece: any, moveRight: any, moveLeft: any}) {

    // const [type, setType] = useState(props.type ? props.type : '');
    // const [content, setContent] = useState(props.content ? props.content : '')
    // const [from, setFrom] = useState(props.from ? props.from : '')
    // const [to, setTo] = useState(props.to ? props.to : '')
    //console.log('type is=', type)

    // function updatePiece() {
    //     props.updatePiece({...props.piece, content: v.target.value})
    // }

    console.log('piece', props.piece)

    return (
        <div style={{minWidth: '250px', maxWidth: '250px', marginRight: '16px', backgroundColor: 'transparent', border: '1px solid gray', borderRadius: '5px', padding: '12px'}}>
        <FormControl>                                    
                                    
        <FormControl fullWidth>                                    
            <InputLabel  id="demo-simple-select-label" style={{fontSize: '13px'}}>Type</InputLabel>
            <Select id="outlined-basic" variant="outlined" 
                value={props.piece.type.value}
                label="Type"
                style={{height: '37px', marginBottom: '12px', fontSize: '12px'}}
                // onChange={val => setType(val.target.value)}>
                onChange={val => {
                        //console.log('valToUpdatePiece', val)
                        const updatedType = StringRangePieceType.find(srt => srt.value == val.target.value)
                        props.updatePiece({...props.piece, type: updatedType})
                        return val.target.value
                    }}>
                {
                    StringRangePieceType.map(v => <MenuItem value={v.value}>{v.text}</MenuItem>)
                }
            </Select>
        </FormControl>
        
        {
            props.piece.type.value == 'manually_specify' ?
                buildTextField("Content", props.piece.content, (v: any) => props.updatePiece({...props.piece, content: v.target.value}), true)
                :
            <div style={{height: '50px'}}></div>
        }
        {/* {buildTextField("Content", props.piece.content, (v: any) => props.updatePiece({...props.piece, content: v.target.value}), true, props.piece.type.value != 'manually_specify')} */}
        
        <Grid container  spacing={0} width={'100%'} justifyContent={'space-between'} justifyItems={'center'}>
            <Grid item xs={5.8} width={'100%'} marginRight={'1px'}>
                {buildTextField("From", props.piece.from, (v: any) => props.updatePiece({...props.piece, from: v.target.value}), true)}
            </Grid>
            <Grid item xs={5.8} marginLeft={'1px'}>
                {buildTextField("To", props.piece.to, (v: any) => props.updatePiece({...props.piece, to: v.target.value}), true)}
            </Grid>
        </Grid>

        <Grid container  spacing={0} width={'100%'} justifyContent={'space-between'} justifyItems={'center'}>
            <Grid item xs={3} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '37px', width: '100%'}} onClick={props.moveLeft}>{'<'}</Button>
            </Grid>
            <Grid item xs={5} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="error" disableElevation fullWidth style={{height: '37px'}} onClick={props.onRemove}>{'Remove'}</Button>
            </Grid>
            <Grid item xs={3} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '37px'}} onClick={props.moveRight}>{'>'}</Button>
            </Grid>
        </Grid>

    </FormControl>
        </div>
    )
}

function HorizontalStringRangeScroll(props: {range: DataRange, setRange: any, addEmptyStringRange: any, onRemove: any}) {

    const [pieces, setPieces] = useState(getRangeData(props.range).pieces);

    function updatePieces(data: any) {
        //console.log('updatePieces.data', data)
        const convertedPieces = data.map((p: any) => {
            let content : string = p.type.value == 'manually_specify' ? p.content : p.type.value;
            content = '[' + content + ']'
            const quantity = '[' + p.from + '~' + p.to + ']'
            console.log('data.map.item', {content: content, quantity: quantity})
            return {content: content, quantity: quantity}
        })
        const completeContent = convertedPieces.map((cp: any) => cp.content).join('')
        const completeQuantities = convertedPieces.map((cp: any) => cp.quantity).join('')

        //console.log('completeContent', completeContent)
        props.setRange({
            param_id: props.range.param_id,
            v1: completeContent,
            v2: completeQuantities,
            v3: ''
        })

        setPieces(data)
    }

    function getRangeData(range: DataRange) {
        //v1: [int][abc123][false]
        //v2: [1~2][3~4][1~1]
        // console.log('props.HorizontalStringRangeScroll=', props.range)
        
        if (!props.range.v1) <div></div>

        const content = props.range.v1.length > 2 ? props.range.v1.slice(1, -1).split('][') : [];
        const quantity = props.range.v2.length > 2 ? props.range.v2.slice(1, -1).split('][') : [];
        
        // console.log('content.HorizontalStringRangeScroll=', content)
        const pieces : StringDataRangePiece[] = []
        for (let i = 0; i < content.length; i++) {
            const contentPiece = content[i]
            const quantityPiece = quantity[i]

            const type : any = StringRangePieceType.some(t => t.value == contentPiece) ? StringRangePieceType.find(t => t.value == contentPiece) :  StringRangePieceType.find(t => t.value == 'manually_specify')
            const content_ = type?.value == 'manually_specify' ? contentPiece : ''
            const from = quantityPiece.split('~')[0]
            const to = quantityPiece.split('~')[1]
            
            pieces.push({
                id: uuidv1(),
                type: type,
                content: content_,
                from: from,
                to: to
            })

        }
        return {pieces: pieces}
    }

    function moveElementLeft<T>(arr: T[], index: number): T[] {
        
        const arrCopy = JSON.parse(JSON.stringify(arr));

        if (index > 0 && index < arrCopy.length) {
            // Swap the element with the one before it
            [arrCopy[index - 1], arrCopy[index]] = [arrCopy[index], arrCopy[index - 1]];
            console.log('tmoveElementLeft=', index, arrCopy)
        } else {
            console.log('fmoveElementLeft=', index, arrCopy)
        }
        return arrCopy;
    }

    function moveElementRight<T>(arr: T[], index: number): T[] {

        const arrCopy = JSON.parse(JSON.stringify(arr));

        if (index >= 0 && index < arrCopy.length - 1) {
            // Swap the element with the one after it
            [arrCopy[index], arrCopy[index + 1]] = [arrCopy[index + 1], arrCopy[index]];
            console.log('tmoveElementRight=', index, arrCopy)
        } else {
            console.log('fmoveElementRight=', index, arrCopy)
        }
        return arrCopy;
    }

    return (
        <div style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '16px',
            width: '630px',
            // marginTop: '16px',
            marginBottom: '12px',
            // backgroundColor: 'white',
            // border: '1px solid lightgray',
            // borderRadius: '5px',
            scrollbarWidth: 'thin', // This applies to Firefox
            msOverflowStyle: 'none',  // This applies to Internet Explorer 10+
            // '&::-webkit-scrollbar': { // This applies to WebKit browsers like Chrome and Safari
            // '&::WebkitScrollbar': {
            //   width: '8px',
            //   height: '8px'
            // }
          }}>
            {
                pieces.map((p: StringDataRangePiece) => 
                                        <StringRangeComponent 
                                                onRemove={() => updatePieces(pieces.filter(inner_p => inner_p.id != p.id))}
                                                piece={p}
                                                updatePiece={(updated: any) => {
                                                    console.log('updatedPiece:', updated)
                                                    updatePieces(pieces.map(p_ => p_.id == updated.id ? updated : p_))
                                                }}
                                                moveLeft={() => updatePieces(moveElementLeft(pieces, pieces.findIndex(p_ => p.id == p_.id)))}
                                                moveRight={() => updatePieces(moveElementRight(pieces, pieces.findIndex(p_ => p.id == p_.id)))}
                                                />)
            }
            <div style={{width: '100%'}}></div>

            <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '213px', maxWidth: '50px'}} 
                onClick={() => updatePieces([...pieces, {id: uuidv1(), type: '', content: '', from: '', to: ''}])}>Add more</Button>
        </div>
    );
  }