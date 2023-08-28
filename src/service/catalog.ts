
import axios from 'axios';
import { Entity } from 'redux/reducers/catalog';


// interface EntityRes {
//     entity: YAMLData;
//     id: string;
//     path: string;
// }
export function getEntitites() {
    return axios.get('/api/v1/studio/entity/all');
}

export function putEntity(entity: Entity) {
    const { id, path, ...yamlData } = entity.data;

    console.debug('updated', id);


    const data = {
        entity: yamlData,
        path
    };

    return axios.put('/api/v1/studio/entity', data);

}
