import { CellValueChangedEvent, ColDef, RowValueChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState,useMemo, useCallback } from "react";

// Row Data Interface
interface IRow {
  entityName: string;
  parentID: string;
  status: string;
  countryInc: string;
  entityType: string;
  federalID: number;
  functionalCurrency: string;
  dateInc: string;
  primaryContact: string;
}

// Create new GridExample component
const GridExample = () => {

  const [rowData, setRowData] = useState<IRow[]>([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([

    { field: "entityName", headerName: "Entity Name", filter: true },
    { field: "parentID", headerName: "Parent ID", filter: true  },
    { field: "status", headerName: "Status" , filter: true },
    { field: "countryInc", headerName: "Country Inc.", filter: true  },
    { field: "entityType", headerName: "Entity Type", filter: true  },
    { field: "federalID", headerName: "Federal ID", filter: true  },
    { field: "functionalCurrency", headerName: "Functional Currency" , filter: true },
    { field: "dateInc", headerName: "Date Inc.", filter: true  },
    { field: "primaryContact", headerName: "Primary Contact" , filter: true },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    editable: true,
  };
  
  //code for editing the cells
  //'tab' makes the cursor move to right cell in the editing row
  //'shift' + 'tab' makes the cursor move to left cell in the editing row

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
}, []);

  useEffect(() => {
    fetch("http://localhost:3004/users")
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
        />
    </div>
  );
};





export default GridExample;