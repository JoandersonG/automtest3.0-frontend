import { ButtonPrimary, Stack, Text3 } from "@telefonica/mistica";

export enum MenuButton {
    ABOUT = 'About AutomTest',
    USER_STORY = 'Insert User Story',
    METHOD_INFO = 'Insert Methods Info',
    EQUIVALENCE_CLASS = 'Insert Equivalence Classes',
    GENERATE_TEST = 'Generate Tests'
}

export type MenuButtonState = {
    menuButton: MenuButton,
    enabled: boolean,
    isCurrentlyActive: boolean,
    page: any
}



export default function ApplicationMenu(props: {buttonsState: MenuButtonState[], selectButton: (bt: MenuButton) => void}) {

    console.log('buttonsState', props.buttonsState)

    const selectedButtonColor = '#173f5f'
    const unselectedButtonColor = '#20689b'

    function menuButton(buttonState: MenuButtonState) {
        return (<ButtonPrimary 
                    style={{
                        width: 250,
                        display: 'flex', 
                        justifyContent: 'center',  
                        alignItems: 'center',
                        minHeight: '80px',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: buttonState.isCurrentlyActive ? selectedButtonColor : unselectedButtonColor
                    }} 
                    onPress={() => props.selectButton(buttonState.menuButton)}
                    disabled={!buttonState.enabled}
                    >
                        {buttonState.menuButton}
                </ButtonPrimary>)
    }

    return(
        <>
        <div>
            <Stack space={40}>
                {
                    props.buttonsState?.map((state: MenuButtonState) => {
                        return (
                            <>
                            {menuButton(state)}
                            </>
                        )
                    })
                }
            </Stack>
        </div>
        </>
    )
}