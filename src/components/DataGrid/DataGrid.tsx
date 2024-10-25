import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColDef, GridApi, RowValueChangedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";


type DataGridProps<T> = DataGridConfig<T>

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
      gridApi.exportDataAsExcel();
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    console.log('onCellValueChanged: ' + event.data.colDefs);
}, []);
// //row edit
const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
 
}, []);


  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    // tooltipField: "value",
  };

  return (
    <div className={"ag-theme-quartz"} style={{ padding: "16px", width: "100%", height: "90vh" }}>
      <div className="p-2" style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={exportToExcel}>Export to Excel</button>
        <div>
          <span>Quick Filter:</span>
          <input
            style={{ padding: "5px", borderRadius: "3px" }}
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </div>
      </div>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        editType={"fullRow"}
        onGridReady={onGridReady}
        rowSelection={{ mode: "multiRow" }}
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
        animateRows
        {...agGridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default DataGrid;
