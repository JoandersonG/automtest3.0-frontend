import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { Parameter } from "../../models/Parameter";
import { BooleanRangeComponent, CharRangeComponent, DateRangeComponent, NumberRangeComponent } from "./RangeComponents";
import { DataRange } from "../../models/DataRange";
import { Text3 } from "@telefonica/mistica";
import { StringRangeComponent } from "./range/StringRange";

export default function ParametersRange(props: {paramsDataRange: DataRange[], parameters: Parameter[], setParamsDataRange: any}) {



    return (
        <div>
            <Text3 regular color="black">Set the expected data ranges for each of the method parameters below:</Text3>
            <div style={{marginTop: '16px'}}></div>
            {
                props.paramsDataRange.map(pRange => {
                    let parameter = props.parameters.find(param => param.identifier == pRange.param_id);
                    let type = parameter && parameter.type ? parameter.type : ''
                    let paramName = parameter ? parameter.name : ''
                    return <ParameterRange 
                                paramName={paramName}
                                type={type}
                                paramDataRange={pRange} 
                                setParamDataRange={(newP: DataRange) => props.setParamsDataRange((pdr: DataRange[]) => pdr.map(oldP => newP.param_id == oldP.param_id ? newP : oldP))}/>})
            }
        </div>
    )
    
}

function ParameterRange(props: {paramDataRange: DataRange, setParamDataRange: any, type: string, paramName: string}) {
        
    console.log('ParameterRange...paramsDataRange=', props.paramDataRange)
    

    const label = <Text3  regular color="black">Parameter <span style={{fontWeight: 'bold'}}>{props.paramName}({props.type})</span>. Set the range below:</Text3>
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
            {
                props.type.toLowerCase() === 'boolean'
                ? <BooleanRangeComponent label={label} range={props.paramDataRange} setRange={props.setParamDataRange} />
                : props.type.toLowerCase() === 'char'
                ? <CharRangeComponent label={label} range={props.paramDataRange} setRange={props.setParamDataRange} />
                : props.type.toLowerCase() === 'date'
                ? <DateRangeComponent label={label} range={props.paramDataRange} setRange={props.setParamDataRange} />
                : props.type.toLowerCase() === 'string'
                ? <StringRangeComponent
                    label={label}
                    range={props.paramDataRange} 
                    setRange={props.setParamDataRange}
                    addEmptyStringRange={() => props.setParamDataRange({...props.paramDataRange, v1: props.paramDataRange.v1 + '[]', v2: props.paramDataRange.v2 + '[]'})}
                    onRemove={(index: number) => props.setParamDataRange({...props.paramDataRange, v1: removeElementByIndex(props.paramDataRange.v1, index), v2: removeElementByIndex(props.paramDataRange.v2, index)})}
                />
                : (props.type.toLowerCase() === 'double' || props.type.toLowerCase() === 'float' || props.type.toLowerCase() === 'int')
                ? <NumberRangeComponent label={label} type={props.type.toUpperCase()} range={props.paramDataRange} setRange={props.setParamDataRange} />
                : <div></div>
            }
        </div>
    )
}