export type table = {

}
export type tableExtensions = {
    columnName:"string";
    align:'string'
}
export type column = {
    name: string;
    title: string
}
export type columnWidths = {
    columnName: string;
    width: number
}
export type SortTable = {
    columnName: string;
    direction: string
}

export type columnOrder = {

}
export type actionColumnsFormatter = {
    row: any;
    value: any;
    column: {
        name: string;
        title?: string;
        getCellValue?: (row: any, columnName: string) => any
    }
}
export type ComponentType={
    row: any;
    value: any;
    column: {
        name: string;
        title?: string;
        getCellValue?: (row: any, columnName: string) => any
    }
}

export type TableColumnWidthInfo={
    columnName: string;
    width: number
}
