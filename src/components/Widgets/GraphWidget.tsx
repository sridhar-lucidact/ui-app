import { WidgetType } from "~/types/schema/enum.type";
import Chart from "~/components/Charts/Chart";
import { TForm } from "~/types/schema/widget.type";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import dottie from "dottie";
import { useEvents } from "~/executableEvents/useEvents";
import cloneDeep from "lodash/cloneDeep";
// import ViewWidget, { isViewWidget } from "./ViewWidget";
// import GraphWidget, { isGraphWidget } from "./GraphWidget";
// import GridWidget, { isGridWidget } from "./GridWidget";
// import { useEvents } from "~/executableEvents/useEvents";
// import AddWidget, { isAddWidget } from "./AddWidget";
import { Card, CardBody, CardHeader } from "~/components/core/Card/Card";
import { Divider } from "@nextui-org/react";
import { Typography } from "~/components/core/Typography/Typography";
import Button from "~/components/core/Button/Button";
import DatePicker from "../Datepicker/Datepicker";
import { RowSize } from "la-ui-schema/lib/EnumModule";
import { deepMerge } from "~/utils/objectHelper";

export function isGraphWidget(type: WidgetType) {
  return type === WidgetType.Graph
}

export interface TGraphWidgetProps {
  conf: TForm,
  id: string,
  title?: React.ReactNode
  isCollapsed?: boolean
  rowSize?: RowSize
}

export default function GraphWidget({ conf, id, title, isCollapsed, rowSize }: TGraphWidgetProps) {
  const graphData: any = useSelector(getAppData(id)) || null
  const graphConf = cloneDeep(conf);
  const { processOnPointClick } = useEvents(graphConf, id);

  
  let highChartConf: any = graphConf.graphData || {};
  if (graphData) highChartConf = dottie.transform(deepMerge(graphConf.graphData || {}, graphData));
  
  const handleClick = (data: any) => {
    const seriesIndex = data?.point?.series?.index;
    const seriesName = dottie.get(highChartConf, `series.${seriesIndex}.name`) as string;
    const options = data?.options || data?.point?.options;
    processOnPointClick(seriesName, options);
  }

  return <div id={id} className="widget-form">
  <CardHeader className="justify-between">
    <div className="flex">
      {title}
      <Divider orientation="vertical" className="h-4 ml-2 mr-1" />
      {/* <div className="flex items-end">
        <Typography variant="h2" className="text-lucid-grey-700 mr-1">190</Typography>
        <Typography variant="subtitle-medium-s2" className="text-lucid-grey-600">mmol/l</Typography>
      </div> */}
    </div>
    <div className="flex gap-1 items-center">
      <Button isIconOnly variant="bordered" size="icon-small" aria-label="Like">
        <span className="lucid-icon lucid-icon-export"></span>
      </Button>
      <DatePicker />
      <Button isIconOnly variant="bordered" size="icon-small" aria-label="Like">
        <span className="lucid-icon lucid-icon-icon-dropdown-left"></span>
      </Button>
    </div>
  </CardHeader>
  <CardBody className="py-0 px-0 h-full overflow-hidden" hidden={isCollapsed}>
    <div className="px-3">
      {graphData ? <Chart
      conf={highChartConf}
      rowSize={conf.rowSize || rowSize}
      onClick={handleClick}/>
      : <Chart
      conf={highChartConf}
      rowSize={conf.rowSize || rowSize}
      onClick={handleClick}/>}
    </div>
    </CardBody>
  </div>
}