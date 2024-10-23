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
    fetch("/sample-data.json")
      .then((response: Response) => response.json())
      .then((data: DataGridConfig<Entity>) => setGridConfig(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <div>
      <h1 className="text-center p-4 text-xl font-bold">
        Generic Grid Component
      </h1>
      {gridConfig && <DataGrid<Entity> {...gridConfig} />}
    </div>
  );
};
export default App;
