import { IconType } from 'react-icons';
import {
    FaGithub
} from 'react-icons/fa';
import {
    IoMdDocument
} from 'react-icons/io';
import {
    MdBrokenImage,
    MdChat,
    MdCreateNewFolder,
    MdDashboard,
    MdEmail,
    MdHelp,
    MdMenuBook,
    MdPeople,
    MdPerson,
    MdSearch,
    MdSubject,
    MdWarning
} from 'react-icons/md';


export const icons: { [key: string]: IconType; } = {
    brokenImage: MdBrokenImage,
    catalog: MdMenuBook,
    scaffolder: MdCreateNewFolder,
    techdocs: MdSubject,
    search: MdSearch,
    chat: MdChat,
    dashboard: MdDashboard,
    docs: IoMdDocument,
    email: MdEmail,
    github: FaGithub,
    group: MdPeople,
    help: MdHelp,

    // 'kind:api': MuiExtensionIcon as IconComponent,
    // 'kind:component': MuiMemoryIcon as IconComponent,
    // 'kind:domain': MuiApartmentIcon as IconComponent,
    // 'kind:group': MuiPeopleIcon as IconComponent,
    // 'kind:location': MuiLocationOnIcon as IconComponent,
    // 'kind:system': MuiCategoryIcon as IconComponent,
    // 'kind:user': MuiPersonIcon as IconComponent,
    // 'kind:resource': MuiWorkIcon as IconComponent,
    user: MdPerson,
    warning: MdWarning
};
