import { TForm, TWidget} from "~/types/schema/widget.type";
import TitleBar from "~/components/TitleBar/TitleBar";
import ViewWidget, { isViewWidget, isEditWidget, isDescWidget } from "./ViewWidget";
import GraphWidget, { isGraphWidget } from "./GraphWidget";
import GridWidget, { isGridWidget } from "./GridWidget";
import { useEvents } from "~/executableEvents/useEvents";
import AddWidget, { isAddWidget, isWizardWidget } from "./AddWidget/AddWidget";
import { useEffect, useMemo, useState } from "react";
import { RowSize } from "la-ui-schema/lib/EnumModule";
import { Card, CardHeader } from "~/components/core/Card/Card";
import { useSelector } from "react-redux";
import { getUiConf } from "~/store/uiConf";
import { checkHidden } from "~/utils/confUtils";
import { Column, Row } from "../core/BSGrid/BGGrid";
import { cn } from "@nextui-org/react";
import { cloneDeep, isEqual } from "lodash";
import useCollapsible from "~/hooks/useCollapsible";
import { TTitleBar } from "~/types/schema/titlebar.type";
import { deepMerge } from "~/utils/objectHelper";
// import EditWidget, { isEditWidget } from "./ViewWidget";

export function isWidget(conf: any): conf is TWidget {
  return !!(conf as TWidget).form
}

export interface TWidgetProps {
  form: TForm
  id: string 
  nestedWidget?: boolean,
  rowSize?: RowSize
  isWidgetCollapsed?: boolean
  title?: JSX.Element
  collapsed?: boolean
  onCollapseChange?: (id: string, collapse: boolean) => void
  index?: number
}

export function Widget({ form, id, nestedWidget, title, rowSize, index, collapsed, onCollapseChange }: TWidgetProps) {
  const formId = form.id;
  const formType = form.type;
  const formWidgetId = `${id}/${formId}`;

  const uiConf: TForm | null = useSelector(getUiConf(formWidgetId)) as TForm || null;
  const [formConf, setFormConf] = useState<TForm>(form);

  useEffect(() => {
    const newFormConf = deepMerge({}, cloneDeep(form), cloneDeep(uiConf));
    if (!isEqual(formConf, newFormConf)) setFormConf(newFormConf);
  }, [form, uiConf, formConf])

  const isHidden = useMemo(() => {
    // console.log('uiConf', uiConf, form)
    return checkHidden(form, undefined, uiConf, false);
  }, [form, uiConf]);
  
  if (isHidden) return null;

  const handleCollapse = (collapse: boolean) => {
    if (onCollapseChange) onCollapseChange(formId, collapse);
  }

  const formTitle = form?.titleBar ? <TitleBar
    conf={form?.titleBar as TTitleBar}
    isCollapsed={collapsed}
    onCollapseChange={handleCollapse}
    id={formWidgetId}
    // onCollapseChange={onCollapseChange}
  /> : title;
  
  const formProps = {
    title:formTitle,
    // key:`${id}-${formId},`,
    conf: formConf,
    id: formWidgetId,
    isCollapsed: collapsed,
    rowSize: rowSize
  }

  switch(true) {
    case isViewWidget(formType):
    case isEditWidget(formType):
    case isDescWidget(formType):
      return <ViewWidget
        {...formProps}
        nestedWidget={nestedWidget}
      />
    case isAddWidget(formType):
    case isWizardWidget(formType):
      return <AddWidget
        {...formProps}
        nestedWidget={nestedWidget}
      />
    case isGraphWidget(formType):
      return <GraphWidget
        {...formProps}
      />
    case isGridWidget(formType):
      return <GridWidget
        {...formProps}
      />
    default:
      return null;
  }
}

export default function Widgets({ conf, id }: { conf: TWidget, id: string }) {
  useEvents(conf, id);
  const uiConf: TWidget | null = useSelector(getUiConf(id)) as TWidget || null;
  const forms: TForm[] = conf?.form || [];
  const { collapsed, setCollapsed, collapsedMap, setCollapsedForm } = useCollapsible(conf?.titleBar as TTitleBar, forms);

  const hasFormTitle = useMemo(() => {
    return forms.some(form => !!form.titleBar?.title) && conf?.titleBar?.title
  }, [forms])

  const isHidden = useMemo(() => {
    return checkHidden(conf, undefined, uiConf, false);
  }, [conf, uiConf]);

  if (isHidden) return null;

  const handleCollapse = (collapse: boolean) => {
    setCollapsed(collapse)
  }

  const widgetTitleBar = <TitleBar
    conf={conf.titleBar as TTitleBar}
    isCollapsed={collapsed}
    onCollapseChange={handleCollapse}
    id={id}
  />

  return forms.length > 0 ? <>
    <Card id={id} className={cn({
      [`row-${conf.rowSize} overflow-y-auto box-content`]: conf.rowSize
    })}>
      {hasFormTitle ? <CardHeader className="justify-between">
        {widgetTitleBar}
      </CardHeader> : null}
      <Row className="!gap-0">
        {forms.map((d, index) => {
          return <Column colSize={d?.colSize || 12} key={`${index}-${id}/${d.id}`}>
            <Widget
              form={d}
              id={id}
              rowSize={conf.rowSize}
              collapsed={collapsedMap[d.id]}
              onCollapseChange={setCollapsedForm}
              title={widgetTitleBar}
              index={index}
            />
          </Column>
        })}     
      </Row>
    </Card>
  </> : null
}