import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import green from "@material-ui/core/colors/green";
import {withStyles, CircularProgress} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseScrollbars, FuseUtils} from '@fuse';
import connect from 'react-redux/es/connect/connect';

import * as FlutterComic from "store/actions";

import {ROUTEPREFIX} from "../../config";
import { indexUsers } from '../http'


import SortableTables from '../../components/sortAbleTables';



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
    },
});


const columns = [
    {
        id            : 'uid',
        numeric       : true,
        disablePadding: true,
        label         : '用户ID',
        sort          : false
    },
    {
        id            : 'name',
        numeric       : false,
        disablePadding: false,
        label         : '用户名',
        sort          : false
    },
    {
        id            : 'offer',
        numeric       : true,
        disablePadding: false,
        label         : '优惠额',
        sort          : false
    },
    {
        id            : 'coins',
        numeric       : true,
        disablePadding: false,
        label         : '金币',
        sort          : true
    },
    {
        id            : 'gifts',
        numeric       : true,
        disablePadding: false,
        label         : '代币',
        sort          : true
    },
    {
        id            : 'status',
        numeric       : true,
        disablePadding: false,
        label         : '状态',
        sort          : true
    },
    {
        id            : 'regtime',
        numeric       : true,
        disablePadding: false,
        label         : '注册时间',
        sort          : true
    }
];



class UsersTable extends Component {
    state = {
        users       : [],
        loading      : true,
    };


    componentDidMount()
    {
        // this.props.getOrders();
        indexUsers(this.props.manager.token,
            (result) => {
                this.setState({ users: result.data, loading: false})
            },
            (error) => {
                this.props.showMessage({ message: error.message });
                this.setState({ users: [], loading: false})
            });
    }


    render() {

        const {classes} = this.props;

        if (this.state.loading) return (
            <div className={classes.root}>
                <CircularProgress size={68} className={classes.fabProgress}/>
            </div>
        );


        return <SortableTables
            columns={columns}
            // selectable
            order={"asc"}
            orderBy={columns[0].id}
            rowsPerPage={100}
            rawData={this.state.users}
            url={`${ROUTEPREFIX}/users`}
            switch={
                (orderBy, o) => {
                    switch ( orderBy )
                    {
                        case 'id':return parseInt(o.uid, 10);
                        case 'name': return o.name;
                        case 'coins': return parseInt(o.coins, 10);
                        case 'gifts': return parseInt(o.gifts, 10);
                        case 'status': return parseInt(o.status, 10);
                        default: return o[orderBy];
                    }
                }
            }


        />
    };


}


function mapStateToProps({auth})
{
    return {
        manager     : auth.user,
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FlutterComic.showMessage,
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersTable)));
