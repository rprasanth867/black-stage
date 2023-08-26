import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Edge, Node } from 'reactflow'

type Entity = Node;
type Relation = Edge;
export interface Catalog {
    entities: Entity[];
    relations: Relation[];
    edit: boolean;
    editEntity: Entity|undefined;
}

const initialState: Catalog = {
    entities:[],
    relations:[],
    edit: false,
    editEntity: undefined
}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setEntities: (state, action: PayloadAction<Entity[]>) => {
            state.entities = action.payload;
        },
        setRelations: (state, action: PayloadAction<Relation[]>) => {
            state.relations = action.payload;
        },
        initiateEditEntity: (state, action: PayloadAction<string|undefined>) => {
            state.editEntity = state.entities.find((entity:Entity)=> entity.id===action.payload);
            state.edit = true;
        },
        cancelEditEntity: (state) => {
            state.edit = false;
        },
        updateEntity: (state, action: PayloadAction<Entity>) => {
            const entityId = action.payload.id;
            console.log('vrrr new', action.payload);
            const idx = state.entities.findIndex((entity:Entity)=> entity.id===entityId);
            state.entities[idx]=action.payload;
            state.editEntity=undefined;
        },

    },
})
  
export const { setEntities, setRelations, initiateEditEntity,cancelEditEntity, updateEntity } = catalogSlice.actions

export default catalogSlice.reducer