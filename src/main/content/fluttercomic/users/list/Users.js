import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded, FusePageSimple} from '@fuse';
import UsersHeader from '../../components/search';
import UsersTable from './UsersTable';

const styles = theme => ({});

class Users extends Component {


    render()
    {
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                header={
                    <UsersHeader icon="supervisor_account" title="用户列表"/>
                }
                content={
                    <UsersTable />
                }
                innerScroll
            />
        )
    };
}

export default withStyles(styles)(Users);
