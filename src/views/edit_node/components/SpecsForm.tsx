import { AutoComplete, Form, Select } from 'antd';
import React from 'react'
import { KindType, Spec } from 'views/graph/types';
import { Kind } from 'views/selector/enums';

interface IProps {
  kind: KindType;
  id?: any;
  value?: Spec;
  onChange?: (values: Spec) => void;
}
const REQUIRED = 'required';
const OPTIONAL='optional';
const specsInfo = {
 [Kind.Component]: {
  [REQUIRED]:['type','lifecycle','owner'],
  [OPTIONAL]:['system','subcomponentOf','providesApis','consumesApis','dependsOn']
 },
 [Kind.API]: {
  [REQUIRED]:['type','lifecycle','owner'],
  [OPTIONAL]:['system','definition']
 },
 [Kind.Group]: {
  [REQUIRED]:['type','children'],
  [OPTIONAL]:['members','parent','profile']
 },
 [Kind.User]: {
  [REQUIRED]:['memberOf'],
  [OPTIONAL]:['profile']
 },
 [Kind.Resource]: {
  [REQUIRED]:['owner','type'],
  [OPTIONAL]:['system','dependsOn','dependencyOf']
 },
 [Kind.System]: {
  [REQUIRED]:['owner'],
  [OPTIONAL]:['domain']
 },
 [Kind.Domain]: {
  [REQUIRED]:['owner'],
  [OPTIONAL]:[]
 },
 [Kind.Location]: {
  [REQUIRED]:[],
  [OPTIONAL]:['type','target','targets','presence']
 },
 [Kind.Template]: {
  [REQUIRED]:['type','parameters','steps'],
  [OPTIONAL]:['owner']
 },
}
const isRequired = (kind: KindType, name: string) => {
  
}
function SpecsForm(props: IProps) {
   const { id, value, onChange, kind} = props;
  return (
   <Form id={id}>
    <Form.Item name={'type'} label='Type'>
      <AutoComplete options={[{value:'service'},{value:'website'},{value:'library'}]}/>
    </Form.Item>
    <Form.Item name={'lifecycle'} label='Lifecycle'>
      <AutoComplete options={[{value:'experimental'},{value:'production'},{value:'deprecated'}]}/>
    </Form.Item>
    <Form.Item name={'owner'} label='Owner'>
      <Select/>
    </Form.Item>
    <Form.Item name={'system'} label='System'>
      <Select/>
    </Form.Item>
    <Form.Item name={'subcomponentOf'} label='Sub Component Of'>
      <Select/>
    </Form.Item>
    <Form.Item name={'providesApis'} label='Provides Apis'>
      <Select/>
    </Form.Item>
    <Form.Item name={'consumesApis'} label='Consumes Apis'>
      <Select/>
    </Form.Item>
    <Form.Item name={'dependsOn'} label='Depends On'>
      <Select/>
    </Form.Item>
    <Form.Item name={'definition'} label='Definition'>
      <Select/>
    </Form.Item>
   </Form>
  )
}

export default SpecsForm