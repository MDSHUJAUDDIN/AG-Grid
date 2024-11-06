import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent } from "react";

export const StatusCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
}) => (
  <div>
    <span>
      <div
        className={`inline-flex h-6 items-center justify-center border-2 font-bold px-2.5 py-1 rounded-full text-sm ${
          value
            ? "border-green-300 bg-green-100 text-green-700"
            : "border-red-300 bg-red-100 text-red-700"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-2 ${
            value ? "bg-green-800" : "bg-red-800"
          }`}
        ></span>
        {value ? "Active" : "In Active"}
      </div>
    </span>
  </div>
);