// App.tsx
import { FC, useEffect, useState } from "react";
import DataGrid from "./components/DataGrid/DataGrid";
import { DataGridConfig } from "./components/DataGrid/DataGridConfig";
import { Entity } from "./models/Entity";
// import { gridConfig, rowData } from "./grid-config/grid-entities";

const App: FC = () => {
  const [gridConfig, setGridConfig] = useState<DataGridConfig<Entity> | null>(
    null
  );

  useEffect(() => {
    fetch("/db.json")
      .then((response: Response) => response.json())
      .then((data: DataGridConfig<Entity>) => setGridConfig(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div className='flex-col justify-center items-center h-[100vh] bg-slate-300'>
      <h1 className='text-center p-4 text-xl font-bold'>AG-Grid</h1>
      {gridConfig && <DataGrid<Entity> {...gridConfig} />}
    </div>
  );
};
export default App;
