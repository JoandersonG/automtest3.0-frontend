import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Text3, Text5 } from "@telefonica/mistica"
import { buildTextField } from "../CustomComponents"
import { Method } from "../../models/Method"
import { useState } from "react"
import { EquivalenceClass } from "../../models/EquivalenceClass"
import { DataType, DataTypes } from "../../models/DataType"
import { DataRange } from "../../models/DataRange"

export default function EquivClassCreateOrUpdate(props: {methodsAvaliable: Method[], equivClass?: EquivalenceClass}) {

    const isCreate = props.equivClass ? true : false;

    const [selectedMethod, setSelectedMethod] = useState(isCreate ? '' : props.methodsAvaliable[0].name)
    const [equivClassName, setEquivClassName] = useState(props.equivClass ? props.equivClass.name : '')
    const [numberOfCases, setNumberOfCases] = useState(props.equivClass ? props.equivClass.numberOfCases: '')

    function getMethodsFromMethodList() {
        return props.methodsAvaliable.map(m => {return {value: m.name, text: m.name}})
    }
    return (
        <div>
            <Box
                sx={{
                height: 500,
                overflow: 'auto',
            }}
            >
                <Text5 color="black">{isCreate ? "Choose a method and specify an Equivalence Class for it:" : "Edit the Equivalence Class for the method:"}</Text5>
                <FormControl fullWidth style={{marginTop: '24px'}}>
    
                        <FormControl fullWidth style={{marginBottom: '12px'}}>
                            <InputLabel  id="demo-simple-select-label">Method related to this Equivalence Class*</InputLabel>
                            <Select
                                id="outlined-basic"
                                variant="outlined" 
                                value={selectedMethod}
                                label="Method related to this Equivalence Class*"
                                onChange={val => setSelectedMethod(val.target.value)}>
                                {
                                    getMethodsFromMethodList().map(v => <MenuItem value={v.value}>{v.text}</MenuItem>)
                                }
                            </Select>
                        </FormControl>     

                        {buildTextField("Equivalence class name*", equivClassName, (v: any) => setEquivClassName(v.target.value))}
                        {buildTextField("Number of test cases to be generated*", '' + numberOfCases, (v: any) => setNumberOfCases(v.target.value))}
                                
                        {/* Below: Return range for the equivalence class */}

                        <Text3 regular color="black">Below, design the pattern of the returning String:</Text3>
                        <HorizontalStringRangeScroll range={{}} />
                        <Grid container  spacing={1} marginTop={1} width={'98%'} marginLeft={1} style={{backgroundColor: 'lightgray', padding: '12px'}}>
                            {/* <div style={{color: 'black', marginLeft: '8px', marginTop: '0px', backgroundColor: 'lightgray', width: '120px', paddingLeft: '8px', borderRadius: '5px'}}>
                                <p>Type:</p>
                                <p>Content:</p>
                                <p>Quantity:</p>
                                <p>Move/Remove:</p>
                            </div> */}
                            {/* <Grid item justifyContent='center' style={{color: 'black', backgroundColor: 'purple'}}>
                            </Grid> */}
                            <Grid item xs={10.7} style={{backgroundColor: 'white', padding: '10px', borderRadius: '5px'}}>
                               
                                {/* <Grid container>
                                    <Grid item xs={12}>
                                        <StringRangeComponent />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <StringRangeComponent />
                                    </Grid>
                                </Grid> */}
                            </Grid>
                            {/* <Grid item xs={1} style={{backgroundColor: 'purple'}}>
                                <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '200px'}} onClick={() => 1}>Add more</Button>
                            </Grid> */}
                        </Grid>




                        {/* <Accordion 
                            elevation={0}
                            style={{
                                borderRadius: 5,
                                border: '1px solid #000',
                                backgroundColor: 'transparent',
                                marginTop: '12px',
                                minHeight: '55px'
                            }}>
                            <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel1-content">
                            Parameters
                            </AccordionSummary>
                            <AccordionDetails>
                            {
                                parameters.map(p => {
                                    return <ParameterComponent 
                                                nameField={p.name} 
                                                onChangeName={(newVal: any) => {
                                                    p.name = newVal
                                                    setParameters(parameters.map(param => param.identifier == p.identifier ? p : param))
                                                }}
                                                dataType={p.type ? DataType[p.type] : ''} 
                                                onChangeDataType={(newVal: any) => {
                                                    p.type = DataType[newVal as keyof typeof DataType]
                                                    setParameters(parameters.map(param => param.identifier == p.identifier ? p : param))
                                                }}
                                                onClickRemove={() => setParameters(parameters.filter(ip => ip.identifier != p.identifier))} />
                                })
                            }
                            <Button 
                                variant="outlined" 
                                color="success" 
                                disableElevation 
                                fullWidth
                                onClick={() => setParameters([...parameters, {identifier: uuidv1(), name: ''}])}
                                style={{height: '55px'}}>
                                    Add Parameter
                            </Button>
                            
                            </AccordionDetails>
                        </Accordion> */}

                </FormControl>
            </Box>
            <Grid container justifyContent="flex-end" spacing={1} marginTop={1}>
                <Grid item xs={2}>
                    <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '55px'}} onClick={() => 1}>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}

function StringRangeComponent(props: {type?: string, content?: string, from?: string, to?: string}) {

    const [type, setType] = useState(props.type ? props.type : '');
    const [content, setContent] = useState(props.content ? props.content : '')
    const [from, setFrom] = useState(props.from ? props.from : '')
    const [to, setTo] = useState(props.to ? props.to : '')

    return (
        <div style={{minWidth: '250px', maxWidth: '250px', marginRight: '16px', backgroundColor: 'white', borderRadius: '5px', padding: '12px'}}>
        <FormControl>                                    
                                    
        <FormControl fullWidth>                                    
            <InputLabel  id="demo-simple-select-label" style={{fontSize: '13px'}}>Type</InputLabel>
            <Select id="outlined-basic" variant="outlined" 
                value={type}
                label="Type"
                style={{height: '37px', marginBottom: '12px', fontSize: '12px'}}
                onChange={val => setType(val.target.value)}>
                {
                    DataTypes.map(v => <MenuItem value={v.value}>{v.text}</MenuItem>)
                }
            </Select>
        </FormControl>
        
        {buildTextField("Content", content, (v: any) => setContent(v.target.value), true)}
        
        <Grid container  spacing={0} width={'100%'} justifyContent={'space-between'} justifyItems={'center'}>
            <Grid item xs={5.8} width={'100%'} marginRight={'1px'}>
                {buildTextField("From", from, (v: any) => setFrom(v.target.value), true)}
            </Grid>
            <Grid item xs={5.8} marginLeft={'1px'}>
                {buildTextField("To", to, (v: any) => setTo(v.target.value), true)}
            </Grid>
        </Grid>

        <Grid container  spacing={0} width={'100%'} justifyContent={'space-between'} justifyItems={'center'}>
            <Grid item xs={3} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '37px', width: '100%'}} onClick={() => 1}>{'<'}</Button>
            </Grid>
            <Grid item xs={5} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="error" disableElevation fullWidth style={{height: '37px'}} onClick={() => 1}>{'Remove'}</Button>
            </Grid>
            <Grid item xs={3} width={'100%'} marginRight={'1px'}>
                <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '37px'}} onClick={() => 1}>{'>'}</Button>
            </Grid>
        </Grid>

    </FormControl>
        </div>
    )
}

let StringRangePieceType : any[] = []
StringRangePieceType.push({label: 'manually_specify', value: 'Manually specify'})
StringRangePieceType.push({label: 'any_character', value: 'Any character'})
StringRangePieceType.push({label: 'signs', value: 'Signs'})
StringRangePieceType.push({label: 'numbers', value: 'Numbers'})
StringRangePieceType.push({label: 'letters', value: 'Letters'})
StringRangePieceType.push({label: 'numbers_letters', value: 'Numbers/Letters'})

function HorizontalStringRangeScroll(props: {range: DataRange}) {
    function getRangeData() {
        //v1: [int][abc123][false]
        //v2: [1~2][3~4][1~1]
        
        if (!props.range.v1) <div></div>

        const content = props.range.v1.length > 2 ? props.range.v1.slice(1, -1).split('][') : [];
        const quantity = props.range.v2.length > 2 ? props.range.v2.slice(1, -1).split('][') : [];
        
        const result = []
        for (let i = 0; i < content.length; i++) {
            const contentPiece = content[i]
            const quantityPiece = quantity[i]

            const type = DataTypes.some(t => t.text == contentPiece) ? DataTypes.find(t => t.text == contentPiece) :  StringRangePieceType.find(t => t.label == contentPiece)
            const content_ = ''
            const from = ''
            const to = ''

            result.push(<StringRangeComponent type={type} content={content_} from={from} to={to} />)
        }

        return <div>ola</div>
    }

    return (
        <div style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '20px',
            width: '630px',
            marginTop: '12px',
            marginBottom: '12px',
            // backgroundColor: 'white',
            border: '1px solid lightgray',
            borderRadius: '5px',
            scrollbarWidth: 'thin', // This applies to Firefox
            msOverflowStyle: 'none',  // This applies to Internet Explorer 10+
            '&::-webkit-scrollbar': { // This applies to WebKit browsers like Chrome and Safari
              width: '8px',
              height: '8px'
            }
          }}>
            {
                getRangeData()
            }
            <StringRangeComponent />
            <StringRangeComponent />
            <StringRangeComponent />
            <StringRangeComponent />
            <StringRangeComponent />
            <StringRangeComponent />
            <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '200px'}} onClick={() => 1}>Add more</Button>
        </div>
    );
  }


// {
//     manually_specify: "Manually specify",
//     any_character: 'Any character',
//     signs: 'Signs',
//     numbers: 'Numbers',
//     letters: 'Letters',
//     numbers_letters: 'Numbers/Letters'
// }