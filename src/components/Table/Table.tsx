import {
  createRef,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { AgGridReact } from "@ag-grid-community/react";
import {
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ModuleRegistry,
  RowModelType,
  Module,
  RowClickedEvent,
  CellClickedEvent,
  CellDoubleClickedEvent,
  GridReadyEvent,
  GetRowIdParams
} from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { GridData, TableProps } from "./interfaces";
import { LicenseManager } from "@ag-grid-enterprise/core";
import useTable from "./useTable";
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-balham.css"; // Optional Theme applied to the grid
import "./table.css";
import { isEqual } from "lodash";

LicenseManager.setLicenseKey(import.meta.env.VITE_APP_AG_GRID_ENTERPRISE_KEY);

ModuleRegistry.registerModules([
  ColumnsToolPanelModule,
  MenuModule,
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  InfiniteRowModelModule,
  RangeSelectionModule as Module,
  StatusBarModule as Module
]);

const getFirstResponseValue: any = (data: any) => {
  let firstResponse = data;
  if (Array.isArray(data)) {
    firstResponse = data[0];
  }
  if (Array.isArray(firstResponse)) return getFirstResponseValue(firstResponse);
  if (firstResponse && firstResponse.gridData) return firstResponse.gridData
  return {
    data: []
  }
}

// enables pagination in the grid
const defaultPagination = false;
// sets 10 rows per page (default is 100)
const defaultPageSize = 10;
// allows the user to select the page size from a predefined list of page sizes
const defaultPageSizeOptions = [10, 20, 50, 100];
// number of rows cached
const defaultCacheBlockSize = 100
// tells ag grid to use server side or not
const defaultRowModelType = 'serverSide';

export default function Table(props: TableProps) {
  const gridRef = createRef<AgGridReact<any>>()
  const { onGridPageChange, gridOptions, gridData } = props;
  const {
    colDefs,
    rowData,
    handleRowClick,
    handleCellClick,
    handleCellDbClick
  } = useTable(props);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
      resizable: true
    };
  }, []);

  const getRows = useCallback(async (params: IServerSideGetRowsParams) => {
    const { startRow = 0, endRow = 0 } = params.request;
    const pageSize = endRow - startRow;
    const currentPage = Math.floor(startRow / pageSize);
    const response: any = await onGridPageChange({ ...params.request, currentPage });
    const firstResponse = getFirstResponseValue(response) as GridData
    params.success({
      rowData:  firstResponse?.data,
      rowCount: firstResponse?.totalRecords || firstResponse?.data?.length,
    });
  }, [])


  const pagination = useMemo(() => {
    return gridOptions.pagination?.pagination || defaultPagination
  }, [])

  const pageSize = useMemo(() => {
    let size = gridOptions?.pagination?.pageSize ?? defaultPageSize
    if (!gridOptions.pagination) size = 100
    return size
  }, [])

  const rowModelType: RowModelType = useMemo(() => {
    if (pagination) {
      return defaultRowModelType
    }
    return "clientSide"
  }, [])

  let serverSideDatasource: IServerSideDatasource | undefined = useMemo(() => {
    if (pagination) {
      return { getRows }
    }
    return undefined
  }, [])


  // const onRowClick = (event: RowClickedEvent<any>) => {
  //   const response = handleRowClick(event)
  // }
  
  // const onCellClick = (event: CellClickedEvent<any>) => {
  //   const response = handleCellClick(event)
  // }
  
  // const onCellDoubleClick = (event: CellDoubleClickedEvent<any>) => {
  //   const response = handleCellDbClick(event)
  // }

  useEffect(() => {
    if (!pagination) {
      onGridPageChange({})
    }
  }, [])

  const getAllRows = () => {
    const gridApi = gridRef?.current?.api;
    if (gridApi) {
      const rows: any[] = []
      gridApi.forEachNode(row => rows.push(row))
      return rows;
    }
    return []
  }

  const updateRowData = (data: any) => {
    const gridApi = gridRef?.current?.api;
    const rows = getAllRows();
    const rowData = rows.map(row => row.data);
    if (gridApi && !isEqual(data, rowData) && pagination) {
      let newRowCount = gridData?.totalRecords || 0
      if (data.length < pageSize) {
        newRowCount = data.length
      }
      gridApi.setRowCount(newRowCount)
      gridApi.applyServerSideTransaction({
        add: data
      });
    }
  }

  useEffect(() => {
    updateRowData(rowData);
  }, [rowData])

  const getRowId = useCallback(
    (params: GetRowIdParams) => {
      let id = params.data?.id;
      const fields = Object.keys(params.data);
      if (fields.includes("mrn")) {
        id = params.data?.mrn
      }

      if (!id) {
        const field = fields.find(field => field.endsWith("Id") || field.endsWith("Id"))
        if (field) id = params.data?.[field];
      }
      return id;
    },
    []
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    let datasource = undefined;
    if (pagination) {
      datasource = { getRows }
    }
    // register the datasource with the grid
    params.api.setGridOption("serverSideDatasource", datasource);
  }, []);

  return (
    <div className="ag-theme-balham la-grid-theme w-full h-full">
      <AgGridReact
        ref={gridRef}
        // statusBar={{
        //   statusPanels: [
        //       { statusPanel: 'agTotalAndFilteredRowCountComponent' },
        //       { statusPanel: 'agTotalRowCountComponent' },
        //       { statusPanel: 'agFilteredRowCountComponent' },
        //       { statusPanel: 'agSelectedRowCountComponent' },
        //       { statusPanel: 'agAggregationComponent' }
        //   ]
        // }}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        // onRowClicked={onRowClick}
        // onCellClicked={onCellClick}
        // onCellDoubleClicked={onCellDoubleClick}
        onRowClicked={handleRowClick}
        onCellClicked={handleCellClick}
        onCellDoubleClicked={handleCellDbClick}
        pagination={pagination}
        paginationPageSize={pageSize}
        paginationPageSizeSelector={defaultPageSizeOptions}
        cacheBlockSize={defaultCacheBlockSize}
        rowModelType={rowModelType}
        serverSideDatasource={serverSideDatasource}
        enableRangeSelection={true}
        // onGridReady={onGridReady}
        getRowId={getRowId}
      />
    </div>
  );
};