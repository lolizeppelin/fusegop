import React, {Component} from 'react';
import {withStyles, Button, Icon} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {FusePageCarded, FusePageSimple} from '@fuse';

import LogsTable from './LogsTable';

import {FuseUtils, FuseAnimate} from '@fuse';
import green from "@material-ui/core/colors/green";


const styles = theme => ({
    root          : {
        display   : 'flex',
        alignItems: 'center'
    },
    fabProgress   : {
        color   : green[500],
        position: 'absolute',
        top     : '50%',
        left    : '50%',
        zIndex  : 1
    }
});

class Logs extends Component {


    render()
    {
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                content={
                    <LogsTable />
                }
                innerScroll
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(Logs);
