// DataGrid.stories.tsx
import { Meta, Story } from '@storybook/react';
import DataGrid from '../components/DataGrid/DataGrid';
import { DataGridConfig, DataGridOptions } from '../components/DataGrid/DataGridConfig';
import { ColDef, GridOptions } from 'ag-grid-community';
import Data from '../../public/db.json'

// Meta configuration for Storybook
const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['autodocs'], // Optional for auto-generated documentation
};

export default meta;
 console.log(Data);
 
// Sample row data
const sampleRowData = Data.rowData;

// Sample column definitions
const sampleColumnDefs: ColDef[] = Data.gridConfig.columnDefs;

// Sample agGridOptions (customize as needed)
const sampleAgGridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 20,
  // Add any additional grid options here
};

// Sample grid configuration
const sampleGridConfig: DataGridOptions<typeof sampleRowData> = {
  columnDefs: sampleColumnDefs,
  agGridOptions: sampleAgGridOptions,
};

// Story template
const Template: Story<DataGridConfig<typeof sampleRowData>> = (args) => <DataGrid {...args} />;

// Primary story
export const Primary = Template.bind({});
Primary.args = {
  gridConfig: sampleGridConfig,
  rowData: sampleRowData,
};
