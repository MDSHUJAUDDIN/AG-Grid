import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { DataGridTheme } from "./DataGridTheme";
import { deepMerge, getContextMenuItems } from "./DataGridUtil.ts";
import { DEFAULT_COL_DEF, DEFAULT_AG_GRID_OPTIONS } from "./DataGridDefaultOptions.ts";
import { ColDef } from "ag-grid-enterprise";
import { renderers } from "./cell-renderers/index.ts";

type DataGridProps<T> = DataGridConfig<T>;

function DataGrid<T>({
  gridConfig: { columnDefs, agGridOptions },
  rowData,
}: DataGridProps<T>) {
  const gridRef = useRef<AgGridReact>(null);

  //merging default grid options with data json grid options
  agGridOptions = deepMerge(agGridOptions, DEFAULT_AG_GRID_OPTIONS);

  //Mapping string to Cell renderers
  columnDefs.map((element: ColDef<T>) => {
    if (element.cellRenderer && renderers[element.cellRenderer]){
      element.cellRenderer = renderers[element.cellRenderer];
      if(element.cellEditor === "agRichSelectCellEditor" && element.cellEditorParams && element.cellEditorParams.cellRenderer){
        element.cellEditorParams.cellRenderer = renderers[element.cellEditorParams.cellRenderer]; 
      }
    }
  });

  const exportToExcel = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel({
        fileName: "exported-data.xlsx"
      });
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = (document.getElementById("filter-text-box") as HTMLInputElement).value;
    if (gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", filterValue); // Set the quick filter text in the grid
    }
  }, []);

  return (
    <div className={"p-4 w-full h-[90vh]"}>

      <div className="p-2 flex justify-end">
        <div className="flex space-x-4 items-center">
          <button onClick={exportToExcel} className="bg-blue-500 text-white px-3 py-2 rounded">Export to Excel</button>

          <span>Quick Filter:</span>
          <input
            className="p-1 rounded-sm"
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
        getContextMenuItems={getContextMenuItems}
        {...agGridOptions}
      />
    </div>
  );
}

export default DataGrid;
