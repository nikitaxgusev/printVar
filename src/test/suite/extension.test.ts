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

        // Wait for the editor to update
        await sleep(100); // Adjust the delay as needed

        // Check if the document has been modified as expected
        const updatedContent = editor.document.getText();
        console.log(updatedContent);

        // Verify that the selected text is present in the generated output
        assert.ok(updatedContent.includes('std::cout << "p" << " : " << p << std::endl;'));
    });

    test('Test - printvar command with indentation', async function () {
        // Create a new untitled text document
        const document = await vscode.workspace.openTextDocument({ content: '    variable = 42;', language: 'cpp' });
        const editor = await vscode.window.showTextDocument(document);

        // Set the selection to the word "variable"
        editor.selection = new vscode.Selection(new vscode.Position(0, 4), new vscode.Position(0, 12));

        // Trigger the printvar command
        await vscode.commands.executeCommand('extension.printvar');
        await sleep(100);
        // Get the updated document text
        const updatedText = editor.document.getText();

        // Verify the generated output
        const expectedOutput = '    std::cout << "variable" << " : " << variable << std::endl;';
        assert.ok(updatedText.includes(expectedOutput), `Expected output not found in the document:\n${expectedOutput}`);
    });
});

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
