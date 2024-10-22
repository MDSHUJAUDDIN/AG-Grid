import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";

type GenericGridProps<T> = {
  gridConfig: {
    columnDefs: ColDef[];
    gridOptions?: GridOptions;
  };
  rowData: T[];
  theme?: string;
}

function GenericGrid<T>({
  gridConfig,
  rowData,
  theme = "ag-theme-quartz",
}: GenericGridProps<T>) {
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

  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    // tooltipField: "value",
  };

  return (
    <div className={theme} style={{ height: "351px", width: "100%" }}>
      <div className="p-2">
        <button onClick={exportToExcel}>Export to Excel</button>
        <br />
        <span>Quick Filter:</span>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <AgGridReact
        ref={gridRef}
        columnDefs={gridConfig.columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={onGridReady}
        rowSelection={{ mode: "multiRow" }}
        animateRows
        {...gridConfig.gridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default GenericGrid;
