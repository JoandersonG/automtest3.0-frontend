import { Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Parameter } from "../../models/Parameter";
import { v1 as uuidv1 } from 'uuid';
import { DataTypes } from "../../models/DataType";
import { buildTextField } from "../CustomComponents";
import ValidationErrorSnackbar from "../ValidationErrorComponent";

export default function MethodCreateOrUpdate(props: {method?: Method, updateMethod : (updatedMethod: Method) => void, onClose: () => void}) {

    console.log('MethodCreateOrUpdate.method:', props.method)

    const [packageName, setPackageName] = useState(props.method ? props.method.packageName : '');
    const [className, setClassName] = useState(props.method ? props.method.className : '');
    const [methodName, setMethodName] = useState(props.method ? props.method.name : '');
    const [returnType, setReturnType] = useState(props.method ? props.method.returnType : '');
    const [parameters, setParameters] = useState<Parameter[]>(props.method ? props.method.parameters : [])    

    const [showValidationError, setShowValidationError] = useState(false);
    const [validationErrorMsg, setValidationErrorMsg] = useState('');

    function onSubmit() {
        if (
            !className 
            || className == ''
            ||  !(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(className))
        ) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide a valid class name')
        }else if (
            !methodName 
            || methodName == ''
            ||  !(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(methodName))
        ) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide a valid method name')
        } else if (
            !returnType 
            || returnType == ''
        ) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide a valid return type')
        } else if (
            parameters.length == 0
        ) {
            setShowValidationError(true);
            setValidationErrorMsg('Please provide parameters for the method')
        } else {

            const invalidParam = parameters.find(p => !(/^[a-zA-Z_][a-zA-Z0-9_]+$/.test(p.name)) || !p.type)
            if (invalidParam) {
                setShowValidationError(true);
                setValidationErrorMsg('Please correct the parameter ' + invalidParam.name + '(' + invalidParam.type + ')')
                return;
            }
            

            //End of validation

            const updatedMethod: Method = {
                identifier: props.method ? props.method.identifier : uuidv1(),
                packageName: packageName,
                name: methodName,
                returnType: returnType,
                parameters: parameters,
                className: className,
                equivClasses: props.method ? props.method.equivClasses : []
            }
            props.updateMethod(updatedMethod)
            props.onClose()
        }
    }

    return (
        <div>
            <ValidationErrorSnackbar open={showValidationError} message={validationErrorMsg} changeOpenState={() => setShowValidationError(!showValidationError)} />
            <Box
                sx={{
                height: 500,
                overflow: 'auto',
            }}
            >
                <Text5 color="black">{props.method ? "Update the method definition:" : "Create a method definition:"}</Text5>
                <FormControl fullWidth style={{marginTop: '24px'}}>
    
                        {buildTextField("Package name", packageName ? packageName : '', (v: any) => setPackageName(v.target.value))}
                        {buildTextField("Class name*", className, (v: any) => setClassName(v.target.value))}
                        {buildTextField("Method name*", methodName, (v: any) => setMethodName(v.target.value))}
                    
                        <FormControl fullWidth>
                            <InputLabel  id="demo-simple-select-label">Return type*</InputLabel>
                            <Select
                                id="outlined-basic"
                                variant="outlined" 
                                value={returnType}
                                label="Return type*"                    
                                onChange={val => setReturnType(val.target.value)}>
                                {
                                    DataTypes.map((rt, index) => {
                                        return <MenuItem value={rt.value}>{rt.text}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>     

                        <Accordion 
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
                                                dataType={p.type} 
                                                onChangeDataType={(newVal: any) => {
                                                    p.type = newVal
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
                        </Accordion>   


                </FormControl>
            </Box>
            <Grid container justifyContent="flex-end" spacing={1} marginTop={1}>
                <Grid item xs={2}>
                    <Button variant="outlined" color="secondary" disableElevation fullWidth style={{height: '55px'}} onClick={props.onClose}>Go back</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" color="primary" disableElevation fullWidth style={{height: '55px'}} onClick={onSubmit}>Save</Button>
                </Grid>
            </Grid>
        </div>
    )
}



function ParameterComponent(props: {nameField: string, onChangeName: any, dataType?: string, onChangeDataType: any, onClickRemove: any}) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                {buildTextField("Name", props.nameField,  (v: any) => props.onChangeName(v.target.value))}
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel  id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        id="outlined-basic"
                        variant="outlined" 
                        value={props.dataType}
                        label="Type"                    
                        onChange={val => props.onChangeDataType(val.target.value)}>
                        {
                            DataTypes.map((rt : any, index: number) => {
                                return <MenuItem value={rt.value}>{rt.text}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" color="error" disableElevation fullWidth style={{height: '55px'}} onClick={props.onClickRemove}>Remove</Button>
            </Grid>
        </Grid>
    )
}