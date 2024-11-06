import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent } from "react";

export const StatusCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value
}) => (
  <div>
    <span>{(value ? <div className="inline-flex h-6 items-center justify-center border-2 border-green-300 bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full text-sm">
      <span className="w-2 h-2 bg-green-800 rounded-full mr-2 "></span>Active</div>: 
    <div className="inline-flex items-center h-6 justify-center border-2 border-red-300 bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded-full text-sm">
      <span className="w-2 h-2 bg-red-800 rounded-full mr-2"></span>In Active</div>) }</span>
  </div>
);