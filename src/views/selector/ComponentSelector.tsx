import { Card, Form, Select, Space } from 'antd'
import React from 'react'
import KindNode from './KindNode'
import { Kind } from './enums'
import { KindType, YAMLData } from '../graph/types'
import { getAllKinds } from 'views/graph/functions'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/store'
import { useDispatch } from 'react-redux'
import { setKindFilter } from 'redux/reducers/catalog'

function ComponentSelector() {
  const getDefaultData = (kind: KindType): YAMLData => {
      return {
        apiVersion: 'default',
        kind: kind,
        metadata: {
            name: kind, 
        },
        spec: {
            
        }
      }
  }

  const allOptions = getAllKinds().map((tk)=>( {value: tk}))
  const selectedKinds = useSelector((state:IReduxState)=>state.catalog.kindFilter);
  const dispatch = useDispatch();
  return (
    <div style={{backgroundColor: '#f0f0f0',borderLeft:'1px solid #f0f0f0', width: '280px', padding: '10px', display:'flex',flexDirection:'column',gap:'10px'}}>
        {/* <Card title='Root Entities' style={{borderRadius:'18px'}}>
          <div style={{display:'grid',gap:'10px',gridTemplateColumns:'auto auto'}}>
          <KindNode graph={false} data = {getDefaultData(Kind.Location)}/>
          <KindNode graph={false} data = {getDefaultData(Kind.Template)}/>
          </div>
        </Card> */}
        <Card title='Core Entities' style={{borderRadius:'18px'}}>
          <div style={{display:'grid',gap:'10px',gridTemplateColumns:'auto auto'}}>
          <KindNode graph={false}  data = {getDefaultData(Kind.Domain)}/>
          <KindNode graph={false}  data = {getDefaultData(Kind.System)}/>
          <KindNode graph={false} data = {getDefaultData(Kind.Component)}/>
          <KindNode graph={false}  data = {getDefaultData(Kind.Resource)}/>
          <KindNode graph={false}  data = {getDefaultData(Kind.API)}/>
          </div>
        </Card>
        <Card title='Organizational Entities' style={{borderRadius:'18px'}}>
          <div style={{display:'grid',gap:'10px',gridTemplateColumns:'auto auto'}}>
          <KindNode graph={false}  data = {getDefaultData(Kind.Group)}/>
          <KindNode graph={false}  data = {getDefaultData(Kind.User)}/>
          </div>
        </Card>
        <Card title='Filters'>
          <div style={{display:'flex',flexDirection:'row',gap:'10px',alignItems:'center'}}>
            <span>Kinds</span>
            <Select style={{flex:1}}mode="multiple" value={selectedKinds} onChange={(value:string[])=> {dispatch(setKindFilter(value))}}options={allOptions}/>
          </div>
        
        </Card>
        
    </div>
  )
}

export default ComponentSelector