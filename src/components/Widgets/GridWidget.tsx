import { WidgetType } from "~/types/schema/enum.type";
import { TForm } from "~/types/schema/widget.type";
import Table from "~/components/Table/Table";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import { useEvents } from "~/executableEvents/useEvents";
import { Card, CardBody, CardHeader } from "~/components/core/Card/Card";
import { GridData, TableConf } from "../Table/interfaces";
import TableToolbar from "../Table/TableToolbar";
import { TGridControls } from "~/types/schema/common.type";
import { EventType, RowSize } from "la-ui-schema/lib/EnumModule";
import { useMemo } from "react";
import { cn } from "@nextui-org/react";

export function isGridWidget(type: WidgetType) {
  return type === WidgetType.List
}

interface GridWidgetData {
  gridData: GridData
}

interface TGridWidgetProps {
  conf: TForm,
  id: string,
  title?: React.ReactNode
  isCollapsed?: boolean
  rowSize?: RowSize
}


export default function GridWidget({ conf, id, title, isCollapsed, rowSize }: TGridWidgetProps) {
  const gridWidgetData = (useSelector(getAppData(id)) || { gridData: { data: [] } }) as GridWidgetData
  const { processOnRowClick, processOnCellClick, processOnCellDoubleClick, processOnPageChange, processOnLoad, hasEvent } = useEvents(conf, id);

  const onGridPageChange = hasEvent(EventType.OnGridPageChange) ? processOnPageChange : processOnLoad
  
  const gridRowSize = useMemo(() => {
    if (conf.rowSize) return `row-${conf.rowSize}`; 
    if (rowSize) return `row-${rowSize}`;
    return "row-5"
  }, [rowSize, conf.rowSize])

  return <div id={id} className={cn(gridRowSize, "flex flex-col widget-form")}>
    <CardHeader className="items-center gap-2">
      {title ? <div className="whitespace-nowrap">
        {title}
      </div> : null}
      <TableToolbar controls={conf.gridOptions?.controls as TGridControls} />
    </CardHeader>
    <CardBody className="py-0 px-0" hidden={isCollapsed}>
      <Table
        id={id}
        gridOptions={conf.gridOptions as TableConf}
        gridData={gridWidgetData.gridData || {}}
        onRowClick={processOnRowClick}
        onCellClick={processOnCellClick}
        onCellDoubleClick={processOnCellDoubleClick}
        onGridPageChange={onGridPageChange}
      />
    </CardBody>
  </div>
}