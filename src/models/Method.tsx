import { EquivalenceClass } from "./EquivalenceClass";
import { Parameter } from "./Parameter"

export type Method = {
    identifier: string,
    packageName?: string,
    name: string,
    returnType: string,
    parameters: Parameter[],
    className: string,
    equivClasses: EquivalenceClass[],
}


// export function MethodBuilder(name: string, packageName: string, re) {
//     return {
//         identifier: uuidv1(),
//         packageName: '',
//         name: '',
//         returnType: '',
//         parameters: '',
//         className: ''
//     }
// }