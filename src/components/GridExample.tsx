// Theme
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import React, { useEffect, useState, useRef, useMemo } from 'react';

// Row Data Interface
interface IRow {
    entityName: string;
    parentId: string;
    status: string; // 'active' or 'inactive'
    countryInc: string;
    entityType: string;
    federalId: string;
    functionalCurrency: string;
    dateInc: string;
    primaryContact: string;
}

// Create new GridExample component
const GridExample: React.FC = () => {
    const gridRef = useRef<AgGridReact | null>(null);
    const [rowData, setRowData] = useState<IRow[]>([]);
    const [filteredData, setFilteredData] = useState<IRow[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all'); // Track active filter

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef<IRow>[]>([
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
    ]);

    const defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
    };

    useEffect(() => {
        fetch("/db.json")
            .then((response: Response) => response.json())
            .then((data: IRow[]) => {
                setRowData(data);
                setFilteredData(data); // Set filtered data to all data initially
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const filterActive = () => {
        setFilteredData(rowData.filter(row => row.status.toLowerCase() === 'active'));
        setActiveFilter('active'); // Update active filter
    };

    const filterInactive = () => {
        setFilteredData(rowData.filter(row => row.status.toLowerCase() === 'inactive'));
        setActiveFilter('inactive'); // Update inactive filter
    };

    const showAll = () => {
        setFilteredData(rowData);
        setActiveFilter('all'); // Update All filter
    };

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

    // Container: Defines the grid's theme & dimensions.
    return (
        <div>
            <div className="mx-4">
                <nav className="bg-white p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <button
                                onClick={showAll}
                                className={`text-black hover:bg-gray-100 px-3 py-2 rounded ${activeFilter === 'all' ? 'bg-gray-200' : ''}`} // Highlight if All
                            >
                                All
                            </button>
                            <button
                                onClick={filterActive}
                                className={`text-black hover:bg-gray-100 px-3 py-2 rounded ${activeFilter === 'active' ? 'bg-gray-200' : ''}`} // Highlight if active
                            >
                                Active
                            </button>
                            <button
                                onClick={filterInactive}
                                className={`text-black hover:bg-gray-100 px-3 py-2 rounded ${activeFilter === 'inactive' ? 'bg-gray-200' : ''}`} // Highlight if inactive
                            >
                                Inactive
                            </button>
                        </div>
                        <button
                            onClick={onBtExport}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Export to Excel
                        </button>
                    </div>
                </nav>
            </div>

            <div className="mx-4">
                <div className="ag-theme-quartz" style={{ height: '600px', width: '100%' }}>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={colDefs}
                        rowData={filteredData}
                        defaultColDef={defaultColDef}
                        rowSelection="multiple"
                    />
                </div>
            </div>
        </div>
    );
};

export default GridExample;
