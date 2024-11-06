import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { DataGridTheme } from "./DataGridTheme";
import {getContextMenuItems} from "./DataGridUtil.ts";
import {DEFAULT_COL_DEF} from "./DataGridDefaultOptions.ts";
import { ColDef } from "ag-grid-enterprise";
import { renderers } from "./cell-renderers/index.ts";

type DataGridProps<T> = DataGridConfig<T>;


function DataGrid<T>({
  gridConfig: { columnDefs, agGridOptions },
  rowData,
}: DataGridProps<T>) {
  const gridRef = useRef<AgGridReact>(null);


  //TODO: we need to merge the default options with the options we get from the DB. default options are moved to DataGridDefaultOptions.ts and remove this.
  if(agGridOptions)
  agGridOptions.statusBar = {
    "statusPanels": [
      { "statusPanel": "agTotalAndFilteredRowCountComponent" },
      { "statusPanel": "agSelectedRowCountComponent" },
      { "statusPanel": "agAggregationComponent" }
    ]
  };

  const exportToExcel = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel({
        fileName: "exported-data.xlsx"
      });
    }
  };

  columnDefs.map((element: ColDef<T>) => {
    if (element.cellRenderer && renderers[element.cellRenderer]){
      element.cellRenderer = renderers[element.cellRenderer]; 
      if(element.cellEditor === "agRichSelectCellEditor" && element.cellEditorParams && element.cellEditorParams.cellRenderer){
        element.cellEditorParams.cellRenderer = renderers[element.cellEditorParams.cellRenderer]; 
      }
    }
    
  });

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    if (gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", filterValue); // Set the quick filter text in the grid
    }
  }, []);



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
        defaultColDef={DEFAULT_COL_DEF}
        rowData={rowData}
        rowSelection={{ mode: "multiRow" }}
        animateRows
        rowGroupPanelShow="always"
        rowDragManaged={true}
        suppressDragLeaveHidesColumns={true}
        getContextMenuItems={getContextMenuItems}
        {...agGridOptions}
      />
    </div>
  );
}

export default DataGrid;
