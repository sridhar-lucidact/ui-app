import { ColDef } from "@ag-grid-community/core";
import { TGridOptions } from "~/types/schema/common.type";

export interface LaTableDataWithId extends LaTableData {
  [key: string]: string
}

export interface LaTableData {
  [key: string]: any
}

export type TableConf = TGridOptions & {
  rowData?: any[],
  columnDefs?: ColDef[]
}

export interface GridData {
  data: object[],
  totalRecords: number
}

export type TableProps = {
  id: string
  gridOptions: TableConf
  gridData?: GridData
  onGridPageChange: (data: object) => any
  onRowClick: (data: object) => void
  onCellClick: (fieldName: string, data: object) => void
  onCellDoubleClick: (fieldName: string, data: object) => void
}