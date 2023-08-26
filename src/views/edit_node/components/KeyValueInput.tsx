import { Button, Form, Input, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { MdDelete} from 'react-icons/md';
import React, { ChangeEventHandler, useCallback, useState } from 'react'
import Item from 'antd/es/list/Item';
interface Item {
    id: number;
    xkey: string;
    value: string;
}

interface IProps {
  id?: string;
  onChange?: (value: {[key: string]: string}) => void;
  value?: {[key: string]: string}
}

const formatData = (values: {[key: string]: string}|undefined):Item[] => {
  let data: Item[] =[]
  let idx=0;
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      const value = values[key];
      data.push(
        {
          'id': idx,
          'xkey': key,
          'value': value
        }
      )
      idx+=1;
    }
  }

  data.push({
      'id':idx,
      'xkey': '',
      'value': ''
    })
  return data;
}

const getOriginalFormat = (items: Item[]) => {
  const data:{[key: string]: string}={};
  items.forEach((item)=> data[item.xkey]=item.value)
  return data;
}
function KeyValueInput(props: IProps) {
  const [data, setData] = useState<Item[]>(formatData(props.value))

  const onChange = (e:any,index:number, key:'xkey'|'value', newVal: string) => {
    let items:Item[] = data;
    items[index][key] = newVal;
    if(index===data.length-1) {
      items.push({
        'id': data[data.length-1].id+1,
        'xkey': '',
        'value': ''
      });
    }
    setData([...items]);

    if(props.onChange) {
      props.onChange(getOriginalFormat(items))
    }

  }

  const onDelete = (index:number) => {
    let items:Item[] = data;
    items.splice(index,1);
    setData([...items]);
    if(props.onChange) {
      props.onChange(getOriginalFormat(items))
    }
  }
  return (
    <Table
        bordered
        dataSource={data}
        key={'id'}
        scroll={{ y: 240 }}
        pagination={false}
        rowClassName="editable-row">
          <Column
            title='Key'
            key={'xkey'}
            dataIndex={'xkey'}
            render={(text, record: Item, index) => (
              <Input value={text} onChange={(e)=> onChange(e,index,'xkey',e.target.value)}/>
            )}/>
          <Column
            title='Value'
            key={'value'}
            dataIndex={'value'}
            render={(text, record: Item, index) => (
              <Input value={text} onChange={(e)=> onChange(e,index,'value',e.target.value)}/>
            )}/>
          
           <Column
            title='Action'
            render={(text, record: Item, index) => {
              const isDisabled = index === data.length-1;
              return(
                <Button onClick={()=>onDelete(index)}disabled = { isDisabled } icon={<MdDelete/>} type='text' style={{color:isDisabled ? 'grey':'#ed2d2d',fontSize:'20px'}}/>
              )
            }
            }/>
    </Table>
  )
}

export default KeyValueInput;