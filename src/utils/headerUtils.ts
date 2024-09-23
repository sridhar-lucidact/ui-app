import { TLaTab, TTab } from "~/types/schema/tab.type";

export function findDefaultTab(tabs: TLaTab[] | TTab[]) {
  return tabs.find(tab => tab.isActive)
}

export function findTab<T extends TLaTab>(tabs: TLaTab[] | TTab[], headerTabId: React.Key) {
  return tabs.find(tab => tab.id === headerTabId || "/" + tab.id === headerTabId) as T;
}