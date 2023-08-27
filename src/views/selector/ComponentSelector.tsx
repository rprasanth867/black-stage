import { Card, Space } from 'antd'
import React from 'react'
import KindNode from './KindNode'
import { Kind } from './enums'
import { KindType, YAMLData } from '../graph/types'

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
  return (
    <div style={{backgroundColor: '#f0f0f0',borderLeft:'1px solid #f0f0f0', width: '280px', padding: '10px', display:'flex',flexDirection:'column',gap:'10px'}}>
        <Card title='Root Entities' style={{borderRadius:'18px'}}>
          <div style={{display:'grid',gap:'10px',gridTemplateColumns:'auto auto'}}>
          <KindNode graph={false} data = {getDefaultData(Kind.Location)}/>
          <KindNode graph={false} data = {getDefaultData(Kind.Template)}/>
          </div>
        </Card>
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
    </div>
  )
}

export default ComponentSelector