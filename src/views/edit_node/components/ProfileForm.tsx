import { Card, Image } from 'antd';
import { Profile } from 'views/graph/types';

interface IProps {
    id?: string;
    onChange?: (value: Profile) => void;
    value?: Profile;
}

function ProfileForm(props: IProps) {
    const { value, id } = props;

    return (
        <Card id = { id }>
            <div
                style = {{ display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px' }}>
                <Image
                    alt = 'No Profile'
                    src = { value?.picture }
                    style = {{ width: '70px',
                        borderRadius: '50%' }} />
                <div
                    style = {{ display: 'flex',
                        flexDirection: 'column',
                        flex: 1 }}>
                    <span style = {{ fontWeight: 'bold' }}>{value?.displayName ?? 'No Name'}</span>
                    <span style = {{ fontSize: '10px' }}>{value?.email ?? 'No Email'}</span>
                </div>
                {/* <Button>Edit</Button> */}
            </div>
        </Card>
    );
}

export default ProfileForm;
