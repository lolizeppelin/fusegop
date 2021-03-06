import React, {Component} from 'react';
import {withStyles, CircularProgress} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseUtils, FuseAnimate} from '@fuse';
import * as FuseActions from "store/actions";
import {ROUTEPREFIX} from "../config";

import { indexKeyWords } from './http'

import SortableTables from '../components/sortAbleTables';
import green from "@material-ui/core/colors/green";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";


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
        id            : 'kid',
        numeric       : false,
        disablePadding: true,
        label         : '主键',
        sort          : false
    },
    {
        id            : 'value',
        numeric       : false,
        disablePadding: false,
        label         : '关键字',
        sort          : false
    },
];


class KeywordTable extends Component {
    state = {
        keywords       : [],
        loading      : true,
    };



    componentDidMount()
    {
        // this.props.getOrders();
        indexKeyWords(
            this.props.user.token,
            (result) => {
                console.log(result.data);
                this.setState({ keywords: result.data, loading: false })
            },
            (error) => {
                this.setState({ keywords: [], loading:false })
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
            rawData={this.state.keywords}
            url={`${ROUTEPREFIX}/keywords`}
            enableclick={false}
            switch={
                (orderBy, o) => {
                    return o[orderBy];
                }
            }

        />
    };


}



function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
    }, dispatch);
}



export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(KeywordTable)));
