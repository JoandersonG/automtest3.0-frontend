import { ButtonDanger, ButtonPrimary, ButtonSecondary, Stack, Text3, Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";


export default function MethodsList(props: {methods: Method[]}) {
    
    return (
        <Stack space={12}>
            <Text5 color="white">Edit/provide the extra data required for each method:</Text5>
            <div style={{
                    height: '400px',
                    width: '670px',
                    overflowY: 'auto',
                    // backgroundColor: 'red'
                }}>
                    {props.methods?.map((m) => <MethodListEntry method={m}/>)}
                    <ButtonPrimary onPress={() => console.log('add new method')}>Add a new method</ButtonPrimary>
            </div>
            <BottomButtons />
        </Stack>
    )
}

function MethodListEntry(props: {method: Method}) {
    return (
        <div style={{
            paddingInlineEnd: '0px',
            // backgroundColor: 'blue',
            width: '98%',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={{
                width: '482px',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '12px',
                paddingTop: '0px',
                margin: '8px',
            }}>
                <Text3 regular color="black"> <span style={{ fontWeight: 'bold' }}>Method:</span> {props.method.name}</Text3>
            </div>
            <ButtonPrimary small onPress={() => console.log('edit')}>Edit</ButtonPrimary>
            <ButtonDanger  style={{
                    marginLeft: '8px',
                    // marginRight: '24px'
                }}
                small 
                onPress={() => console.log('remove method')}
            >
                Remove
            </ButtonDanger>

        </div>
    );
}

function BottomButtons() {
    return <div style={{
        marginInlineStart: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }}>
        <ButtonSecondary onPress={() => console.log('go back')}>
            Go Back
        </ButtonSecondary>
        <ButtonPrimary
            style={{
                //  width: 300,
                marginLeft: '16px',
                marginRight: '24px'
            }}
            onPress={() => console.log('submit story')}
        >
            Continue
        </ButtonPrimary>
    </div>;
}
