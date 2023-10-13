import React from 'react';
import { Menu as RaMenu, useStore } from 'react-admin';
import { isEmpty } from 'lodash';

const Menu = () => {
    const [isTimerStart] = useStore('timer.start', {});
    const [isShow, setShow] = React.useState(true);
    React.useEffect(() => {
        !isEmpty(isTimerStart) ? setShow(false) : setShow(true);

    }, [isTimerStart]);

    return (
        <>
            {isShow && (
                <RaMenu>
                    <RaMenu.DashboardItem />
                    <RaMenu.ResourceItem name="projects" />
                </RaMenu>
            )}
        </>
    )
}

export default Menu