import React from 'react';
import { Menu as RaMenu, useStore } from 'react-admin';
import { isEmpty } from 'lodash';

const Menu = () => {
    const [taskUUID, setTaskUUID] = React.useState('');
    const [isTimerStart] = useStore(`timer.start.${taskUUID}`, {});
    const [sidebar, setSidebar] = useStore(`sidebar.open`, true);
    const [isShow] = useStore('menu.sidebar.show', true);
    React.useEffect(() => {
        const url = window.location.href; // Get the current URL
        const parts = url.split('/'); // Split the URL by '/'
        const uuidIndex = parts.indexOf('tasks') + 1; // Find the index of 'tasks' and add 1 to get the UUID index

        if (uuidIndex !== 0 && uuidIndex < parts.length) {
            const uuid = parts[uuidIndex];
            setTaskUUID(uuid);
        }
    }, [taskUUID]);

    return (
        <>
            {isShow && (
                <RaMenu>
                    <RaMenu.DashboardItem />
                    <RaMenu.ResourceItem name="projects" />
                    <RaMenu.ResourceItem name="tasks" />
                </RaMenu>
            )}
        </>
    )
}

export default Menu