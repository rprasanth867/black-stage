import { Select, SelectProps } from 'antd';
import React, { useState } from 'react';

function CustomSelector(props: SelectProps) {
    const [ options, setOptions ] = useState<any>([]);
    const [ selected, setSelected ] = useState<string[]>([]);
    const handleSearch = (value: string) => {
        const selectedvals = selected.map(val => {
            return { value: val };
        });

        setOptions([ ...selectedvals, { value } ]);
    };

    const handleChange = (data: any) => {
        setSelected(data);
    };

    return (
        <Select
            mode = 'multiple'
            onChange = { handleChange }
            onSearch = { handleSearch }
            options = { options }
            style = {{ width: '100%' }}
            { ...props } />
    );
}

export default CustomSelector;
