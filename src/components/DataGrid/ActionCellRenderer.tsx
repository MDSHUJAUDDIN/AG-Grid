import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent} from "react";

export const ActionCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = () => {

  return (
    <div className="flex  justify-center items-center">
      <button 
        className=" rounded-sm px-4 text-center"
        onClick= {()=>{return console.log("Clicked!");}}
      >
       <span className="ag-icon ag-icon-menu" unselectable="on" role="presentation"></span>
      </button>
    </div>
  );
};