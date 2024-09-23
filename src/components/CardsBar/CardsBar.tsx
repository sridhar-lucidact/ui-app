import { cn } from "@nextui-org/react";
import React, { useMemo } from "react";
import { Card,CardBody,CardHeader } from "~/components/core/Card/Card";
import Sparkline from "~/components/Charts/SparklineChart";
import { useEvents } from "~/executableEvents/useEvents";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import TitleBar from "~/components/TitleBar/TitleBar";
import Button from "~/components/core/Button/Button";
import dottie from "dottie";
import { cloneDeep } from "lodash";
import { TCardBarSchema, TCardSchema } from "~/types/schema/card.type";
import { TGraphData, TText } from "~/types/schema/common.type";
import { EventType } from "~/types/schema/enum.type";
import { RowSize } from "la-ui-schema/lib/EnumModule";
import { getUiConf } from "~/store/uiConf";
import { checkHidden } from "~/utils/confUtils";
import { deepMerge } from "~/utils/objectHelper";

export function isCardBar(conf: any): conf is TCardBarSchema {
  return !!(conf as TCardBarSchema).cards
}

interface TCardData {
  value: TText;
  subValue?: TText;
  graphData?: TGraphData
}

type TCardDataMini = Omit<TCardData, "graphData">;

type TCardContent = [TCardDataMini, TCardDataMini] | TCardData

interface TCardBodyTextProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  value: TText,
  subValue?: TText,
  data?: TText,
  graphData?: TGraphData,
}

function CardBodyText({ value, className, data }: TCardBodyTextProps) {
  return <div className={className} style={{ color: data?.color || value.color }}>
    {value.icon ? <span className="mr-1">{data?.icon || value.icon}</span> : ""} {data?.text || value.text}
  </div>
}

function CardBodyChart({ conf, data }: { conf: TGraphData, data?: TGraphData }) {
  let sparklineConf: TGraphData = cloneDeep(conf) as TGraphData;
  if (data) sparklineConf = dottie.transform(deepMerge(sparklineConf || {}, data))
  return <Sparkline conf={sparklineConf} />
}

function CardBodyContent({ conf, data }: { data?: TCardBodyTextProps, conf: TCardBodyTextProps }) {
  
  const { value, subValue, graphData } = conf;
  return <div className="flex-1 overflow-hidden">
    <div className="row items-end no-wrap">
      <div className={cn('flex items-end overflow-hidden col-12', {
        'col-md-12': !graphData,
        'col-md': graphData
      })}>
        {value && <CardBodyText value={value} data={data?.value} className="text-xl leading-none"/>}
        {!value && data?.value && <CardBodyText value={data.value} className="ml-1 text-xl leading-none"/>}
        {subValue && <CardBodyText value={subValue as TText} data={data?.subValue} className="truncate ml-1 text-xs text-slate-500 font-medium leading-1" />}
        {!subValue && data?.subValue && <CardBodyText value={data.subValue} className="truncate ml-1 text-xs text-slate-500 font-medium leading-1" />}
      </div>
      {graphData && <div className="col !pl-0"><CardBodyChart conf={graphData} data={data?.graphData} /></div>}
    </div>
  </div>
}

function CardData({ data, apiData }: { data?: TCardContent , apiData?: any }) {
  let cardData: [TCardData] = data as unknown as [TCardData]
  if (data && !Array.isArray(data)) cardData = [data];
  if (apiData && !Array.isArray(apiData)) apiData = [apiData];

  if (data) {
    return cardData?.map((d, i) => {
      return <CardBodyContent
        key={`card-body-content-${i}`}
        conf={d}
        data={apiData && apiData[i] ? apiData[i] : null}
      />
    })
  } else if (apiData) {
    return apiData?.map((d: TCardBodyTextProps, i: number) => {
      return <CardBodyContent
        key={`card-body-content-${i}`}
        conf={data ? data[i] : d}
        data={d}
      />
    })
  }
  return null;
}

function CardsBarCard({ conf, id, rowSize }: { conf: TCardSchema, id?: string, rowSize?: RowSize }) {
  const cardData: any = id ? useSelector(getAppData(id)) : null
  const uiConf: TCardSchema | null = useSelector(getUiConf(id || "")) as TCardSchema || null;

  const { processOnClick, hasEvent } = useEvents(conf, id)

  const isHidden = useMemo(() => {
    return checkHidden(conf, undefined, uiConf, false);
  }, [conf, uiConf]);
  
  if (isHidden) return null;
  
  const handleClick = () => {
    processOnClick(cardData)
  }

  const hasClickEvent = hasEvent(EventType.OnClick);

  return <div
    className={cn("min-w-[241px] col-12", { 
      [`col-md-${conf.colSize}`]: conf.colSize,
      'col-md-auto !max-w-[241px]': !conf.colSize 
    })}
    id={id}
  >
    <Card className={cn("w-full", {"row-1": !rowSize, [`row-${rowSize}`]: rowSize })}>
      <CardHeader className="justify-between p-2 pl-4 h-10">
        <TitleBar conf={conf.titleBar} id={id}></TitleBar>
        {hasClickEvent && <Button onClick={handleClick} isIconOnly variant="bordered" size="icon-small" aria-label="Like">
          <span className="lucid-icons lucid-icon-icon-arrow-right"></span>
        </Button>}
      </CardHeader>
      <CardBody className="px-4 pb-5">
        <div className="flex items-end overflow-hidden">
          <CardData data={conf?.cardContent} apiData={cardData} />
        </div>
      </CardBody>
    </Card>
  </div>
}

export default function CardsBar({ conf, id }: { conf: TCardBarSchema, id?: string }) {
  const data = id ? useSelector(getAppData(id)) : null;
  const uiConf: TCardBarSchema | null = useSelector(getUiConf(id || "")) as TCardBarSchema || null;

  const { processOnClick } = useEvents(conf, id)

  const isHidden = useMemo(() => {
    return checkHidden(conf, undefined, uiConf, false);
  }, [conf, uiConf]);
  
  if (isHidden) return null;

  const handleClick = () => {
    processOnClick(data)
  }
  return <div id={id}>
      <div className="row" onClick={handleClick}>
        {conf?.cards?.map((card, index) => <CardsBarCard
          key={`${index}-${id}/${card.id}`}
          conf={card}
          id={`${id}/${card.id}`}
        />)}
      </div>
    </div>
}
