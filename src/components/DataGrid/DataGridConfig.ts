import { ColDef, GridOptions } from "ag-grid-community"


export type DataGridConfig<T> = {
    gridConfig: DataGridOptions<T>;
    rowData: T[];
}

export type DataGridOptions<T> = {
    columnDefs: ColDef<T>[]
    agGridOptions: GridOptions
}

