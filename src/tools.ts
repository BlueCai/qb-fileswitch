import * as path from 'path';
import * as vscode from 'vscode';

export let getUriExtensions = function (uri: vscode.Uri): string {
    let split = path.basename(uri.fsPath).split('.');
    let exts = split.slice(1).join('.');
    return exts;
}

export let getUriName = function (uri: vscode.Uri): string {
    let split = path.basename(uri.fsPath).split('.');
    let name = split[0];
    return name;
}

export let getUriDirectory = function (uri: vscode.Uri): string {
    let dir = path.normalize(path.dirname(uri.fsPath) + '/');
    let root = path.normalize(vscode.workspace.rootPath + '/');
    // Remove root directory
    dir = dir.replace(root, '');
    return dir;
}

export let getCompanionNameMap = function (): any {
    let d = {
        'component.ts': 'Component',
        'service.ts': 'Service',
        'pipe.ts': 'Pipe',
        'test.ts': 'Test',
        'directive.ts': 'Directive',
        'routes.ts': 'Routes',
        'guard.ts': 'Guard',
        'component.html': 'Component view',
        'component.scss': 'Component style',
        "component.spec": "Component specifications"
    };
    return vscode.workspace.getConfiguration().get('companionFileSwitcher.friendlyName', d);
}

export let getSearchConfig = function (): Array<string> {
    let searchsStr = vscode.workspace.getConfiguration('qb.fileSwitch').get<string>('searchs')
    if(searchsStr){
        return searchsStr.split(',').map(function(item){
            return item.trim();
        });
    }
    return ['common', 'sg', 'hk', 'my', 'ph', 'th', 'vn', 'id']
}

export let getDescriptionConfig = function (): Array<string> {
    let subDescriptionMatchs = vscode.workspace.getConfiguration('qb.fileSwitch').get<string>('subDescriptionMatchs')
    if(subDescriptionMatchs){
        return subDescriptionMatchs.split(',').map(function(item){
            return item.trim();
        });
    }
    return ['test', 'e2e', 'ga', 'ut']

}
