import { Card, Space } from 'antd'
import React from 'react'
import KindNode from './KindNode'
import { Kind } from './enums'
import { YAMLData } from '../graph/types'

function ComponentSelector() {
  const getDefaultData = (kind: Kind): YAMLData => {
      return {
        apiVersion: 'default',
        kind: kind,
        metadata: {
            name: kind, 
        },
        specs: {
            
        }
      }
  }
  return (
    <div style={{backgroundColor: '#f0f0f0',borderLeft:'1px solid #f0f0f0', width: '280px', padding: '10px'}}>
        <Card title='Kinds'>
          <div style={{display: 'grid', gap: '10px', gridTemplateColumns: 'auto auto'}}>
            <KindNode graph={false} data = {getDefaultData(Kind.Component)}/>
            <KindNode graph={false} data = {getDefaultData(Kind.Template)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.API)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.Group)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.User)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.Resource)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.System)}/>
            <KindNode graph={false}  data = {getDefaultData(Kind.Domain)}/>
            <KindNode graph={false} data = {getDefaultData(Kind.Location)}/>
          </div>
         
        </Card>
    </div>
  )
}

export default ComponentSelector