import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, ValueFormatterParams, ValueGetterParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { DataGridConfig } from "./DataGridConfig";
import { Entity } from "../../models/Entity";

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

  const defaultColDef: ColDef = {
    sortable: true,
    editable: true,
    resizable: true,
    tooltipValueGetter: (params) => params.value,
    enableRowGroup : true,
   
  //   valueFormatter: (params: ValueFormatterParams<dateInc , string >) => {
  //     // params.value : number
  //     return "£" + params.value;
  // }
    // rowGroup : true ,
    // hide : true ,
    // lockPinned : true,
    // tooltipShowDelay: 0, // Show immediately
    // tooltipHideDelay: 200, // Hide after 200ms
  };

  // const columnsDefsWithFormatter: ColDef[] = [
  //   {
  //     field: "entityName", // You can name this column anything
  //     headerName: "Entity Name",
  //     rowDrag: true, // Enable row dragging in this column
  //     width: 40,
  //     cellRenderer: (params:ValueGetterParams<Entity,string>) => {
  //       return `<span class="ag-icon ag-icon-drag-handle"></span>`;
  //     }, // Custom renderer for the drag handle icon
  //   },
  //   ...columnDefs, // Spread other column definitions
  //   {
  //     field: "dateInc",
  //     headerName: "Date Inc",
  //     valueFormatter: (params) => {
  //       const dateValue = params.value;
  //       if (dateValue && !isNaN(Date.parse(dateValue))) {
  //         const date = new Date(dateValue);
  //         return date.toLocaleDateString("en-US", {
  //           year: "numeric",
  //           month: "2-digit",
  //           day: "2-digit",
  //         });
  //       }
  //       return "";
  //     },
  //   },
  // ];



  const columnsDefsWithFormatter: ColDef[] = columnDefs.map(colDef => {
    
    //currency dropdown
    if (colDef.field === "functionalCurrency"){
      return {
        ...colDef,
        cellEditor:"agRichSelectCellEditor",
        cellEditorParams:{
          values:["AUD","CAD","USD"],
        }
      }
    } else if (colDef.field === "dateInc") {
      return {
        ...colDef,
        
        valueFormatter: (params: ValueFormatterParams<Entity, string>) => {
          const dateValue = params.value;
  
          if (dateValue && !isNaN(Date.parse(dateValue))) {
            const date = new Date(dateValue); // Create Date object
            return date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }); // Format as MM/DD/YYYY
          }
  
          return ""; // Return an empty string for invalid dates
        },
        cellEditor: "agDateCellEditor",
        
          // valueGetter: params => {
          //     return params.data.name;
          // },
          valueSetter: params => {
              params.data.name = params.newValue;
              return true;
          }
      }
      };
    
    return colDef; 
  });


  return (
    <div className={"ag-theme-quartz p-4 w-[100%] h-[90vh]"} >
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
        ref={gridRef}
        columnDefs={columnsDefsWithFormatter}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={onGridReady}
        rowSelection={{ mode: "multiRow" }}
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
