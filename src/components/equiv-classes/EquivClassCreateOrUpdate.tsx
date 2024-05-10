import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import { Text5 } from "@telefonica/mistica"
import { buildTextField } from "../CustomComponents"
import { Method } from "../../models/Method"
import { useEffect, useState } from "react"
import { EquivalenceClass } from "../../models/EquivalenceClass"
import { DataRange } from "../../models/DataRange"
import { v1 as uuidv1 } from 'uuid';
import { BooleanRangeComponent, CharRangeComponent, DateRangeComponent, NumberRangeComponent } from "./RangeComponents"
import ParametersRange from "./ParametersRange"
import { StringRangeComponent } from "./range/StringRange"


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
    const [paramsDataRange, setParamsDataRange] = useState<DataRange[]>(
        props.equivClass ? props.equivClass.acceptableParamRanges : currentMethod.parameters.map(p => { return {param_id: p.identifier, v1: '', v2: '', v3: ''}})
    );

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

    function showReturnComponent() {
        if (currentMethod.returnType.toLowerCase() == 'boolean') {
            return <BooleanRangeComponent range={returnValue} setRange={setReturnValue} />
        }
        if (currentMethod.returnType.toLowerCase() == 'char') {
            return <CharRangeComponent range={returnValue} setRange={setReturnValue} />
        }
        if (currentMethod.returnType.toLowerCase() == 'date') {
            return <DateRangeComponent range={returnValue} setRange={setReturnValue} />
        }
        if (currentMethod.returnType.toLowerCase() == 'string') {
            return <StringRangeComponent 
                range={returnValue} 
                setRange={setReturnValue}
                addEmptyStringRange={() => setReturnValue({...returnValue, v1: returnValue.v1 + '[]', v2: returnValue.v2 + '[]'})}
                onRemove={(index: number) => setReturnValue({...returnValue, v1: removeElementByIndex(returnValue.v1, index), v2: removeElementByIndex(returnValue.v2, index)})}
            /> 
        }
        if (currentMethod.returnType.toLowerCase() == 'double' 
                || currentMethod.returnType.toLowerCase() == 'float' 
                || currentMethod.returnType.toLowerCase() == 'int') {
                    return <NumberRangeComponent type={currentMethod.returnType.toUpperCase()} range={returnValue} setRange={setReturnValue} />
                }
        return <div></div>
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
                                // onChange={val => setSelectedMethodName(val.target.value)}>
                                onChange={val => {
                                        const method = props.methodsAvaliable.find(m => m.name == val.target.value);
                                        if (method) {
                                            setSelectedMethodName(val.target.value)
                                            setCurrentMethod(method)
                                        } else {
                                            console.warn('Method not found in list of avaliable methods: ' + val.target.value)
                                        }
                                    }}>
                                {
                                    getMethodsFromMethodList().map(v => <MenuItem value={v.value}>{v.text}</MenuItem>)
                                }
                            </Select>
                        </FormControl>     

                        {buildTextField("Equivalence class name*", equivClassName, (v: any) => setEquivClassName(v.target.value))}
                        {buildTextField("Number of test cases to be generated*", '' + numberOfCases, (v: any) => setNumberOfCases(v.target.value))}
                        {showReturnComponent()}

                        <ParametersRange parameters={currentMethod.parameters} paramsDataRange={paramsDataRange} setParamsDataRange={setParamsDataRange} />

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
                                acceptableParamRanges: paramsDataRange
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
