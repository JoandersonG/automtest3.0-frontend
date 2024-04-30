export const StringRangePieceType = [
    {value: 'manually_specify', text: 'Manually specify'},
    {value: 'any_character', text: 'Any character'},
    {value: 'signs', text: 'Signs'},
    {value: 'numbers', text: 'Numbers'},
    {value: 'letters', text: 'Letters'},
    {value: 'numbers_letters', text: 'Numbers/Letters'},
]

export type StringDataRangePiece = {
    id: string,
    type: string,
    content: string,
    from: string,
    to: string
}

export type StringDataRange = {
    param_id?: string,
    pieces: StringDataRangePiece[]
}