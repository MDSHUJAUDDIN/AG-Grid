import { StatusCellRenderer } from "./StatusCellRenderer";
import { CountryCellRenderer } from "./CountryCellRenderer";
import type { CustomCellRendererProps } from "@ag-grid-community/react";
import { type FunctionComponent } from "react";

export const renderers: Record<string, FunctionComponent<CustomCellRendererProps>> = {
    "StatusCellRenderer": StatusCellRenderer,
    "CountryCellRenderer": CountryCellRenderer,
}