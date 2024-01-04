import React from 'react';
import { AppBar as RaAppBar, TitlePortal, Toolbar } from 'react-admin';

const AppBar = () => {
    return (
        <RaAppBar sx={{ background: "#fafafb" }}>
            <Toolbar
                sx={{
                    background: "transparent",
                }}
            >
                <img
                    src="smallLogo-nobg.png"
                    alt="Logo"
                />
            </Toolbar>
            <TitlePortal sx={{color: "blue"}} style={{color: "red"}} />
        </RaAppBar>
    )
}

export default AppBar