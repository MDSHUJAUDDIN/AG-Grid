import {ColDef, GridOptions, ITooltipParams} from "ag-grid-community";

export const DEFAULT_AG_GRID_OPTIONS: GridOptions=  {
    "suppressRowClickSelection": true,
    "rowMultiSelectWithClick": true,
    "animateRows": true,
    "enableRangeSelection": true,
    "enableCellChangeFlash": true,
    "enableRangeHandle": true,
    "enableFillHandle": true,
    // "suppressCellContextMenu":true
    statusBar: {
        "statusPanels": [
            { "statusPanel": "agTotalAndFilteredRowCountComponent" },
            { "statusPanel": "agSelectedRowCountComponent" },
            { "statusPanel": "agAggregationComponent" }
        ]
    }
} as const;

export const DEFAULT_COL_DEF: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    tooltipValueGetter: (params: ITooltipParams) => params.value,
    enableRowGroup: true,
} as const;