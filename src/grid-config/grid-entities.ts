import { ColDef, GridOptions } from "ag-grid-community";

export type Entity = {
  entityName: string;
  parentId: string;
  status: boolean;
  countryName: string;
  entityType: string;
  federalId: number;
  currency: string;
  date: string;
  primaryContact: string;
}

export const gridConfig: { columnDefs: ColDef[]; gridOptions?: GridOptions } = {
  columnDefs: [
    { headerName: "Entity Name", field: "entityName", checkboxSelection: true },
    { headerName: "Parent ID", field: "parentId" },
    { headerName: "Status", field: "status" },
    { headerName: "Country Inc.", field: "countryName" },
    { headerName: "Entity Type", field: "entityType" },
    { headerName: "Federal ID", field: "federalId" },
    { headerName: "Functional Currency", field: "currency" },
    { headerName: "Date Inc.", field: "date" },
    { headerName: "Primary Contact", field: "primaryContact" },
    { headerName: "Actions", field: "" },
  ],
  gridOptions: {
    pagination: true,
    paginationPageSize: 10,
    suppressRowClickSelection: true,
    rowSelection: "multiple",
    rowMultiSelectWithClick: true,
    animateRows: true,
    enableRangeSelection: true,
    //enableColResize: true,
    enableCellChangeFlash: true,
    enableRangeHandle: true,
    //enableCellEditing: true,
    //enableRangeSelection: true,
    enableFillHandle: true,
    //enableRangeSort: true,
    //enableRangeFilter: true,
    //enableRangeSelect: true,
    // rowGroupPanelShow: "always",
  },
};

export const rowData: Entity[] = [
  {
    entityName: "Benelux NV Corp.",
    parentId: "BNC Corp.",
    status: true,
    countryName: "US",
    entityType: "Domestic",
    federalId: 64950,
    currency: "USD",
    date: "2024-10-18T14:57:59.391",
    primaryContact: "Roderick Dibbert",
  },
  {
    entityName: "KB Holdings",
    parentId: "KPG Inc.",
    status: true,
    countryName: "Canada",
    entityType: "Foreign",
    federalId: 33850,
    currency: "CAD",
    date: "2024-11-18T14:57:34.391",
    primaryContact: "Edith Huel",
  },
  {
    entityName: "National Holdings",
    parentId: "NH Corp.",
    status: false,
    countryName: "Canada",
    entityType: "Domestic",
    federalId: 29600,
    currency: "CAD",
    date: "2024-10-18T14:33:59.391",
    primaryContact: "Cameron Franecki",
  },
  {
    entityName: "ABC Corp.",
    parentId: "ABC Inc.",
    status: true,
    countryName: "US",
    entityType: "Foreign",
    federalId: 48890,
    currency: "USD",
    date: "2024-10-18T14:43:59.391",
    primaryContact: "Julia Kuphal",
  },
  {
    entityName: "XYZ Holdings",
    parentId: "XYZ Corp.",
    status: false,
    countryName: "Australia",
    entityType: "Domestic",
    federalId: 15774,
    currency: "AUD",
    date: "2024-11-18T14:57:59.391",
    primaryContact: "Myron Lueilwitz",
  },
  {
    entityName: "Pepro Holdings",
    parentId: "BNV Inc.",
    status: true,
    countryName: "US",
    entityType: "Foreign",
    federalId: 20675,
    currency: "USD",
    date: "2024-10-18T17:57:59.391",
    primaryContact: "Raymond Cartwright",
  },
];
