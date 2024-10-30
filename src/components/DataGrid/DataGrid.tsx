import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { DataGridTheme } from "./DataGridTheme";
import { SetFilter } from "ag-grid-enterprise";

type DataGridProps<T> = DataGridConfig<T>;

function DataGrid<T>({
  gridConfig: { columnDefs, agGridOptions },
  rowData,
}: DataGridProps<T>) {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const onGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api);
  };

  const exportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: "exported-data.xlsx",
        columnKeys: [
          "entityName",
          "parentId",
          "status",
          "countryInc",
          "entityType",
          "federalId",
          "functionalCurrency",
          "dateInc",
          "primaryContact",
        ],
      });
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    tooltipValueGetter: (params) => params.value,
    enableRowGroup: true,
  };
  
  
//'<span class="ag-icon ag-icon-menu" unselectable="on" role="presentation"></span>'
  const getContextMenuItems = (params: any) => {
    const result: any[] = [
      {
        name: "Add row Above",
        action: () => {
          console.log("Edit action clicked for", params.node.data);
        },
        icon: '<span class="ag-icon ag-icon-up" unselectable="on" role="presentation"></span>',
      },
      {
        name: "Add row below",
        action: () => {
          console.log("Add row below", params.node.data);
        },
        icon: '<span class="ag-icon ag-icon-down" unselectable="on" role="presentation"></span>',
      },
      "separator",
      {
        name: "Delete",
        action: (event: { node: { data: any; }; api: 
          { applyTransaction: (arg0: { remove: any[]; }) => void; }; }) => 
            {
                const selectedRows =[event.node.data];
                event.api.applyTransaction({ remove: selectedRows });
            },
        icon: '<span unselectable="on" role="presentation"><img src="/icons/delete.svg" /></span>'
      },
      {
        name: "Highlight Row",
        action: () => {
          console.log("Highlight Row", params.node.data);
                  },
        icon: '<span class="ag-icon ag-icon-menu" unselectable="on" role="presentation"></span>',
      },
    ];
    return result;
  };

  return (
    <div className={"p-4 w-[100%] h-[90vh]"}>
      <div className="p-2 flex justify-between">
        <button onClick={exportToExcel}>Export to Excel</button>
        <div className="flex space-x-4 justify-center items-center">
          <span>Quick Filter:</span>
          <input
            className="p-1  rounded-sm"
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>

      <AgGridReact
        theme={DataGridTheme}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={onGridReady}
        rowSelection={{ mode: "multiRow" }}
        animateRows
        rowGroupPanelShow="always"
        rowDragManaged={true}
        suppressDragLeaveHidesColumns={true}
        getContextMenuItems={getContextMenuItems} 
        //getRowStyle={getRowStyle}
        {...agGridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default DataGrid;
