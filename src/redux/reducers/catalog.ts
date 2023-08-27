import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Edge, Node } from 'reactflow';
import { getAllKinds } from 'views/graph/functions';
import { YAMLData } from 'views/graph/types';


type Entity = Node<YAMLData>;
type Relation = Edge;
export interface Catalog {
    edit: boolean;
    editEntity: Entity | undefined;
    entities: Entity[];
    kindFilter: string[];
    relations: Relation[];
}

const initialState: Catalog = {
    kindFilter: getAllKinds(),
    entities: [],
    relations: [],
    edit: false,
    editEntity: undefined
};

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
        initiateEditEntity: (state, action: PayloadAction<string | undefined>) => {
            state.editEntity = state.entities.find((entity: Entity) => entity.id === action.payload);
            state.edit = true;
        },
        cancelEditEntity: state => {
            state.edit = false;
        },
        updateEntity: (state, action: PayloadAction<Entity>) => {
            const entityId = action.payload.id;
            const idx = state.entities.findIndex((entity: Entity) => entity.id === entityId);

            state.entities[idx] = action.payload;
        },

        setKindFilter: (state, action: PayloadAction<string[]>) => {
            state.kindFilter = action.payload;
        }

    }
});

export const {
    setEntities,
    setRelations,
    setKindFilter,
    initiateEditEntity,
    cancelEditEntity,
    updateEntity
} = catalogSlice.actions;

export default catalogSlice.reducer;
