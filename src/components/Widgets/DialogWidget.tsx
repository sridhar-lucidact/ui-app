import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "~/components/core/Modal/Modal";
import { useLocation, useNavigate  } from 'react-router-dom';
import { findPathParamsWithConfig } from "~/utils/pathUtils";
import { findTabData } from "~/hooks/useTabs";
import Tabs from "~/components/core/Tabs/Tabs";
import Tab from "~/components/core/Tabs/Tab";
import { Layout } from "~/components/Layouts/Layout";
import TitleBar from "~/components/TitleBar/TitleBar";
import UserSettings from "~/components/UserSettings/UserSettings";
import { TTitleBar } from "~/types/schema/titlebar.type";
import { THeaderTab, TLaTab, TTab as TSubTab, TTab } from "~/types/schema/tab.type";

export default function Dialog(){
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TLaTab>();
  const [activeSubTabId, setSubActiveTabId] = useState<string>("")
  const [subTab, setSubTab] = useState<TSubTab>();

  useEffect(() => {
    if (location.hash.includes("dialog")) {
      onOpen()
      let paramsAndConf = findPathParamsWithConfig(location.hash)
      if (paramsAndConf) {
        // paramsAndConf.tab = paramsAndConf.tab as THeaderTab;
        setActiveTab(paramsAndConf.tab);
        if ((paramsAndConf.tab as THeaderTab).subTabs) {
          const subTabs = (paramsAndConf.tab as THeaderTab).subTabs as TTab[]
          const tabData = findTabData(subTabs, location.hash);
          setSubActiveTabId(tabData.activeTab.id)
          setSubTab(tabData.activeTab)
        } else {
          const subTab = paramsAndConf.tab as TSubTab;
          setSubTab(subTab)
        }
      }
    } else {
      onClose()
    }
  }, [location]);

  const onModalClose = () => {
    navigate(location.pathname)
  }

  const onSubTabChange = (key: React.Key) => {
    if (activeSubTabId !== key) {
      const hash = `${activeTab?.id}/${key}`;
      const tabData = findTabData((activeTab as THeaderTab)?.subTabs || [], hash);
      setSubActiveTabId(key as string);
      setSubTab(tabData.activeTab);
      //navigate({hash: `#!/dialog/${hash}`});
    }
  }

  const contentId = ["dialog", activeTab?.id]
  if (activeTab && activeSubTabId && activeSubTabId !== activeTab.id) contentId.push(activeSubTabId)

  const isUserSettings = activeTab?.id === "settings";
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onModalClose}
      classNames={{ wrapper: "dialog-wrapper"}}
      isDismissable={false}
      size="5xl"
      // scrollBehavior="inside"
    >
      <ModalContent className="modal-content">
        <>
          <ModalHeader className="flex flex-col gap-1">
            <TitleBar conf={activeTab as TTitleBar} id={activeTab?.id} />
          </ModalHeader>
          <ModalBody>
            {activeTab && (activeTab as THeaderTab).subTabs ? 
              <div className="border-b -mt-4">
                <Tabs variant="underlined" onSelectionChange={onSubTabChange} selectedKey={activeSubTabId}>
                  {(activeTab as THeaderTab).subTabs?.map(tab => <Tab key={tab.id} title={tab.title} />)}
                </Tabs>
              </div>
            : null }
            <div className="overflow-hidden">
              {isUserSettings ? <UserSettings active={activeSubTabId} /> : subTab?.layoutContent && <Layout conf={subTab} id={contentId.join("/")} />}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}