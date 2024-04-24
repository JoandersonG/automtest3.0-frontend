import { ButtonDanger, ButtonPrimary, Checkbox, Stack, Text2, Text3 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import { useState } from "react";
import { Parameter, parameterToString } from "../../models/Parameter";

export default function MethodGenerationResult(props: {method: Method}) {

    const [checked, setChecked] = useState(false);

    return (
        <div style={{
            padding: '12px',
            paddingTop: '0px',
            display: 'flex',
            width: '96%',
            alignItems: 'center'
            }}>
                <div style={{
                        backgroundColor: 'white',
                        padding: '12px',
                        borderRadius: '10px',
                        margin: '8px',
                        marginRight: '8px',
                        display: 'flex',
                        width: '100%',
                        // cursor: 'pointer'
                    }}
                    onClick={() => setChecked(!checked)}
                >
                    <Stack space={2}>
                        <Text3 regular color="black"> <span style={{ fontWeight: 'bold' }}>Class:</span> {props.method.className}</Text3>
                        <Text3 regular color="black"> <span style={{ fontWeight: 'bold' }}>Method:</span> {props.method.name}</Text3>
                        <Text3 regular color="black"> <span style={{ fontWeight: 'bold' }}>Parameters:</span> {buildParamString(props.method.parameters)}</Text3>
                        <Text3 regular color="black"> <span style={{ fontWeight: 'bold' }}>Return type:</span> {props.method.returnType}</Text3>
                    </Stack>
                </div>
                <Stack space={12}>
                    <ButtonPrimary onPress={() => console.log('edit')}>Edit</ButtonPrimary>
                    <ButtonDanger onPress={() => console.log('remove method')}>Remove</ButtonDanger>
                </Stack>
        </div>
    )
}

function buildParamString(parameters: Parameter[]) {
    return parameters?.map((p) => parameterToString(p)).join(', ')
}