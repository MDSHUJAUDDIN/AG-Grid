import { CellValueChangedEvent, ColDef, GetRowIdParams, RowValueChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState,useMemo, useCallback, useRef } from "react";

// Row Data Interface
interface IRow {
  entityName: string;
  parentID: string;
  status: boolean;
  countryInc: string;
  entityType: string;
  federalID: number;
  functionalCurrency: string;
  dateInc: string;
  primaryContact: string;
}

// Create new GridExample component
const GridExample = () => {

  const gridRef = useRef<AgGridReact | null>(null);

  const [rowData, setRowData] = useState<IRow[]>([]);

  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([

    { field: "entityName", headerName: "Entity Name", filter: true },
    { field: "parentID", headerName: "Parent ID", filter: true  },
    { field: "status", headerName: "Status" , filter: true},
    { field: "countryInc", headerName: "Country Inc.", filter: true },
    { field: "entityType", headerName: "Entity Type", filter: true  },
    { field: "federalID", headerName: "Federal ID", filter: true  },
    { field: "functionalCurrency", headerName: "Functional Currency" , filter: true,
      cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['AUD','CAD','USD'],
            },
    },
    { field: "dateInc", headerName: "Date Inc.", filter: true,
      cellEditor: 'agDateCellEditor',
        cellEditorParams: {
            min: '2000-01-01',
            max: '2024-12-31',
        }

      },
    { field: "primaryContact", headerName: "Primary Contact" , filter: true },
    
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    editable: true,
  };

  //const rowId = gridRef.current.api.getRowNode("1").data.id;



  
const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
     console.log('onCellValueChanged: ' + event.data.entityName);
     const rowId = gridRef.current?.api.getRowNode("1")?.id;
     console.log(rowId)

 }, []);
// //row edit
const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
  const data = event.data;
  // console.log(
  //     'onRowValueChanged: (' + data.make + ', ' + data.model + ', ' + data.price + ', ' + data.field5 + ')'
  // );
}, []);



  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((rowData) => setRowData(rowData))
      .catch((error) => console.error("Error fetching data:", error));
      
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="ag-theme-quartz" style={{ padding: "16px", width: "100%", height: "90vh" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination ={true}
        editType={'fullRow'}
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
        //getRowId={getRowId}
        />
    </div>
  );
};





export default GridExample;



