import { useSelector } from "react-redux";
import AppBar from "~/components/AppBar";
import DialogWidget from "~/components/Widgets/DialogWidget";
import LaTabs from "~/components/HeaderTabs/LaTabs";
import { RootState } from "~/store";
import { useLocation, useNavigate } from "react-router-dom";
import { history } from '~/__helper/history';

export default function DefaultPage() {
  const tabs = useSelector((state: RootState) => state.appConf.tabs);

  history.navigate = useNavigate();
  history.location = useLocation();
  
  return (
    <div>
      <DialogWidget />
      <div className="bg-lucid-grey-100 h-[100vh] flex flex-col overflow-hidden">
        <AppBar />
        <LaTabs tabs={tabs}/>
      </div>
    </div>
  );
}
