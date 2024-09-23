import { WidgetType } from "~/types/schema/enum.type";
import { TFieldSpec, TForm } from "~/types/schema/widget.type";
import { Column, Row } from "~/components/core/BSGrid/BGGrid";
import { useEvents } from "~/executableEvents/useEvents";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "~/components/core/Card/Card";
import { Widget } from "./Widgets";
import ViewFieldSpec from "./ViewWidget/ViewFieldSpec";
import { RowSize } from "la-ui-schema/lib/EnumModule";
import { cn } from "@nextui-org/react";
import { useMemo } from "react";

export function isEditWidget(type: WidgetType) {
  return type === WidgetType.Editable
}

export function isViewWidget(type: WidgetType) {
  return type === WidgetType.View
}


export function isDescWidget(type: WidgetType) {
  return type === WidgetType.Desc
}

interface ViewWidgetProps {
  conf: TForm,
  id: string,
  title?: React.ReactNode
  nestedWidget?: boolean
  isCollapsed?: boolean
  rowSize?: RowSize
}

export default function ViewWidget({ conf, id, title, isCollapsed, rowSize }: ViewWidgetProps) {
  const viewData: any = useSelector(getAppData(id)) || null
  useEvents(conf, id)

  const widgetSize = conf.rowSize ? `row-${rowSize}` : rowSize ? `row-full` : ""

  const descWidget = useMemo(() => isDescWidget(conf.type), [conf.type]);

  return <div id={id} className={cn("widget-form", {
    [widgetSize]: widgetSize,
    'desc-widget-form': descWidget,
    'collapsed': isCollapsed
  })}>
    <CardHeader className={cn("justify-between", {"!pb-0 pt-4": descWidget})}>
      {title}
    </CardHeader>
    <CardBody className={cn({ "!pt-0 pb-4": descWidget})} hidden={isCollapsed}>
      {conf?.rows && Array.isArray(conf?.rows) && conf.rows.map((row, i) => {
        const rowData = viewData && viewData[i] ? viewData[i] : viewData
        return <Row key={`row-${id}-${i}`} className="!gap-0">
          {row?.map((col, j) => {
            return col ? <Column colSize={col?.colSize || 12} key={`${id}-row-${i}-col-${j}`}>
              {(col as TFieldSpec).fieldType 
                ? <ViewFieldSpec conf={col} data={rowData} id={`${id}/${col.id}`} rows={conf.rows as TFieldSpec[][]} /> 
                : <Widget form={col as TForm} id={id} nestedWidget />}
            </Column> : null
          })}
        </Row>
      })}
    </CardBody>
  </div>
}