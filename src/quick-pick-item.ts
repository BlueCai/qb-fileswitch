import * as vscode from 'vscode';
import * as path from 'path';

import { getSearchConfig, getDescriptionConfig } from './tools';

export class QuickPickItem implements vscode.QuickPickItem {

    private friendlyName: string;

    constructor(public uri: vscode.Uri) {
        this.friendlyName = path.basename(uri.fsPath)
    }

    get label() {
        if (!this.friendlyName) {
            return path.basename(this.uri.fsPath);
        }
        return this.friendlyName;
    }

    get description() {
        let configs = getSearchConfig();
        let descConfigs = getDescriptionConfig();
        let filePath = this.uri.fsPath;
        let desc = null;
        configs.forEach(match => {
            if(filePath.indexOf(path.sep + match + path.sep) > -1){
                desc = match
            }
        });

        if(desc){
            descConfigs.forEach(match=>{
                if(filePath.indexOf(path.sep + match + path.sep) > -1){
                    desc += ` ${match}`
                }
            })
        }

        return desc;
    }
}

export let createQuickPickItemList = function (uris: Array<vscode.Uri>): Array<QuickPickItem> {
    return uris.map((uri: vscode.Uri) => {
        return new QuickPickItem(uri);
    });
}
