import { App, Button, Popover } from 'antd'
import React from 'react'
import Icon from '@ant-design/icons'
import AddLinkDialog from './AddLinkDialog';
import { FaLink, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from '../../graph/types';
import { icons } from './constants';

let closeEditDialog: any = undefined;

interface IProps {
    id?: string;
    onChange?: (value: Link[]) => void;
    value?: Link[]
}
function Links(props: IProps) {
  const { id, onChange, value=[]} = props;
  const {modal} = App.useApp();

  console.log('VRRR', value);

  
  const onAdd = (item:Link) => {
    if(onChange) {
        onChange([...value,item])
    }
    if(closeEditDialog) {
        closeEditDialog();
    }
  }

  const onUpdate = (item:Link,index?: number) => {
    let items =[...value];
    if(index!==undefined) {
        items[index] = item;
    }
    if(onChange) {
        onChange(items)
    }
    if(closeEditDialog) {
        closeEditDialog();
    }
  }

  const onDelete = (index:number) => {
    const items =[...value];
    items.splice(index,1);
    if(onChange) {
        onChange(items);
    }
  }

  const editLink = (newItem: boolean, item?:Link,index?: number) => {
    const {destroy} = modal.confirm({
        icon: <Icon component={FaLink}/>,
        title:'Add Link',
        content:(<AddLinkDialog
                    link={item}
                    onFinish={(values)=> newItem ? onAdd(values): onUpdate(values,index)}/>),
        onOk: () => {
            return new Promise(() => {});
        },
        okButtonProps: {
            htmlType:'submit',
            form:'add-link'
        }
    })
    closeEditDialog = destroy;
  }

  const LinkControl = (data: {link: Link, index: number}) => {
    return(
        <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <Button onClick={()=> editLink(false,data.link,data.index)} type='link' icon={<FaEdit/>}>Edit</Button>
            <Button onClick={()=> onDelete(data.index)} style={{color:'rgb(237, 45, 45)'}} type='link' icon={<MdDelete/>}>Delete</Button>
        </div>
    )
  }

  return (
    <div id={id} style={{display:'flex', flexDirection:'column', gap:'4px', width:'100%'}}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <span>Links: </span>
            <Button onClick={()=>editLink(true)} style={{borderColor:'007bff',color:'#007bff'}}>
                Add Link
            </Button>
        </div>
        <div style={{display:'flex',flexWrap:'wrap', gap:'4px'}}>
            {value?.map((value,index) => 
            <Popover content={<LinkControl index={index} link={value}/>}>
            <div style={{
                display:'flex',
                flexDirection:'row',
                gap:'10px',
                maxWidth: '180px',
                overflow: 'hidden',
                border:'1.5px #F2F2F2 solid',
                width:'fit-content',
                borderRadius: '8px',
                padding: '4px'
                }}>
                {value.icon && <Icon style={{fontSize:'25px',color:'#faad14'}} component={ icons[value.icon]} />}
                <div style={{whiteSpace:'nowrap',overflow: 'hidden', textOverflow:'ellipsis'}}> {value.title || value.url}</div>
            </div>
            </Popover>)}

        </div>

    </div>
  )
}

export default Links