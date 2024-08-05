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
import ValidationErrorSnackbar from "../ValidationErrorComponent"
import { StringDataRangePiece, StringRangePieceType } from "../../models/StringDataRange"


export default function EquivClassCreateOrUpdate(props: {methodsAvaliable: Method[], isCreate: boolean, setMethods: any, showEquivClassList: any, methodIndex?: number, equivClass?: EquivalenceClass}) {
    

    useEffect(() => {
        console.log('equivClass', props.equivClass)        
    }, [props.equivClass])
    const [currentMethod, setCurrentMethod] = useState(props.methodsAvaliable[props.methodIndex ? props.methodIndex : 0])
    const [currentMethodParams, setCurrentMethodParams] = useState(currentMethod.parameters);

    const [selectedMethodName, setSelectedMethodName] = useState(currentMethod.name)
    const [equivClassName, setEquivClassName] = useState(props.equivClass ? props.equivClass.name : '')
    const [numberOfCases, setNumberOfCases] = useState(props.equivClass ? ''+props.equivClass.numberOfCases: '')
    // const [returnValue, setReturnValue] = useState<DataRange>({v1: '[numbers][abc123]', v2: '[1~2][3~4]', v3: ''})
    const [returnValue, setReturnValue] = useState<DataRange>(props.equivClass ? props.equivClass.expectedOutputRange : {v1: '', v2: '', v3: ''})
    const [paramsDataRange, setParamsDataRange] = useState<DataRange[]>(
        props.equivClass ? props.equivClass.acceptableParamRanges : currentMethod.parameters.map(p => { return {param_id: p.identifier, v1: '', v2: '', v3: ''}})
    );

    const [showValidationError, setShowValidationError] = useState(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState('');


    useEffect(() => {
        setCurrentMethodParams(currentMethod.parameters);
        if (!props.equivClass) {
            setParamsDataRange(currentMethod.parameters.map(p => { return {param_id: p.identifier, v1: '', v2: '', v3: ''}}));
        }
    }, [currentMethod])

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

    function validateString(range: DataRange) {
        
        if (!range.v1) return false;

        const content = range.v1.length > 2 ? range.v1.slice(1, -1).split('][') : [];
        const quantity = range.v2.length > 2 ? range.v2.slice(1, -1).split('][') : [];

        if (content.length == 0 || content.length != quantity.length) {
            return false;
        }
        
        for (let i = 0; i < content.length; i++) {
            const contentPiece = content[i]
            const quantityPiece = quantity[i]

            const type : any = StringRangePieceType.some(t => t.value == contentPiece) ? StringRangePieceType.find(t => t.value == contentPiece) :  StringRangePieceType.find(t => t.value == 'manually_specify')
            const content_ = type?.value == 'manually_specify' ? contentPiece : ''
            const from = quantityPiece.split('~')[0]
            const to = quantityPiece.split('~')[1]
            
            if ((type?.value == 'manually_specify' && content_ == '') 
                || !type
                || type.value == ''
                || from == '' 
                || to == '' 
                ||  !(/^[0-9]+$/.test(from)) 
                || parseInt(from) <= 0
                ||  !(/^[0-9]+$/.test(to)) 
                || parseInt(to) <= 0
                || parseInt(to) < parseInt(from)
            ) {
                return false;
            }
        }
        return true;
    }

    function validateParameters() {
        
        for (let i = 0; i < paramsDataRange.length; i++) {
            const paramDataRange = paramsDataRange[i];
            const param = currentMethod.parameters.find(p => p.identifier == paramDataRange.param_id);
            const type = param?.type;
            const paramName = param?.name;
            if (type == 'boolean' && !(paramDataRange.v1.toLowerCase() == 'true' || paramDataRange.v1.toLowerCase() == 'false')) {
                             
                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            } else if (type == 'char' && !(/^(.(;.)*)$/.test(paramDataRange.v1))) {

                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            } else if (type == 'date' 
                        && !(
                                /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(paramDataRange.v1)
                                && /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(paramDataRange.v2)
                                && /^([0-9]{2}-[0-9]{2}-[0-9]{4})*$/.test(paramDataRange.v3)
                            )
            ) {

                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            } else if ((type == 'double' || type == 'float')
                        && !(
                                /^[0-9]+(\.[0-9]+){0,1}$/.test(paramDataRange.v1)
                                && /^[0-9]+(\.[0-9]+){0,1}$/.test(paramDataRange.v2)
                                && /^[0-9]+(\.[0-9]+){0,1}|(([0-9]+(\.[0-9]+){0,1}){0,1}(;[0-9]+(\.[0-9]+){0,1})*)$/.test(paramDataRange.v3)
                                && parseFloat(paramDataRange.v1) <= parseFloat(paramDataRange.v2)
                            )
            ) {
                
                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            } else if (type == 'int'
                        && !(
                                /^[0-9]+$/.test(paramDataRange.v1)
                                && /^[0-9]+$/.test(paramDataRange.v2)
                                && /^([0-9]+(;[0-9]+)*){0,1}$/.test(paramDataRange.v3)
                                && parseInt(paramDataRange.v1) <= parseInt(paramDataRange.v2)
                            )
            ) {

                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            } else if (type == 'string' && !validateString(paramDataRange)) {
                
                setShowValidationError(true);
                setValidationErrorMsg('Please provide valid parameter "' + paramName + '"');
                return false;

            }
        }
        return true;
    }

    return (
        <div>
            <ValidationErrorSnackbar open={showValidationError} message={validationErrorMsg} changeOpenState={() => setShowValidationError(!showValidationError)} />
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
                        {buildTextField("Number of test cases to be generated (for each parameter)*", '' + numberOfCases, (v: any) => setNumberOfCases(v.target.value))}
                        {showReturnComponent()}

                        <ParametersRange parameters={currentMethodParams} paramsDataRange={paramsDataRange} setParamsDataRange={setParamsDataRange} />

                </FormControl>
            </Box>
            <Grid container justifyContent="flex-end" spacing={1} marginTop={1}>
                <Grid item xs={2}>
                    <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={() => props.showEquivClassList()}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '55px'}} 
                        onClick={() => {
                            
                            if (!(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(equivClassName))) {

                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid class name');

                            } else if (!(/^[0-9]+$/.test(numberOfCases)) || parseInt(numberOfCases) <= 0) {

                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid number of test cases to be generated');

                            } else if (currentMethod.returnType.toLowerCase() == 'boolean' && !(returnValue.v1.toLowerCase() == 'true' || returnValue.v1.toLowerCase() == 'false')) {
                             
                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if (currentMethod.returnType.toLowerCase() == 'char' && !(/^(.(;.)*)$/.test(returnValue.v1))) {
                                console.log('char validation', returnValue.v1)
                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if (currentMethod.returnType.toLowerCase() == 'date' 
                                        && !(
                                                /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(returnValue.v1)
                                                && /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(returnValue.v2)
                                                && /^([0-9]{2}-[0-9]{2}-[0-9]{4})*$/.test(returnValue.v3)
                                            )
                            ) {

                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if ((currentMethod.returnType.toLowerCase() == 'double' || currentMethod.returnType.toLowerCase() == 'float')
                                        && !(
                                                /^(-){0,1}[0-9]+(\.[0-9]+){0,1}$/.test(returnValue.v1)
                                                && /^(-){0,1}[0-9]+(\.[0-9]+){0,1}$/.test(returnValue.v2)
                                                && /^((-){0,1}[0-9]+(\.[0-9]+){0,1}(;(-){0,1}[0-9]+(\.[0-9]+){0,1})*){0,1}$/.test(returnValue.v3)
                                                && parseFloat(returnValue.v1) <= parseFloat(returnValue.v2)
                                            )
                            ) {
                                
                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if (currentMethod.returnType.toLowerCase().includes('int')
                                        && !(
                                                /^(-){0,1}[0-9]+$/.test(returnValue.v1)
                                                && /^(-){0,1}[0-9]+$/.test(returnValue.v2)
                                                && /^((-){0,1}[0-9]+(;(-){0,1}[0-9]+)*){0,1}$/.test(returnValue.v3)
                                                && parseInt(returnValue.v1) <= parseInt(returnValue.v2)
                                            )
                            ) {

                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if (currentMethod.returnType.toLowerCase() == 'string' && !validateString(returnValue)) {
                                
                                setShowValidationError(true);
                                setValidationErrorMsg('Please provide a valid return');
                            
                            } else if (!validateParameters()) {
                            
                            } else {

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
                            }
                        }}>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}
