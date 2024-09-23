
import Tabs from "~/components/core/Tabs/Tabs";
import Tab from "~/components/core/Tabs/Tab";
import { useTabs } from "~/hooks/useTabs";
import { Layout } from "~/components/Layouts/Layout";
import { Typography } from "~/components/core/Typography/Typography";
import PatientTab from "./PatientTab";
import { TTabProps } from "~/types/components.types";
import { THeaderTab, TLaTab, TPatientTab } from "~/types/schema/tab.type";
import { HTMLAttributes, MouseEvent } from "react";


function TabTitle({ tab, onClick }: TTabProps) {

  const handleClick = (e: MouseEvent<HTMLDivElement> | string) => {
    if(onClick) onClick(tab.id as string)
  }

  if ((tab as TPatientTab).delete) {
    return <PatientTab tab={tab} onClick={handleClick} />
  }

  return <div className="text-left p-4" onClick={handleClick}>
    <div className="flex items-center space-x-2">
      <span className="flex items-center space-x-1">
        {(tab as THeaderTab).icon ? <span className={(tab as THeaderTab).icon}></span> : null}
        <Typography variant="subtitle-medium">{tab.title}</Typography>
      </span>
    </div>
  </div>
}

export interface LaTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TLaTab[]
}

export default function LaTabs({ tabs }: LaTabsProps) {
  if (!tabs) return null;
  const { activeTabId, subTabs, activeSubTabId, activeTab, onTabChange, onSubTabChange } = useTabs(tabs)
  if (!activeTabId) return null;

  const contentId = [activeTabId]
  if (activeTab && activeSubTabId && activeSubTabId !== activeTabId) contentId.push(activeSubTabId)


  const handleTabClick = (e: MouseEvent<HTMLDivElement> | string) => {
    onTabChange(e as string);
  }

  return <div className="flex flex-col grow overflow-hidden">
    <div className="bg-lucid-grey-800">
      <Tabs
        selectedKey={activeTabId}
        tabButtonClassName="!p-0"
      >
        {tabs.map(tab => <Tab 
          key={tab.id}
          title={<TabTitle tab={tab as TLaTab} onClick={handleTabClick}/>}
        />)}
      </Tabs>
    </div>
    {subTabs && subTabs.length ? <div className="px-4">
      <div className="border-b">
        <Tabs
          onSelectionChange={onSubTabChange}
          selectedKey={activeSubTabId}
          variant="underlined"
        >
          {subTabs.map(tab => <Tab key={tab.id} title={tab.title} />)}
        </Tabs>
      </div>
    </div> : null}
    
    <div className="p-4 overflow-auto grow-1 h-full">
      {activeTab?.layoutContent && <Layout conf={activeTab} id={contentId.join("/")} />}
    </div>
  </div>
}