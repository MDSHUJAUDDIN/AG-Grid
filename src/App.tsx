// App.tsx
import { FC, useCallback, useEffect, useState } from "react";
import DataGrid from "./components/DataGrid/DataGrid";
import { DataGridConfig } from "./components/DataGrid/DataGridConfig";
import { GridApi, GridReadyEvent, IRowNode } from "ag-grid-enterprise";
import { Entity } from "./models/Entity";

let filterBy: 'all' | 'active' | 'inactive' = 'all'
const App: FC = () => {
  const [gridConfig, setGridConfig] = useState<DataGridConfig<Entity> | null>(
    null
  );
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const onGridReady = (params:  GridReadyEvent<Entity>)=>{
    setGridApi(params.api);
  }

  const isExternalFilterPresent = useCallback(() => filterBy !== 'all',[]);

  const doesExternalFilterPass = useCallback((node: IRowNode<Entity>) => {
    return (
      (filterBy === "active" && node.data?.status) ||
      (filterBy === "inactive" && !node.data?.status)
    );
  },[]);

  const initGrid = useCallback((data: DataGridConfig<Entity>) =>{
    data.gridConfig.agGridOptions.onGridReady = onGridReady;
    data.gridConfig.agGridOptions.isExternalFilterPresent = isExternalFilterPresent;
    data.gridConfig.agGridOptions.doesExternalFilterPass = doesExternalFilterPass;
    setGridConfig(data)
  },[doesExternalFilterPass, isExternalFilterPresent])
  
  const applyFilter = (filter: 'all' | 'active' | 'inactive') => {
    setActiveFilter(filter);
    filterBy = filter;
    gridApi?.onFilterChanged();
  };

  useEffect(() => {
    fetch("/db.json") //db.json, DataSet100k.json, DataSet500k.json
      .then((response: Response) => response.json())
      .then((data: DataGridConfig<Entity>) => initGrid(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex-col justify-center items-center h-[100vh] bg-slate-300">
      <h1 className="text-center py-2 text-xl font-bold">AG-Grid</h1>

      <div className="pl-6 flex">
        <div className="flex space-x-4">
          <button onClick={() => applyFilter('all')} className={`px-3 py-2 rounded ${activeFilter === 'all' ? 'bg-gray-200' : ''}`}>
            All
          </button>
          <button onClick={() => applyFilter('active')} className={`px-3 py-2 rounded ${activeFilter === 'active' ? 'bg-gray-200' : ''}`}>
            Active
          </button>
          <button onClick={() => applyFilter('inactive')} className={`px-3 py-2 rounded ${activeFilter === 'inactive' ? 'bg-gray-200' : ''}`}>
            Inactive
          </button>
        </div>
      </div>
      
      {gridConfig && <DataGrid<Entity> {...gridConfig} />}
    </div>
  );
};
export default App;