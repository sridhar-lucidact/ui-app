import { Button } from "@nextui-org/react";
import { Typography } from "~/components/core/Typography/Typography";
import { TTitleBar } from "~/types/schema/titlebar.type";
import { TForm, TTitleBarControls, TWidget } from "~/types/schema/widget.type";
import IconButton from "../core/Button/IconButton";
import { cn } from "~/utils/cn";
import { executeEventOption } from "~/executableEvents/eventHandler";
import { TEvent } from "~/types/schema/common.type";
import { useEvents } from "~/executableEvents/useEvents";
import { getAppData } from "~/store/appData";
import { useSelector } from "react-redux";
import { getUiConf } from "~/store/uiConf";
import { useEffect, useRef, useState } from "react";
import { deepMerge } from "~/utils/objectHelper";
import { cloneDeep } from "lodash";

export interface TTitleBarControlProps {
  controls?: TTitleBarControls
  isCollapsed?: boolean
  onCollapseChange?: (collapse: boolean) => void
  id?: string
}

function TitleBarControls({ controls, isCollapsed, onCollapseChange, id }: TTitleBarControlProps) {
  const data = id ? useSelector(getAppData(id)) : null;
  const conf = {
    events: controls?.pointer
  } as unknown as TForm

  const { processOnClick, hasEvent } = useEvents(conf, id);
  const handleCollapse = () => {
    if (onCollapseChange) onCollapseChange(!isCollapsed);
  }

  const handlePointer = () => {
    if (controls?.pointer) {
      processOnClick(data)
    }
  }

  return <div>
    {controls?.collapse !== undefined && <IconButton
      icon={cn('transform lucid-icon lucid-icon-icon-dropdown-up', { 'transform scale-y-[-1]': isCollapsed})}
      size="icon-small"
      onClick={handleCollapse}
    />}
    {controls?.pointer && <IconButton
      icon={cn('lucid-icon lucid-icon-icon-arrow-right')}
      size="icon-small"
      onClick={handlePointer}
    />}  
  </div>
}

export interface TTitleBarProps { 
  conf: TTitleBar
  isCollapsed?: boolean
  onCollapseChange?: (collapse: boolean) => void
  id?: string
}

export default function TitleBar({ conf, isCollapsed, onCollapseChange, id }: TTitleBarProps) {
  let uiConf: TWidget | null = id ? useSelector(getUiConf(id)) as TWidget || null : null;
  const uiTitleConf = uiConf?.titleBar;
  const [titleBarConf, setTitleBarConf] = useState(conf);

  useEffect(() => {
    if (conf && uiTitleConf) {
      const newConf = deepMerge({}, cloneDeep(conf), cloneDeep(uiTitleConf));
      setTitleBarConf(newConf);
    }
  }, [uiTitleConf, conf])

  return <div className="flex items-center justify-between w-full titlebar">
    <div>
      <Typography variant="subtitle-medium-s2" className="text-lucid-grey-900 title">{titleBarConf?.title}</Typography>
    </div>
    <TitleBarControls
      controls={titleBarConf?.controls}
      isCollapsed={isCollapsed}
      onCollapseChange={onCollapseChange}
      id={id}
    />
  </div>
}