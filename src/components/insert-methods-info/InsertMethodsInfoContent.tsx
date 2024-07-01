import { useEffect, useState } from "react"
import MethodList from "./MethodList"
import { Method } from "../../models/Method"
import MethodCreateOrUpdate from "./MethodCreateOrUpdate"
import { ContentType } from "./ContentType"

export default function InsertMethodsInfoContent(props: {methods: any, setMethods: any, showEquivClassesList: any}) {

    const possibleViews = {
        METHOD_LIST: 0,
        CREATE_UPDATE_METHODS: 1,
    }

    const [currentView, setCurrentView] = useState(possibleViews.METHOD_LIST)
    const [methodToUpdate, setMethodToUpdate] = useState<Method>();

    const [methods, setMethods] = useState<Method[]>([]);

    useEffect(() => {
        console.log("InsertMethodsInfoContent.props.methods", props.methods)
        setMethods(props.methods)
    }, [props.methods])

    function updateView(newContent: ContentType, methodToUpdateView?: Method) {
        console.log('updateView', newContent, methodToUpdateView)
        if (newContent == ContentType.NEW_METHOD) {
            setMethodToUpdate(methodToUpdateView)
            setCurrentView(possibleViews.CREATE_UPDATE_METHODS)
        } else if (newContent == ContentType.NEW_EQUIV_CLASS) {
            setCurrentView(possibleViews.METHOD_LIST)
        }
    }

    function createOrUpdateMethod(newMethod: Method) {
        const alreadyExists = methods.find((m: Method) => m.identifier == newMethod.identifier)
        if (alreadyExists) {
            props.setMethods((methods: Method[]) => methods.map(oldM => oldM.identifier == newMethod.identifier ? newMethod : oldM))
            setMethods((methods: Method[]) => methods.map(oldM => oldM.identifier == newMethod.identifier ? newMethod : oldM))
        } else {
            props.setMethods((methods: Method[]) => [...methods, newMethod])
            setMethods((methods: Method[]) => [...methods, newMethod])
        }
    }

    function removeMethod(methodId: string) {
        props.setMethods((methods: Method[]) => methods.filter(m => m.identifier != methodId))
        setMethods((methods: Method[]) => methods.filter(m => m.identifier != methodId))
    }

    return (
        <div>
            {
                currentView == possibleViews.METHOD_LIST ?

                    <MethodList methods={methods} removeMethod={removeMethod} updateView={updateView} showEquivClassesList={props.showEquivClassesList} />

                : currentView == possibleViews.CREATE_UPDATE_METHODS ?

                    <MethodCreateOrUpdate 
                        method={methodToUpdate}
                        updateMethod={(method: Method) => createOrUpdateMethod(method)}
                        onClose={() => setCurrentView(possibleViews.METHOD_LIST)}/>
                :

                    <div></div>
            }
        </div>
    )
}