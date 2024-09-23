import { useEffect, useState } from "react";
import { TTitleBar } from "~/types/schema/titlebar.type";
import { TForm } from "~/types/schema/widget.type";

const getCollapsed = (conf: TTitleBar) => {
  let collapse = conf?.controls?.collapse || false;
  collapse = collapse ? collapse === "Accordion" : false;
  return collapse;
}

const getCollapsedMap = (forms: TForm[]) => {
  const collapsedMap: Record<string, boolean> = {};
  forms.forEach(form => {
    collapsedMap[form.id] = getCollapsed(form?.titleBar as TTitleBar);
  })
  return collapsedMap;
}

const useCollapsible = (conf: TTitleBar, forms: TForm[]) => {
  const [collapsed, setCollapsed] = useState<boolean>(getCollapsed(conf));
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>(getCollapsedMap(forms));

  useEffect(() => {
    setCollapsedMap(getCollapsedMap(forms));
  }, [forms]);

  const setCollapsedForm = (id: string, value: boolean) => {
    if (!id) return;
    const isAccordion = conf?.controls?.collapse === "Accordion";
    if (isAccordion && !value) {
      const collapsedMap: Record<string, boolean> = {};
      forms.forEach(form => {
        collapsedMap[form.id] = true;
      })
      collapsedMap[id] = value;
      console.log('collapsedMap', collapsedMap)
      setCollapsedMap(collapsedMap);
    } else {
      setCollapsedMap({
        ...collapsedMap,
        [id]: value
      })
    }
  }

  return {
    collapsed,
    setCollapsed,
    collapsedMap,
    setCollapsedMap,
    setCollapsedForm
  }
}

export default useCollapsible;