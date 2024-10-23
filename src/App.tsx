import React from 'react'; // Corrected import statement
import './App.css';
import GridExample from './components/GridExample';

function App() {
  return (
    <div className='flex-col justify-center items-center h-[100vh] bg-slate-300'>
      <h1 className='text-center p-4 text-xl font-bold'>AG-Grid</h1>
      <GridExample />
    </div>
  );
}

export default App;

