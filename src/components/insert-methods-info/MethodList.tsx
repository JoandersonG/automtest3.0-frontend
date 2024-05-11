import { Stack, Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import MethodDetails from "./MethodDetails";
import { ContentType } from "./ContentType";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function MethodList(props: {
        methods: Method[], 
        removeMethod: (methodId: string) => void, 
        updateView: (newContent: ContentType, method?: Method) => void,
        showEquivClassesList: any,
    }) {

    const empty_methods = "Define the signatures of the methods your application will have:";
    const non_empty_methods = "Manage the signatures of each method and continue once you are done:";

    const [methods, setMethods] = useState<Method[]>([])

    useEffect(() => {
        if (props.methods) {
            console.log('MethodList.methods.useEffect', props.methods)
            setMethods(props.methods)
        }
    }, [props.methods])

    function onRemove(methodId: string) {
        setMethods(methods => methods.filter(m => m.identifier != methodId))
        props.removeMethod(methodId)
    }

    return (
        <div>
            <Stack space={12}>
                <Text5 color="black">{methods.length == 0 ? empty_methods : non_empty_methods}</Text5>
                <div style={{
                    height: '470px',
                    overflowY: 'auto',
                    // backgroundColor: 'red'
                }}>
                    {
                        methods?.map((method: Method) => <MethodDetails 
                                                                    method={method}
                                                                    onRemove={onRemove}
                                                                    onEdit={() => props.updateView(ContentType.NEW_METHOD, method)} />
                                        )
                    }
                    <Button 
                        variant="outlined" 
                        color="success" 
                        disableElevation 
                        style={{
                            width: '94%',
                            margin: '16px',
                            marginLeft: '17px',
                            marginTop: '0px'
                        }}
                        onClick={() => props.updateView(ContentType.NEW_METHOD)}>
                            Add a new method
                    </Button>
                </div>

                <BottomButtons showEquivClassesList={props.showEquivClassesList}/>
            </Stack>
        </div>
    )
}

function BottomButtons(props: {showEquivClassesList: any}) {
    return <div style={{
        marginInlineStart: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }}>
        <Button 
            variant="outlined" 
            color="secondary" 
            disableElevation 
            style={{
                width: '100px',
                marginTop: '8px',
                height: '55px'
            }}
            onClick={() => 1}>
                Go back
        </Button>
        <Button 
            variant="outlined" 
            color="primary" 
            disableElevation 
            style={{
                marginLeft: '16px',
                marginRight: '24px',
                height: '55px'
            }}
            onClick={props.showEquivClassesList}>
                Continue With Selected Methods
        </Button>
        
    </div>;
}
