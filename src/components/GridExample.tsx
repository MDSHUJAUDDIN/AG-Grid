// Theme
import { ColDef,ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useState,useMemo } from "react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";


// Register enterprise modules
ModuleRegistry.registerModules([
  FiltersToolPanelModule,
  MenuModule,
  MultiFilterModule,
  RowGroupingModule,
  SetFilterModule,
]);

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
   
    { field: "parentID", headerName: "Parent ID", filter: "agTextColumnFilter"  },
    { field: "status", headerName: "Status" , filter: "agTextColumnFilter" },
    { field: "countryInc", headerName: "Country Inc.", filter: "agTextColumnFilter"  },
    { field: "entityType", headerName: "Entity Type", filter: "agTextColumnFilter"  },
    { field: "entityName", headerName: "Entity Name", filter: true, pinned :"left",tooltipField:"entityName" },
    { field: "federalID", headerName: "Federal ID", filter: true  },
    { field: "functionalCurrency", headerName: "Functional Currency" , filter: true },
    { field: "dateInc", headerName: "Date Inc.", filter: true  },
    { field: "primaryContact", headerName: "Primary Contact" , filter: true },
  ]);

  const rowSelection = useMemo(() => {
    return{
          mode :"multiRow",
    }
  })

  useEffect(() => {
    fetch("http://localhost:3004/users")
      .then((response) => response.json())
      .then((rowData) => setRowData(rowData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const defaultColDef: ColDef = {
    flex: 1,
    filter: true, // Enable filtering
    sortable: true, // Enable sorting
    resizable: true, // Enable resizing
    menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'], // Show column menus (3 dots)
  };
  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="ag-theme-quartz" style={{ padding: "16px", width: "100%", height: "90vh" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination ={true}
        rowSelection = {rowSelection}
      />
    </div>
  );
};

export default GridExample;
