import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { DataGridTheme } from "./DataGridTheme";

type DataGridProps<T> = DataGridConfig<T>;

function DataGrid<T>({
  gridConfig: { columnDefs, agGridOptions },
  rowData,
}: DataGridProps<T>) {
  const gridRef = useRef<AgGridReact>(null);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  if(agGridOptions)
  agGridOptions.statusBar = {
    "statusPanels": [
      { "statusPanel": "agTotalAndFilteredRowCountComponent" },
      { "statusPanel": "agSelectedRowCountComponent" },
      { "statusPanel": "agAggregationComponent" }
    ]
  };

  const onGridReady = (params: GridReadyEvent<T>) => {
    setGridApi(params.api);
    if(agGridOptions.onGridReady)
      agGridOptions.onGridReady(params);
  };

  const exportToExcel = () => {
    if (gridApi) {
      gridApi.exportDataAsExcel({
        fileName: "exported-data.xlsx",
        columnKeys: [
          "entityName",
          "parentID",
          "status",
          "countryInc",
          "entityType",
          "federalID",
          "functionalCurrency",
          "dateInc",
          "primaryContact",
        ],
      });
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    if (gridRef.current) { 
      gridRef.current.api.setGridOption("quickFilterText", filterValue); // Set the quick filter text in the grid
    }
  }, []);

  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    tooltipValueGetter: (params) => params.value,
    enableRowGroup: true,
  };

  return (
    <div className={"p-4 w-[100%] h-[90vh]"}>

      <div className="p-2 flex justify-end">
        <div className="flex space-x-4 items-center">
          <button onClick={exportToExcel} className="bg-blue-500 text-white px-3 py-2 rounded">Export to Excel</button>

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
        {...agGridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default DataGrid;
