// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.printvar', () => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            // Get the selected text
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Get the line number of the selected text
            const lineNumber = selection.start.line;

            // Generate the output
            const output = `std::cout << "${selectedText}" << " : " << ${selectedText} << std::endl;`;

            // Insert the output on a new line after the line of the selected text
            editor.edit(editBuilder => {
                const position = new vscode.Position(lineNumber + 1, 0);
                if (lineNumber === editor.document.lineCount - 1) {
                    // If it's the last line, insert a new line and then the output
                    editBuilder.insert(position, '\n' + output + '\n');
                } else {
                    // Otherwise, just insert the output on a new line
                    editBuilder.insert(position, output + '\n');
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
