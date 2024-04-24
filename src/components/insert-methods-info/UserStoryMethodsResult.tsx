import { ButtonPrimary, ButtonSecondary, Stack, Text5 } from "@telefonica/mistica";
import { Method } from "../../models/Method";
import MethodGenerationResult from "./MethodGenerationResult";
import { ContentType } from "./ContentType";

export default function UserStoryMethodsResult(props: {methods: Method[], updateView: (newContent: ContentType) => void}) {
    const empty_methods = "Define the signatures of the methods your application will have:";
    const non_empty_methods = "Manage the signatures of each method and continue once you are done:";
    return (
        <div>
            <Stack space={12}>
                <Text5 color="white">{props.methods.length == 0 ? empty_methods : non_empty_methods}</Text5>
                <div style={{
                    height: '470px',
                    overflowY: 'auto',
                    // backgroundColor: 'red'
                }}>
                   { props.methods?.map((method: Method) => <MethodGenerationResult method={method} />) }
                   <ButtonPrimary 
                        style={{
                            width: '95%',
                            margin: '16px',
                            marginTop: '0px'
                        }}
                        onPress={() => props.updateView(ContentType.NEW_METHOD)}
                    >
                        Add a new method
                    </ButtonPrimary>
                </div>

                <BottomButtons />
            </Stack>
        </div>
    )
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
            Continue With Selected Methods
        </ButtonPrimary>
    </div>;
}
