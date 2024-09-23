import { EventActionType, WidgetType } from "~/types/schema/enum.type";
import { TForm } from "~/types/schema/widget.type";
import { useEvents } from "~/executableEvents/useEvents";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader } from "~/components/core/Card/Card";
import { FieldSpec } from "la-ui-schema/lib/WidgetModule";
import SubmittableForm from "./SubmittableForm";
import { executeEvent, executeEventOption } from "~/executableEvents/eventHandler";
import { cn } from "~/utils/cn";
import { RowSize } from "la-ui-schema/lib/EnumModule";
import { InjectFormAction } from "la-ui-schema/lib/CommonModule";

export function isAddWidget(type: WidgetType) {
  return type === WidgetType.Add
}

export function isWizardWidget(type: WidgetType) {
  return type === WidgetType.Wizard
}

interface AddWidgetProps {
  conf: TForm,
  id: string,
  title?: React.ReactNode
  processOnSubmit?: (data: any) => Promise<any[]>
  nestedWidget?: boolean
  isCollapsed?: boolean
  rowSize?: RowSize
}

type TCancel =  (() => void) | undefined

export default function AddWidget({ conf, id, title, nestedWidget, isCollapsed, rowSize }: AddWidgetProps) {
  const addData: any = useSelector(getAppData(id)) || null;
  
  const { processOnSubmit } = useEvents(conf, id);

  let onCancel: TCancel = conf?.targetAction ? () => {
    executeEvent<{}>({
      event: {
        action: EventActionType.InjectForm,
        injectConf: {
          source: conf?.targetId as string,
          target: id,
          action: InjectFormAction.replace
        }
      },
      conf,
      data: {},
      responses: []
    })
  } : undefined

  const onSubmit = async (data: any) => {
    if (processOnSubmit) {
      processOnSubmit(data)
    }
    if (onCancel) {
      onCancel()
    }
    return [];
  }

  const widgetSize = conf.rowSize ? `row-${rowSize}` : rowSize ? `row-${rowSize}` : ""

  return <div id={id} className={cn("widget-form flex flex-col", {
    "!border-0 !shadow-none": nestedWidget,
    [widgetSize]: widgetSize
  })}>
    <CardHeader className={cn("justify-between", {"!px-0": nestedWidget})}>
      {title}
    </CardHeader>
    <CardBody className="px-0 flex-1" hidden={isCollapsed}>
      <SubmittableForm
        nestedWidget={nestedWidget}
        rows={conf?.rows as FieldSpec[][]}
        id={id}
        formData={addData}
        type="add"
        onCancel={onCancel}
        processOnSubmit={onSubmit}
        conf={conf}
      />
    </CardBody>
  </div>
}