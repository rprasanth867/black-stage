
import { notification } from 'antd';
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

    axios.put('/api/v1/studio/entity', data)
    .then(() => {
        notification.success({
            message: 'Saved'
        });
    })
    .catch(() => {
        notification.error({
            message: 'Failed to save'
        });
    });

}

export function deleteEntityAPi(path: string) {
    const payload = {
        path
    };

    axios.delete('/api/v1/studio/entity', { data: payload })
    .then(() => {
        notification.success({
            message: 'Deleted'
        });
    })
    .catch(() => {
        notification.error({
            message: 'Failed to delete'
        });
    });

}
