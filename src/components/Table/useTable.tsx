import { useEffect, useRef, useState } from "react";
import { debounce, isEqual } from "lodash";
import { ColDef } from "@ag-grid-community/core";
import { TableProps } from "./interfaces";


export default function useTable(props: TableProps) {
  const { gridOptions, onRowClick, onCellClick, onCellDoubleClick, gridData } = props
  const [colDefs, setColDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const doubleClicked = useRef(false);
  const doubleClickTimer = useRef<any>(null);

  useEffect(() => {
    setRowData(gridOptions.rowData || [])
  }, [gridOptions.rowData])

  useEffect(() => {
    if (gridData?.data && !isEqual(rowData, gridData.data))
    setRowData(gridData.data)
  }, [gridData])

  useEffect(() => {
    setColDefs(gridOptions.columnDefs || [])
  }, [gridOptions.columnDefs])

  const handleRowClick = ({ data }: { data: object}) => {
    onRowClick(data);
  }
  

  const handleCellClick = debounce(({ data, colDef }: { data: object, colDef: ColDef}) => {
    if (!doubleClicked.current) {
      onCellClick(colDef.field as string, data)
    }
  }, 250)
  
  const handleCellDbClick = ({ data, colDef }: { data: object, colDef: ColDef}) => {
    if (doubleClickTimer.current) {
      clearTimeout(doubleClickTimer.current);
    }

    doubleClicked.current = true;
    onCellDoubleClick(colDef.field || colDef.headerName as string, data);
    doubleClickTimer.current = setTimeout(() => {
      doubleClicked.current = false;
    }, 250)
  }

  return { colDefs, rowData, handleRowClick, handleCellClick, handleCellDbClick }
}