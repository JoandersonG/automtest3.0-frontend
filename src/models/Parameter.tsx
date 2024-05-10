import { DataType } from "./DataType"

export type Parameter = {
    identifier: string,
    name: string,
    type?: string
}

export function parameterToString(param: Parameter) {
    return param.name + (param.type ? (' (' + param.type + ')') : '')
}