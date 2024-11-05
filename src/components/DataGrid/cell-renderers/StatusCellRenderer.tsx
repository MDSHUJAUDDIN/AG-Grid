import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent } from "react";

export const StatusCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value
}) => (
  <div>
    <span>{(value ? "Active": "In Active") }</span>
  </div>
);