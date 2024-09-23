import { PageType } from './EnumModule';
import { HeaderTab, Tab } from './TabModule';
import { getLayoutContent, setActiveTab, setId } from './Utils';
//import { subTabs } from '../spec/clinic/dashboard/subTabs';

const adminHeaderTabs = ():HeaderTab[] => {
    const headerTabs = <HeaderTab[]>[
        {
            title: 'Dashboard',
            isActive: true,
            icon: 'fa-info'
        },
        {
            title: 'Users',
            icon: 'fa-info'
        },
        {
            title: 'Offices',
            icon: 'fa-info'
        },
        {
            title: 'Templates',
            icon: 'fa-info'
        },
        {
            title: 'Programs',
            icon: 'fa-info'
        },
        {
            title: 'AppSettings',
            icon: 'fa-info'
        }
    ]
    return headerTabs;
}

const clinicHeaderTabs = ():HeaderTab[] => {
    const headerTabs = <HeaderTab[]>[
        {
            title: 'Dashboard',            
            icon: 'lucid-icon lucid-icon-layout'
        },
        {
            title: 'Alerts',
            icon: 'lucid-icon lucid-icon-danger'
        },
        {
            title: 'Devices',
            icon: 'lucid-icon lucid-icon-keyboard'
        },
        {
            title: 'Enrollments',
            icon: 'lucid-icon lucid-icon-edit'
        },
        {
            title: 'Patients',
            icon: 'lucid-icon lucid-icon-id-card1"'
        },
        {
            title: 'Reports',
            icon: 'lucid-icon lucid-icon-noteboard'
        }
    ]
    return headerTabs;
}

const superAdminHeaderTabs = ():HeaderTab[] => {
    const headerTabs = <HeaderTab[]>[
        {
            title: 'Dashboard',
            isActive: true,
            icon: 'fa-info'
        },
        {
            title: 'Clients',
            icon: 'fa-info'
        },
        {
            title: 'Billing',
            icon: 'fa-info'
        },
        {
            title: 'Programs',
            icon: 'fa-info'
        },
        {
            title: 'Programs',
            icon: 'fa-info'
        },
        {
            title: 'AppSettings',
            icon: 'fa-info'
        }
    ]
    return headerTabs;
}

export const getHeaderTabs = (layoutType: PageType = PageType.Clinic):HeaderTab[] => {
    let headerTabs:HeaderTab[] = [];
    switch(layoutType) {
        case PageType.Admin:
            headerTabs = adminHeaderTabs();
            break;
        case PageType.Clinic:
            headerTabs = clinicHeaderTabs();

            break;
        case PageType.SuperAdmin:
            headerTabs = superAdminHeaderTabs();
            break;
    }
    
    headerTabs.forEach(headerTab => {
        setId(headerTab, layoutType);
        const subTabs = <Tab[]>getSubTabs(headerTab.id);
        headerTab.subTabs = subTabs;
    });
    
    const defaultHeaderTab = <HeaderTab>setActiveTab(<Tab[]>headerTabs);
    if (defaultHeaderTab?.subTabs?.length && defaultHeaderTab.subTabs.length > 0) setActiveTab(defaultHeaderTab.subTabs);
    return headerTabs;
}

export const getSubTabs = (headerTabId: string):Tab[] => {
    
    try {        
        const { subTabs } = require(`../src/${headerTabId}/subTabs`);
        
        const tabs:Tab[] = subTabs;        
        tabs.forEach(subTab => {
            //setId(subTab, '');
            subTab.id = `${subTab.title.toLowerCase().replace(/\s/g, '')}`;
            try {
                subTab.layoutContent = getLayoutContent(`${headerTabId}/${subTab.id}`);
            } catch(e:any) {
                if (e.toString().startsWith('Duplicate Id')) {
                    throw e;
                }
            }
        });        
        return tabs;
    } catch(e:any) {
        if (e.toString().startsWith('Duplicate Id')) {
            throw e;
        }
        return [];
    }
    
}