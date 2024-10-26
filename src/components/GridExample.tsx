// Theme
import { CellValueChangedEvent,ColDef, DataTypeDefinition, GetRowIdParams, ModuleRegistry, RowValueChangedEvent, ValueFormatterParams } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState,useMemo, useCallback, useRef } from "react";

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

  const gridRef = useRef<AgGridReact | null>(null);
  const [rowData, setRowData] = useState<IRow[]>([]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<IRow>[]>([

    { field: "entityName", headerName: "Entity Name", filter: true ,pinned :"left",tooltipField:"entityName"},
    { field: "parentID", headerName: "Parent ID", filter: true  },
    { field: "status", headerName: "Status" , filter: true,editable:true,
        cellRenderer:'agCheckboxCellRenderer',
        cellEditor: 'agCheckboxCellEditor',
    },
    { field: "countryInc", headerName: "Country Inc.", filter: true },
    { field: "entityType", headerName: "Entity Type", filter: true  },
    { field: "federalID", headerName: "Federal ID", filter: true  },
    { field: "functionalCurrency", headerName: "Functional Currency" , filter: true,editable:true,
      cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['AUD','CAD','USD'],
            },
    },
    { field: "dateInc", headerName: "Date Inc.", filter: true,editable:true,
      cellEditor: 'agDateCellEditor',
        cellEditorParams: {
            min: '01-01-2000',
            max: '31-12-2024',
        }
      },
    { field: "primaryContact", headerName: "Primary Contact" , filter: true },
    
  ]);


  const defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    filter: true,
    sortable:true,
  };

const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
     console.log('onCellValueChanged: ' + event.data.colDefs);
 }, []);
// //row edit
const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
  const data = event.data;
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
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
        editType={'fullRow'}
        rowSelection = {
          {mode :"multiRow",
    }}
      />
    </div>
  );
};

export default GridExample;
