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
            returnType: 'string',
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
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'name',
                    type: 'string'
                }
            ]
        }, {
            identifier: '2',
            name: 'anotherMethod2',
            className: 'AgeManager',
            returnType: 'int',
            equivClasses: [],
            parameters: [
                {
                    identifier: '2',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: 'string'
                }
            ]
        }, {
            identifier: '3',
            name: 'anotherMethod3',
            className: 'AgeManager',
            returnType: 'float',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: 'string'
                }
            ]
        }, {
            identifier: '4',
            name: 'anotherMethod4',
            className: 'AgeManager',
            returnType: 'boolean',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: 'string'
                }
            ]
        }, {
            identifier: '5',
            name: 'anotherMethod5',
            className: 'AgeManager',
            returnType: 'date',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '5',
                    name: 'nameOfGroup',
                    type: 'string'
                }
            ]
        }, {
            identifier: '6',
            name: 'anotherMethod6',
            className: 'AgeManager',
            returnType: 'double',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '5',
                    name: 'nameOfGroup',
                    type: 'string'
                }
            ]
        }, {
            identifier: '7',
            name: 'anotherMethod7',
            className: 'AgeManager',
            returnType: 'char',
            equivClasses: [],
            parameters: [
                {
                    identifier: '1',
                    name: 'month',
                    type: 'int'
                }, {
                    identifier: '2',
                    name: 'year',
                    type: 'int'
                }, {
                    identifier: '3',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '4',
                    name: 'nameOfGroup',
                    type: 'string'
                }, {
                    identifier: '5',
                    name: 'nameOfGroup',
                    type: 'string'
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
            isCurrentlyActive: true,
            enabled: true,
            showPage: () => <InsertMethodsInfoContent methods={methods} setMethods={setMethods} showEquivClassesList={() => selectButton(MenuButton.EQUIVALENCE_CLASS)}/>
        },{
            menuButton: MenuButton.EQUIVALENCE_CLASS,
            isCurrentlyActive: false,
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
        console.log('selectButton ', button)
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