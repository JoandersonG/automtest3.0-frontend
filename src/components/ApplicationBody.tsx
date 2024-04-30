import { useEffect, useState } from "react";
import AboutPage from "./AboutContent";
import ApplicationMenu, { MenuButton, MenuButtonState } from "./ApplicationMenu";
import UserStoryContent from "./UserStoryContent";
import '@telefonica/mistica/css/mistica.css';
import InsertMethodsInfoContent from "./insert-methods-info/InsertMethodsInfoContent";
import { Method } from "../models/Method";
import { DataType } from "../models/DataType";
import EquivalenceClassesContent from "./equiv-classes/EquivalenceClassesContent";

export default function ApplicationBody() {

    // {
    //     "MenuButton.ABOUT" {
    //         state: active,
    //         selectable: true
    //     },MenuButton.ABOUT {
    //         state: active,
    //         selectable: true
    //     }
    // }
    //menuButtons['ABOUT'] ? 
    const [methods, setMethods] = useState<Method[]>([
        {
            identifier: '1',
            name: 'isMinorAge',
            className: 'AgeManager',
            returnType: 'boolean',
            equivClasses: [{
                identifier: '1',
                name: 'minorAge',
                numberOfCases: 10,
                expectedOutputRange: {
                    v1: '[abc123][numbers][letters]',
                    v2: '[1~2][2~3][3~4]',
                    v3: ''
                },
                acceptableParamRanges: [{
                    param_id: '1',
                    v1: '[numbers][letters]',
                    v2: '[2~6][3~8]',
                    v3: ''
                }]
            }, {
                identifier: '2',
                name: 'minorAge',
                numberOfCases: 10,
                expectedOutputRange: {
                    v1: '[joand][numbers][letters]',
                    v2: '[1~2][2~3][3~4]',
                    v3: ''
                },
                acceptableParamRanges: [{
                    param_id: '1',
                    v1: '[[joand][letters]',
                    v2: '[2~6][3~8]',
                    v3: ''
                }]
            }],
            parameters: [
                {
                    identifier: '1',
                    name: 'age',
                    type: DataType.int
                }
            ]
        }, {
            identifier: '2',
            name: 'anotherMethod',
            className: 'AgeManager',
            returnType: 'integer',
            equivClasses: [],
            parameters: [
                {
                    identifier: '2',
                    name: 'month',
                    type: DataType.int
                }, {
                    identifier: '3',
                    name: 'year',
                    type: DataType.int
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: DataType.String
                }
            ]
        }, {
            identifier: '3',
            name: 'anotherMethod',
            className: 'AgeManager',
            returnType: 'integer',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: DataType.int
                }, {
                    identifier: '2',
                    name: 'year',
                    type: DataType.int
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: DataType.String
                }
            ]
        }, {
            identifier: '4',
            name: 'anotherMethod',
            className: 'AgeManager',
            returnType: 'integer',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: DataType.int
                }, {
                    identifier: '2',
                    name: 'year',
                    type: DataType.int
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: DataType.String
                }
            ]
        }, {
            identifier: '5',
            name: 'anotherMethod',
            className: 'AgeManager',
            returnType: 'integer',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: DataType.int
                }, {
                    identifier: '2',
                    name: 'year',
                    type: DataType.int
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: DataType.String
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: DataType.String
                }, {
                    identifier: '5',
                    name: 'nameOfGroup',
                    type: DataType.String
                }
            ]
        }
    ])
    
    const [menuButtons, setMenuButtons] = useState<MenuButtonState[]>([
        {
            menuButton: MenuButton.ABOUT,
            isCurrentlyActive: false,
            enabled: true,
            showPage: () => <AboutPage />
        },{
            menuButton: MenuButton.USER_STORY,
            isCurrentlyActive: false,
            enabled: true,
            showPage: () => <UserStoryContent />
        },{
            menuButton: MenuButton.METHOD_INFO,
            isCurrentlyActive: false,
            enabled: true,
            showPage: () => <InsertMethodsInfoContent methods={methods}/>
        },{
            menuButton: MenuButton.EQUIVALENCE_CLASS,
            isCurrentlyActive: true,
            enabled: true,
            showPage: () => <EquivalenceClassesContent methods={methods} setMethods={setMethods}/>
        },{
            menuButton: MenuButton.GENERATE_TEST,
            isCurrentlyActive: false,
            enabled: false,
            showPage: () => <div>Generate Test</div>
        },
    ]) 

    // const [menuButtons, setMenuButtons] = useState<any[]>([
    //     <MenuBttn enabled menuButton={MenuButton.ABOUT} page={<AboutPage />}/>
    // ])

    
    useEffect(() => {
        console.log('methods updated from root to value:', methods)
    }, [methods])

    function selectButton(button: MenuButton) {
        const updated = menuButtons.map((bt: MenuButtonState) => {
            if (bt.menuButton == button){
                bt.isCurrentlyActive = true
            } else {
                bt.isCurrentlyActive = false
            }
            return bt;
        });
        //console.log('updated selected button')
        setMenuButtons(updated)
    }

    // const [currentActivePage, setCurrentActivePage] = useState<any>()

    // console.log('currentActivePage', currentActivePage)

    // useEffect(() => {
    //     let activePage = <div></div>;
    //     if (menuButtons == MenuButton.ABOUT) activePage = <AboutPage />
    //     else if (menuButtons == MenuButton.USER_STORY) activePage = <div>User Story</div>
    //     setCurrentActivePage(activePage)
    // }, [menuButtons])

    const height = '650px'
    const width = '960px'
    return (
        <>
        <div style={{
            display: 'flex',
             padding: '24px',
             paddingTop: '122px',
             minWidth: width, 
             maxWidth: width, 
             minHeight: height, 
             maxHeight: height,
             overflowX: 'hidden'
             }}>
            <ApplicationMenu buttonsState={menuButtons} selectButton={selectButton}/>
            <div style={{marginInlineStart: '24px', width: '100%'}}>
                {menuButtons.filter((m: MenuButtonState) => m.isCurrentlyActive)[0].showPage()}
            </div>
        </div>
        </>
    )
}