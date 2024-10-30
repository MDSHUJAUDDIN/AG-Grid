import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from "ag-grid-community";
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
  const[rowsData,setRowsData]= useState(rowData);

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

  const getContextMenuItems = (params: any) => {
    const result: any[] = [
      {
        name: "Add row Above",
        action: () => {
           const newRow = {
          entityName: "ABC COrp Finace",
          parentId: "Corp",
          status: true,
          countryInc: "India",
          entityType: "Foreign",
          federalId: "789115112",
          functionalCurrency: "",
          dateInc: "",
          primaryContact: "John Constantine",
        };
        
      
        gridApi!.applyTransaction({ add: [newRow], addIndex: params.node.rowIndex});

         
         setTimeout(() => {
          gridApi!.startEditingCell({
            rowIndex: params.node.rowIndex-1, 
            colKey: 'entityName', 
                
          });
        }, 0);
      },
      icon: '<i class="fas fa-edit"></i>',
    },
      {
        name: "Add row below",
        action: () => {
          const newRow = {
            entityName: "",
            parentId: "",
            status: true,
            countryInc: "",
            entityType: "",
            federalId: "",
            functionalCurrency: "",
            dateInc: "",
            primaryContact: "",
          };

          const newRowData =[...rowsData];
          newRowData.splice(params.node.rowIndex+1,0,newRow);
          setRowsData(newRowData);
          // gridApi!.setRowData(newRowData);
          gridApi!.applyTransaction({ add: [newRow], addIndex: params.node.rowIndex + 1 });
        },
        icon: '<i class="fas fa-trash"></i>',
      },
      "separator",
      {
        name: "Delete",
        action: () => {
          alert("Delete action clicked for");
        },
        icon: '<i class="fas fa-trash"></i>',
      },
      {
        name: "Highlight Row",
        action: () => {
          console.log("Highlight Row", params.node.data);
        },
        icon: '<i class="fas fa-trash"></i>',
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
        {...agGridOptions} // Spread any additional grid options from the config
      />
    </div>
  );
}

export default DataGrid;
