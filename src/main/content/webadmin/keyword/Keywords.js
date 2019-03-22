import React, {Component} from 'react';
import {withStyles, Button, Icon} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {FusePageCarded, FusePageSimple} from '@fuse';

import KeywordTable from './KeywordTable';

import {FuseUtils, FuseAnimate} from '@fuse';
import green from "@material-ui/core/colors/green";


const styles = theme => ({
    root          : {
        display   : 'flex',
        alignItems: 'center',
        position      : 'absolute',
        top           : 30,
        left          : 50,
        width         : 600,
    },
});

class Keywords extends Component {


    render()
    {
        const{ classes } = this.props;
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                content={
                    <div className={classes.root}>
                        <KeywordTable />
                    </div>
                }
                innerScroll
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(Keywords);
