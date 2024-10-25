import { themeQuartz, iconSetMaterial } from '@ag-grid-community/theming';
//default provided themes: themeQuartz, themeBalham, themeAlpine & themeMaterial
export const DataGridTheme = themeQuartz
    .withPart(iconSetMaterial)
    .withParams({
        //iconSize: 16,
        //oddRowBackgroundColor: '#FAFAFA',
        //rowHoverColor: "#c3defa",
        //rowBorder: "none",
        //selectedRowBackgroundColor: "#80bbff",
    });