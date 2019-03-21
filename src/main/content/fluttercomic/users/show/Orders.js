import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Icon, Tab, Tabs, Typography, CircularProgress} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';


import * as FuseActions from "store/actions";
import {ROUTEPREFIX, CDNURL} from "../../config";


import * as usersRequest from '../http';

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

class Paylog extends Component {

    state = {
        logs    : [],
        loading : true,
    };


    componentDidMount()
    {
        const {user} = this.props;
        const manager = this.props.manager;
        if (user === null) {
            this.setState({ loading: false }, () => this.props.showMessage({ message: 'user is None' }))
        } else {
            usersRequest.getUserPays(user.uid, manager.token,
                (result) => {
                    this.setState({ logs: result.data, loading: false  })
                },
                (error) => {
                    this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
                })
        }

    }


    render()
    {
        const {classes, user} = this.props;
        const {loading} = this.state;

        if (loading) return (
            <div className={classes.root}>
                <CircularProgress size={68} className={classes.fabProgress}/>
            </div>
        );

        return (
            <table className="simple">
                <thead>
                <tr>
                    <th>漫画ID</th>
                    <th>购买章节</th>
                    <th>购买消耗</th>
                    <th>购买优惠</th>
                    <th>使用金额</th>
                    <th>使用代币</th>
                    <th>剩余金额</th>
                    <th>剩余代币</th>
                    <th>购买时间</th>
                </tr>
                </thead>
                <tbody>
                {this.state.logs.map((paylog, index) => (
                    <tr key={`paylog-${index}`}>
                        <td className="w-64">
                            {paylog.cid}
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.chapter}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.value}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.offer}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.coin}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.gift}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.coins}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.gifts}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{paylog.time}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )


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


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Paylog));
