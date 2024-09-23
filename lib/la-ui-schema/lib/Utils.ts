import * as fs from 'fs';
import * as path from 'path';
import { LayoutContent } from "./PageModule";
import { HeaderTab, Tab } from "./TabModule";

export const setId = <T extends HeaderTab|Tab|string>(item: T, parentId: string=''):T|string => {
    if (typeof item === 'string') {
        const itemId = item.toLowerCase().replace(/\s/g, '');
        const id = parentId ? `${parentId.toLowerCase()}/${itemId}`: itemId;
        return id;
    } 

    const itemId = item.title.toLowerCase().replace(/\s/g, '');
    const id = parentId ? `${parentId.toLowerCase()}/${itemId}` : itemId;
    item.id = id;
    return item;
}

export const getLayoutContent = (path: string): LayoutContent => {
    const { layoutContent } = require(`../src/${path}`);
    return layoutContent;
}

export const setActiveTab = (tabs: Tab[], id: string=tabs[0].id):HeaderTab|Tab => {
    const tab = tabs.find(tab => tab.isActive === true);
    if (tab !== undefined && tab?.id !== id) {
        tab.id = '';
    }    
    const selectedTab = <Tab>tabs.find(tab => tab.id === id);
    selectedTab.isActive = true; 
    return selectedTab;
}

export const readFilesRecursively = (dirPath: string): Promise<string[]> => {
    const fileNames: string[] = [];

    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
            if (err) {
                return reject('Error reading directory: ' + err);
            }

            const promises: Promise<void>[] = [];

            entries.forEach((entry) => {
                const fullPath = path.join(dirPath, entry.name);

                if (entry.isDirectory()) {
                    // Recursively read subdirectories
                    promises.push(
                        readFilesRecursively(fullPath).then((subDirFiles) => {
                            fileNames.push(...subDirFiles);
                        })
                    );
                } else if (entry.isFile()) {
                    fileNames.push(fullPath);
                }
            });

            Promise.all(promises).then(() => resolve(fileNames)).catch(reject);
        });
    });
};
