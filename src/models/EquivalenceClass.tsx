import { DataRange } from "./DataRange"

export type EquivalenceClass = {
    identifier: string,
    name: string,
    numberOfCases: number,
    expectedOutputRange: DataRange,
    acceptableParamRanges: DataRange[],
}