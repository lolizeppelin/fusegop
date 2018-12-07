import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Icon, Tab, Tabs, Typography, CircularProgress} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';


import * as FuseActions from "store/actions";
import * as usersRequest from '../http';
import {ROUTEPREFIX} from "../../config";

import {StringtoLong} from '../../../../utils/math'

import SortableTables from '../../components/sortAbleTables';


const styles = theme => ({
    root          : {
        display   : 'flex',
        alignItems: 'center'
    },
    fabProgress   : {
        color   : green[500],
        position: 'absolute',
        top     : -6,
        left    : -6,
        zIndex  : 1
    },
});




const columns = [
    {
        id            : 'oid',
        numeric       : true,
        disablePadding: false,
        label         : '订单ID',
        sort          : true,
        view          : (v) => v.toString()
    },
    {
        id            : 'time',
        numeric       : false,
        disablePadding: false,
        label         : '时间',
        sort          : false
    },
    {
        id            : 'platform',
        numeric       : false,
        disablePadding: false,
        label         : '平台',
        sort          : true
    },
    {
        id            : 'coin',
        numeric       : true,
        disablePadding: false,
        label         : '金币',
        sort          : false
    },
    {
        id            : 'gift',
        numeric       : true,
        disablePadding: false,
        label         : '代币',
        sort          : false
    },
    {
        id            : 'money',
        numeric       : true,
        disablePadding: false,
        label         : '付款',
        sort          : true
    },
    {
        id            : 'coins',
        numeric       : true,
        disablePadding: false,
        label         : '剩余金币',
        sort          : false
    },
    {
        id            : 'gifts',
        numeric       : true,
        disablePadding: false,
        label         : '剩余代币',
        sort          : false
    },
    {
        id            : 'serial',
        numeric       : false,
        disablePadding: false,
        label         : '流水号',
        sort          : false
    },
    {
        id            : 'cid',
        numeric       : true,
        disablePadding: false,
        label         : '漫画ID',
        sort          : true
    },
    {
        id            : 'chapter',
        numeric       : true,
        disablePadding: false,
        label         : '章节',
        sort          : false
    },
];





class RechargeLog extends Component {

    state = {
        recharges  : [],
        loading : true,
    };

    componentDidMount()
    {
        const {user} = this.props;
        const manager = this.props.manager;
        if (user === null) {
            this.setState({ loading: false }, () => this.props.showMessage({ message: 'user is None' }))
        } else {
            usersRequest.getUserRechargeLogs(user.uid, manager.token,
                (result) => {
                    this.setState({ recharges: result.data, loading: false  })
                },
                (error) => {
                    this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
                })
        }

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
            order={"desc"}
            orderBy={columns[0].id}
            rowsPerPage={100}
            rawData={this.state.recharges}
            url={`${ROUTEPREFIX}/recharges`}
            switch={
                (orderBy, o) => {
                    switch ( orderBy )
                    {
                        case 'oid': return o.oid;
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
        manager: auth.user
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(RechargeLog));
