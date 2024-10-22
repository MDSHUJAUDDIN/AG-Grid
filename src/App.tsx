// App.tsx  
import { FC } from 'react'; 
import GenericGrid from './components/GenericGrid'; 
import { gridConfig, rowData } from './grid-config/grid-entities';
  
const App: FC = () => (  
  <div>  
    <h1 className='text-center p-4 text-xl font-bold'>Generic Grid Component</h1>  
    <GenericGrid gridConfig={gridConfig} rowData={rowData} theme="ag-theme-quartz" />
  </div>  
);  
export default App;
