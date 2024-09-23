import { useLocation, useNavigate  } from 'react-router-dom';
import React, { useEffect, useRef, useState } from "react";
import { findDefaultTab } from "~/utils/headerUtils";
import { findPathParamsWithConfig } from "~/utils/pathUtils";
import { addConfig } from "./useNewTab";
import { THeaderTab, TLaTab, TTab } from '~/types/schema/tab.type';


export const findTabByKey = (tabs: TLaTab[] | TTab[], pathname: string, level = "top") =>  {
  // console.log("findTabByKey")
  if (pathname.startsWith("/")) pathname = pathname.replace("/", "")
  let tab: TLaTab | TTab | undefined;
  tab = tabs.find(tab => pathname.includes(tab.id || ""))
  if (!tab && level === "top" && !pathname.includes("dialog")) {
    tab = findPathParamsWithConfig(pathname)?.tab
    if (tab && Object.keys(tab).length > 0) {
      addConfig(tab)
    }
  }
  if (!tab) tab = findDefaultTab(tabs);
  if (!tab && tabs[0]) tab = tabs[0]
  return tab;
}

export const findTabData = (tabs: TLaTab[], key: string) => {
  // console.log('findTabData')
  const activeHeaderTab = findTabByKey(tabs, key) as TLaTab
  const subTabs: TTab[] = (activeHeaderTab as THeaderTab)?.subTabs ?? []
  let activeTab = findTabByKey(subTabs, key, "second") as TTab;
  if (!activeTab) {
    activeTab = activeHeaderTab as TTab
  }

  const path = [activeHeaderTab.id]
  let subTabId = "";
  
  if (activeTab?.id && activeHeaderTab.id !== activeTab.id) {
    subTabId = activeTab.id;
    path.push(activeTab.id)
  }

  return {
    id: activeHeaderTab.id,
    subTabId: subTabId,
    subTabs: subTabs,
    activeTab: activeTab,
    path: path.join("/")
  }    
}

export function useTabs(tabs: TLaTab[]) {
  const pathname = React.useRef("");
  const [activeTabId, setActiveTabId] = useState<string>("")
  const [activeSubTabId, setActiveSubTabId] = useState<string>("")
  const [subTabs, setSubTab] = useState<TTab[]>([]);
  const [activeTab, setActiveTab] = useState<TTab>();
  const mounted = useRef(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const onTabChange = (key: React.Key) => {
    if (activeTabId !== key) {
      setAndNavigate(tabs, key as string)
    }
  }

  const onSubTabChange = (key: React.Key) => {
    if (activeSubTabId !== key) {
      setAndNavigate(tabs, `${activeTabId}/${key}`)
    }
  }

  const setAndNavigate = (tabs: TLaTab[], key: string) => {
    const { id, subTabId, subTabs, activeTab, path } = findTabData(tabs, key);
    pathname.current = `/${path}`;
    navigate(`/${path}`)
    setActiveTabId(id || "");
    setActiveSubTabId(subTabId);
    setSubTab(subTabs);
    setActiveTab(undefined);
    setTimeout(() => {
      setActiveTab(activeTab);
    }, 250)
  }  
  
  const onMount = (tabs: TLaTab[]) => {
    const { id, subTabId, subTabs, activeTab, path } = findTabData(tabs, location.pathname);
    
    if (!location.pathname.includes(path)) {
      navigate(`/${path}`);
    }

    setActiveTabId(id || "");
    setActiveSubTabId(subTabId);
    setSubTab(subTabs);
    setActiveTab(activeTab);

    setTimeout(() => {
      mounted.current = true
    }, 1000)
    
  }

  useEffect(() => {
    if (!mounted.current) return;
    onMount(tabs)
  }, [location.pathname, tabs])

  useEffect(() => {
    // console.log('use effect on mount')
    onMount(tabs)
  }, [])

  return { activeTabId, subTabs, activeSubTabId, activeTab, onTabChange, onSubTabChange };
}