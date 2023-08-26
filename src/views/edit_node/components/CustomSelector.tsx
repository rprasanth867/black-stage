import { Select, SelectProps } from 'antd'
import React, { useState } from 'react'

function CustomSelector(props: SelectProps) {
    const [options, setOptions] = useState<any>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const handleSearch = (value:string) => {
        const selectedvals = selected.map((val)=>({value:val}));
        setOptions([...selectedvals,{ value: value }])
    };

    const handleChange= (data: any) => {
        setSelected(data);
    }
  return (
    <Select mode="multiple" onChange={handleChange} style={{width:'100%'}} options={options} onSearch={handleSearch}{...props}/>
  )
}

export default CustomSelector