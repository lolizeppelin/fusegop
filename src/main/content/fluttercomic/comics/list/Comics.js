import React, {Component} from 'react';
import {withStyles, Button, Icon} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {FusePageCarded, FusePageSimple} from '@fuse';

import SearchHeader from '../../components/search';
import ComicsTable from './ComicsTable';
import {ROUTEPREFIX} from "../../config";

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

class Comics extends Component {


    render()
    {
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                header={
                    <SearchHeader icon="image" title="漫画列表" front={
                        () =>
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Button
                                    variant="fab"
                                    color="secondary"
                                    aria-label="add"
                                    // className={classes.addButton}
                                    component={Link} to={`${ROUTEPREFIX}/comic`}
                                >
                                    <Icon>add</Icon>
                                </Button>
                            </FuseAnimate>
                    }/>
                }
                content={
                    <ComicsTable />
                }
                innerScroll
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(Comics);
