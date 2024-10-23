import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";

// Define the interface for the row data
interface RowData {
    entityName: string;
    parentId: string;
    status: string;
    countryInc: string;
    entityType: string;
    federalId: string;
    functionalCurrency: string;
    dateInc: string;
    primaryContact: string;
    actions: string;
}

// Define the GridExample component
const GridExample: React.FC = () => {
    const gridRef = useRef<AgGridReact | null>(null);

    // Define the column definitions for the grid
    const columnDefs = [
        {
            headerName: "Entity Name",
            field: "entityName",
            checkboxSelection: true,
            headerCheckboxSelection: true,
        },
        { headerName: "Parent ID", field: "parentId" },
        { headerName: "Status", field: "status" },
        { headerName: "Country Inc.", field: "countryInc" },
        { headerName: "Entity Type", field: "entityType" },
        { headerName: "Federal ID", field: "federalId" },
        { headerName: "Functional Currency", field: "functionalCurrency" },
        { headerName: "Date Inc", field: "dateInc" },
        { headerName: "Primary Contact", field: "primaryContact" },
        { headerName: "Actions", field: "actions" },
    ];

    // Sample row data
    const rowData: RowData[] = [
      {
          entityName: "Benelux NV Corp.",
          parentId: "ABC Inc.",
          status: "Active",
          countryInc: "US",
          entityType: "Domestic",
          federalId: "XX-XXXX4578",
          functionalCurrency: "USD",
          dateInc: "11/23/2000",
          primaryContact: "John, Doe",
          actions: "..."
      },
      {
          entityName: "KB Holdings",
          parentId: "KPG Inc.",
          status: "Active",
          countryInc: "Australia",
          entityType: "Foreign",
          federalId: "XX-XXXX2374",
          functionalCurrency: "AUD",
          dateInc: "8/16/2012",
          primaryContact: "Mark, Bain",
          actions: "..."
      },
      {
          entityName: "National Holdings",
          parentId: "XYZ Corp.",
          status: "Active",
          countryInc: "Canada",
          entityType: "Foreign",
          federalId: "XX-XXXX9826",
          functionalCurrency: "CAD",
          dateInc: "4/12/2011",
          primaryContact: "Orlando",
          actions: "..."
      },
      {
          entityName: "Benelux NV Corp.",
          parentId: "BNV Inc.",
          status: "Active",
          countryInc: "US",
          entityType: "Domestic",
          federalId: "XX-XXXX4578",
          functionalCurrency: "USD",
          dateInc: "5/21/2000",
          primaryContact: "Isaac, Martin",
          actions: "..."
      },
      {
          entityName: "KB Holdings",
          parentId: "KBH Inc.",
          status: "Active",
          countryInc: "Australia",
          entityType: "Foreign",
          federalId: "XX-XXXX2374",
          functionalCurrency: "AUD",
          dateInc: "4/15/2012",
          primaryContact: "Martin",
          actions: "..."
      },
      {
          entityName: "National Holdings",
          parentId: "NH Corp.",
          status: "Active",
          countryInc: "Canada",
          entityType: "Foreign",
          federalId: "XX-XXXX9826",
          functionalCurrency: "CAD",
          dateInc: "11/23/2000",
          primaryContact: "Mark, Bain",
          actions: "..."
      },
      {
          entityName: "Benelux NV Corp.",
          parentId: "BNC Corp.",
          status: "Active",
          countryInc: "US",
          entityType: "Domestic",
          federalId: "XX-XXXX4578",
          functionalCurrency: "USD",
          dateInc: "8/16/2012",
          primaryContact: "Mathews",
          actions: "..."
      },
      {
          entityName: "KB Holdings",
          parentId: "ABC Inc.",
          status: "Active",
          countryInc: "Australia",
          entityType: "Foreign",
          federalId: "XX-XXXX2374",
          functionalCurrency: "AUD",
          dateInc: "4/12/2011",
          primaryContact: "John, Ashley",
          actions: "..."
      },
      {
          entityName: "National Holdings",
          parentId: "NH Corp.",
          status: "Active",
          countryInc: "Canada",
          entityType: "Foreign",
          federalId: "XX-XXXX9826",
          functionalCurrency: "CAD",
          dateInc: "5/21/2000",
          primaryContact: "Ashley, Jhonson",
          actions: "..."
      },
      // Add other row data as needed...
  ];

    // Default column properties
    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
    };

    // Function to export data as Excel
    const onBtExport = () => {
        if (gridRef.current) {
            gridRef.current.api.exportDataAsExcel({
                fileName: 'exported-data.xlsx',
                columnKeys: [
                    'entityName',
                    'parentId',
                    'status',
                    'countryInc',
                    'entityType',
                    'federalId',
                    'functionalCurrency',
                    'dateInc',
                    'primaryContact',
                ],
            });
        }
    };

    // Render the component
    return (
        <div className="py-0 px-20">
            <button
                onClick={onBtExport}
                className="mb-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Export to Excel
            </button>
            <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                />
            </div>
        </div>
    );
};

export default GridExample;
