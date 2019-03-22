import React, {Component} from 'react';
import {withStyles, CircularProgress} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';

import {ROUTEPREFIX} from "../config";

import { indexLogs } from './http'

import * as FuseActions from "store/actions";

import SortableTables from '../components/sortAbleTables';
import green from "@material-ui/core/colors/green";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

import * as wbActions from '../store/actions'


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
        id            : 'id',
        numeric       : true,
        disablePadding: true,
        label         : '日志主键',
        sort          : false
    },
    {
        id            : 'ip',
        numeric       : false,
        disablePadding: false,
        label         : '访问IP',
        sort          : false
    },
    {
        id            : 'atime',
        numeric       : false,
        disablePadding: false,
        label         : '时间',
        sort          : false,
        view          : (v) => new Date(v*1000).toLocaleString(('zh-CN'), { hour12: false })
    },
    {
        id            : 'path',
        numeric       : false,
        disablePadding: false,
        label         : '接口',
        sort          : false
    }
];


class LogsTable extends Component {




    render() {


        return <SortableTables
            columns={columns}
            order={"desc"}
            orderBy={columns[0].id}
            rowsPerPage={100}
            rawData={this.props.logs}
            url={`${ROUTEPREFIX}/logs`}
            enableclick
            switch={
                (orderBy, o) => {
                    return o[orderBy];
                }
            }

        />
    };


}


// export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LogsTable)));

export default LogsTable
