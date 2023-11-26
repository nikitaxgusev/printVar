"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('Test - int`', async () => {
        // Create a new untitled document with the desired content
        const document = await vscode.workspace.openTextDocument({ content: 'int p = 124;' });
        const editor = await vscode.window.showTextDocument(document);
        // Set the selection to "p"
        const startPosition = new vscode.Position(0, 4); // Assuming "int p = 124;"
        const endPosition = new vscode.Position(0, 5); // Assuming "int p = 124;"
        editor.selection = new vscode.Selection(startPosition, endPosition);
        // Execute your extension's command
        await vscode.commands.executeCommand('extension.printvar');
        // Check if the document has been modified as expected
        const updatedContent = editor.document.getText();
        //console.log(updatedContent);
        const expectedOutput = 'std::cout << "p" << " : " << p << std::endl;';
        assert.ok(updatedContent.includes(expectedOutput));
    });
});
//# sourceMappingURL=extension.test.js.map