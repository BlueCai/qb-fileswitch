import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { getSearchConfig } from './tools';

export class CompanionFiles {

    constructor() {

    }

    list(): Thenable<Array<vscode.Uri>> {

        let t = new Promise<Array<vscode.Uri>>(
            (resolve, reject) => {
                let doc: vscode.TextDocument = undefined;
                if (vscode.window.activeTextEditor) {
                    doc = vscode.window.activeTextEditor.document;
                }
                if (!doc) {
                    return reject('No active document found');
                }

                let matchedFiles = this.createMatchedPath(doc.uri);
                return resolve(matchedFiles);
            });

        return t;
    }

    createMatchedPath(sourceUri: vscode.Uri): Array<vscode.Uri> {
        let result: Array<vscode.Uri> = [];
        let searchConfigs = getSearchConfig();
        let currentPath = sourceUri.fsPath;
        let activePathSplited = currentPath.split(path.sep);
        let matched = '';
        searchConfigs.forEach(item => {
            let matchedIndex = activePathSplited.indexOf(item);
            if (matchedIndex > -1) {
                matched = item
                return
            }
        });

        if (matched) {
            searchConfigs.forEach(item => {
                if (item !== matched) {
                    let old = path.sep + matched + path.sep;
                    let toBeReplaced = path.sep + item + path.sep
                    let resultPath = currentPath.replace(old, toBeReplaced)
                    if (fs.existsSync(resultPath)) {
                        result.push(vscode.Uri.file(resultPath));
                    }
                }
            })
        }

        return result;
    }
}
