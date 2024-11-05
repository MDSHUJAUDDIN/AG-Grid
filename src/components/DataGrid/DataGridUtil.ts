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
            icon: '<span class="ag-icon ag-icon-up" unselectable="on" role="presentation"></span>',
        },
        {
            name: "Add row below",
            action: () => {
                if(!params.node || params.node.rowIndex == null)
                    return;

                params.api.applyTransaction({ add: [{}], addIndex: params.node.rowIndex + 1 });

                startEditing(params, 1);
            },
            icon: '<span class="ag-icon ag-icon-down" unselectable="on" role="presentation"></span>',
        },
        {
            name: "Delete",
            action: () => {
                if(!params.node)
                    return;
                const selectedRows =[params.node.data];
                params.api.applyTransaction({ remove: selectedRows });
            },
            icon: '<span class="ag-icon ag-icon-cancel" unselectable="on" role="presentation"></span>'
        },
    ];
};

export const deepMerge = <T extends object>(target: T, source: Partial<T>): T => {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            target[key] = deepMerge(target[key] as any, source[key] as any);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            target[key] = source[key] as any;
        }
    }
    return target;
};