import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Test - int`', async () => {
        // Create a new untitled document with the desired content
        const document = await vscode.workspace.openTextDocument({ content: 'int p = 124;' });
        const editor = await vscode.window.showTextDocument(document);

        // Set the selection to "p"
        const startPosition = new vscode.Position(0, 4); // Assuming "int p = 124;"
        const endPosition = new vscode.Position(0, 5);   // Assuming "int p = 124;"
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
