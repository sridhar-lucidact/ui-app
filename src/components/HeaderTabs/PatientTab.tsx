
import { MouseEvent, useEffect, useState } from "react";
import { Typography } from "~/components/core/Typography/Typography";
import { useSelector } from "react-redux";
import { getAppData } from "~/store/appData";
import { TTabProps } from "~/types/components.types";
import { TPatientTabData } from "~/types/app.types";
import { findPathParamsWithConfig } from "~/utils/pathUtils";
import { useEvents } from "~/executableEvents/useEvents";
import { cn } from "@nextui-org/react";
import { TPatientTab } from "~/types/schema/tab.type";
import { removeConfig } from "~/hooks/useNewTab";
import store from "~/store";


/**
 * Component which works in Tab component and displays Patient Information 
 * 
 */
const PatientTab = ({ tab, onClick }: TTabProps) => {
    const [patientData, setPatientData] = useState<TPatientTabData>()
    useEvents(tab, tab.id)
    let tabData: any = {};
    if ((tab as TPatientTab).delete) {
      tabData = useSelector(getAppData(tab.id)) || {}
    }

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        removeConfig(tab.id)
    }

    useEffect(() => {
        if (tab.id) {
            const patientDetails: TPatientTabData = {};
            if (tabData?.name) {
                const config = findPathParamsWithConfig(tab.id)
                patientDetails.mrn = config?.pathParams?.mrn;
                patientDetails.name = tabData.name;
                patientDetails.status = tabData.status
            }

            if (patientDetails.mrn) {
                setPatientData(patientDetails);
            }
        }
    }, [tab.id, tabData])

    return (
        <div className="flex items-center px-2 justify-between min-w-40" onClick={onClick}>
            <div className="flex items-baseline">
                {patientData?.mrn ? <>
                    <div className={cn(" border-2  h-2.5 w-2.5 rounded-sm", {
                        "bg-lucid-green-300 border-lucid-green-200": patientData?.status === "active",
                        "bg-lucid-red-400 border-lucid-red-200": patientData?.status === "inactive",
                    })}>
                    </div>
                    <div className="text-left ml-1 group-data-[selected=true]:text-lucid-grey-700">
                        <Typography variant="subtitle-medium" className="tracking-normal leading-[1.2857]">
                            {patientData?.name}
                        </Typography>
                        <Typography variant="subtitle-s2" className="tracking-normal leading-[1.1667]">
                            {patientData?.mrn}
                        </Typography>
                    </div>
                </> : <>
                    <div className="animate-pulse">
                        <div className="h-[14px] bg-gray-300 rounded mt-1 mb-1"></div>
                        <div className="w-2/3 h-3 bg-gray-300 rounded mb-1"></div>
                    </div>
                </>}
            </div>
            <div className="p-3 -mr-2" tabIndex={-1} onClick={handleClose}>
                <span className="fa fa-close"></span>
            </div>
        </div>
    )
}


export default PatientTab;