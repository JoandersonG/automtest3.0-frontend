import { DataType } from "./DataType"

export type Parameter = {
    identifier: string,
    name: string,
    type?: DataType
}

export function parameterToString(param: Parameter) {
    return param.name + (param.type ? (' (' + param.type + ')') : '')
}