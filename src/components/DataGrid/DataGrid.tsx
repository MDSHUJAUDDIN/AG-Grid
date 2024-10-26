import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellValueChangedEvent, ColDef, GridApi, RowValueChangedEvent } from "ag-grid-community";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { DataGridTheme } from "./DataGridTheme";

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

  console.log('onCellValueChanged: ' + event.data);
}, []);


  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    tooltipValueGetter: (params) => params.value,
    enableRowGroup : true,

  };

  return (
    <div className={"p-4 w-[100%] h-[90vh]"} >
      <div className="p-2 flex justify-between" >
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
        editType={"fullRow"}
        onGridReady={onGridReady}
        rowSelection={{ mode: "multiRow" }}
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
        animateRows
        rowGroupPanelShow="always"
        rowDragManaged = {true}
        suppressDragLeaveHidesColumns = {true}
        {...agGridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default DataGrid;
