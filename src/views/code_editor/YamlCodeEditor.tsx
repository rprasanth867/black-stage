import MonacoEditor from 'react-monaco-editor';
import { YAMLData } from 'views/graph/types';

interface IProps {
    yamlData: YAMLData;
}
function YamlCodeEditor(props: IProps) {
    const { yamlData } = props;
    const options = {
        selectOnLineNumbers: true,
        suggestOnTriggerCharacters: true // Enable autocompletion
    };

    // const handleChange = (data: any) => {
    //     console.log(data, yamlData);

    //     // { foo: 'bar' }
    // };
    console.log('yaml', yamlData);

    return (
        <MonacoEditor
            height = '300'
            language = 'yaml'
            options = { options }
            theme = 'vs-light'
            value = 'your initial YAML content here' />
    );
}

export default YamlCodeEditor;
