import { useState } from "react"
import UserStoryMethodsResult from "./UserStoryMethodsResult"
import { Method } from "../../models/Method"
import MethodCreateOrUpdate from "./NewMethodCreation"
import { ContentType } from "./ContentType"
import { v1 as uuidv1 } from 'uuid';

export default function InsertMethodsInfoContent(props: {methods: Method[]}) {

    function updateView(newContent: ContentType) {
        if (newContent == ContentType.NEW_METHOD) {
            setCurrentView(possibleViews.newMethodCreation)
        }
    }

    const [newMethod, setNewMethod] = useState<Method>( {
        identifier: uuidv1(),
        packageName: '',
        name: '',
        returnType: '',
        parameters: [],
        className: '',
        equivClasses: []
    })

    const [possibleViews, setPossibleView] = useState({
        userStoryResult: <UserStoryMethodsResult methods={props.methods} updateView={updateView} />,
        //methodsList: <MethodsList methods={props.methods} />,
        newMethodCreation: <MethodCreateOrUpdate updateMethod={setNewMethod} closeInsertMethods={() => setCurrentView(possibleViews.userStoryResult)}/>
    })

    const [currentView, setCurrentView] = useState(possibleViews.userStoryResult)

    return (
        <div>
            {currentView}
        </div>
    )
}