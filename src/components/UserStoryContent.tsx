import { ButtonPrimary, RadioButton, RadioGroup, ResponsiveLayout, Stack, Text2, Text3, Text4, Text5, TextField } from "@telefonica/mistica";
import { useState } from "react";

export default function UserStoryContent() {

    const [userStory, setUserStory] = useState('');
    const [language, setLanguage] = useState('PT');
    
    return (
        <div style={{width: '100%', color: 'white'}}>
            <Stack space={24}>
                <Text5 color="white">Paste below the User Story you want to convert:</Text5>
                 <textarea
                    id="multilineTextInput"
                    value={userStory}
                    onChange={(event) => {
                        setUserStory(event.target.value);
                    }}
                    rows={24}
                    cols={81}
                    style={{
                        borderRadius: '10px',
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '16px',
                        backgroundColor: '#1b1f24'
                    }}
                />
                <div style={{display: 'flex', margin: '24px', width: '100%'}}>
                    
                    <RadioGroup name="radio-group" onChange={setLanguage} defaultValue={'PT'}>
                            <div style={{marginInlineEnd: '24px'}}>
                            <RadioButton value="PT">
                                <Text3 regular>Português</Text3>
                            </RadioButton>
                            </div>
                            <div>
                            <RadioButton value="EN">
                                <Text3 regular>English</Text3>
                            </RadioButton>
                            </div>
                    
                    </RadioGroup>

                    <div style={{
                        marginInlineStart: '24px', 
                        width: '490px', 
                        display: 'flex', 
                        justifyContent:  'flex-end', 
                        alignItems: 'flex-end', 
                        marginInlineEnd: '24px'
                        }}>
                        <ButtonPrimary 
                            style={{
                                 width: 150,
                            //     display: 'flex', 
                            //     justifyContent: 'center',  
                            //     alignItems: 'center',
                            //     minHeight: '80px',
                            //     fontWeight: 'bold',
                            //     color: 'white',
                            //    // backgroundColor: buttonState.isCurrentlyActive ? selectedButtonColor : unselectedButtonColor
                            }} 
                            onPress={() => console.log('submit story')}
                            disabled={userStory.length == 0}
                            >
                                Submit Story
                        </ButtonPrimary>
                    </div>
                </div>    
            </Stack>
        </div>
    )
}