import {GetContextMenuItemsParams, MenuItemDef} from "ag-grid-community";

//File naming convention is not finalized. for now stick with Pascal case.
export function startEditing(params: GetContextMenuItemsParams, indexOffset: number) {
    setTimeout(() => {
        if (params.node && params.node.rowIndex) {
            const firstCol = params.api.getAllDisplayedColumns()[1];
            params.api.startEditingCell({
                rowIndex: params.node.rowIndex + indexOffset,
                colKey: firstCol
            });
        }
    })
}

export const getContextMenuItems = (params: GetContextMenuItemsParams):(string | MenuItemDef)[] => {
    // const isActionsColumn = params.column?.getColDef().headerName === 'Actions';
    // if (!isActionsColumn) {
    //   return [];
    // }
    return [
        {
            name: "Add row Above",
            action: () => {
                if(!params.node)
                    return;
                params.api.applyTransaction({ add: [{}], addIndex: params.node.rowIndex })
                startEditing(params, -1);
            },
        },
        {
            name: "Add row below",
            action: () => {
                if(!params.node || params.node.rowIndex == null)
                    return;

                params.api.applyTransaction({ add: [{}], addIndex: params.node.rowIndex + 1 });

                startEditing(params, 1);
            },
        },
        "separator",
        {
            name: "Delete",
            action: () => {
                alert("Delete action clicked for");
            },
        },
        {
            name: "Highlight Row",
            action: () => {
                if(params.node)
                    console.log("Highlight Row", params.node.data);
            },
        },
    ];
};