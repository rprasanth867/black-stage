import * as yaml from 'js-yaml';
import { Uri, editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';
import { type SchemasSettings, configureMonacoYaml } from 'monaco-yaml';
import './index.css';
import { useEffect } from 'react';
import { YAMLData } from 'views/graph/types';

import schema from './schema.json';

window.MonacoEnvironment = {
    getWorker(moduleId, label) {
        switch (label) {
        case 'editorWorkerService':
            return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url));
        case 'yaml':
            return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url));
        default:
            throw new Error(`Unknown label ${label}`);
        }
    }
};

const defaultSchema: SchemasSettings = {
    uri: 'https://github.com/remcohaszing/monaco-yaml/blob/HEAD/examples/demo/src/schema.json',

    // @ts-expect-error TypeScript can’t narrow down the type of JSON imports
    schema,
    fileMatch: [ '*.yaml' ]
};

configureMonacoYaml(monaco, {
    enableSchemaRequest: true,
    schemas: [ defaultSchema ]
});

// const value = `
// # Property descriptions are displayed when hovering over properties using your cursor
// property: This property has a JSON schema description


// # Titles work too!
// titledProperty: Titles work too!


// # Even markdown descriptions work
// markdown: hover me to get a markdown based description 😮

// `.replace(/:$/m, ': ');

interface IProps {
    saveData: any;
    yamlData: YAMLData;
}

function YAMLCodeEditor(props: IProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { spec, id, path, ...rest } = props.yamlData;

    const data: any = rest;


    if (Object.keys(spec).length !== 0) {

        data.spec = spec;

    }

    const value = yaml.dump(data);

    useEffect(() => {
        const ed = editor.create(document.getElementById('yaml-editor')!, {
            automaticLayout: true,
            model: editor.createModel(value, 'yaml', Uri.parse(`yaml-${new Date().getTime()}.yaml`)),
            theme: 'vs-light'
        });

        ed.onDidChangeCursorPosition(async () => {
            ed.trigger('', 'editor.action.triggerSuggest', {});
        });

        ed.onDidChangeModelContent(() => {
            const newContent = ed.getValue();

            try {
                const content: any = yaml.load(newContent);

                content.id = id;
                content.path = path;

                console.log('VRRRR', content);

                props.saveData(content);
            } catch (exc) {
                // TBD
            }
        });

        // editor.onDidChangeMarkers(([ resource ]) => {
        //     // const problems = document.getElementById('problems')!;
        // });

        return () => {
            ed.dispose(); // Dispose of the editor instance
        };

    }, []);

    return (
        <div
            id = 'yaml-editor'
            style = {{ height: '50vh' }} />
    );
}

export default YAMLCodeEditor;
