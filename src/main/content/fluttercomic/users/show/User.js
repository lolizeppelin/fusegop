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


import UserBooks from './Books';
import UserOwns from './Owns';
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

class User extends Component {


    state = {
        tabValue: 0,
        // form    : null,
        map     : 'shipping',
        user    : null,
        loading : true,
        error   : null,
        uid     : this.props.match.params.uid,
    };

    componentDidMount()
    {
        const manager = this.props.manager;
        console.log(this.props.match.params);
        usersRequest.showUser(this.state.uid, manager.token,
            (result) => {
                console.log(result);
                const user = result.data[0];
                this.setState({ user, loading: false  })
            },
            (error) => {
                this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
            })
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    render()
    {
        const {classes} = this.props;
        const {tabValue, user, loading} = this.state;

        if (loading) return (
            <div className={classes.root}>
                <CircularProgress size={68} className={classes.fabProgress}/>
            </div>
        );

        return (
            <FusePageCarded
                classes={{
                    content: "flex"
                }}
                header={
                    user && (
                        <div className="flex flex-1 flex-col w-full sm:flex-row items-center justify-between p-24">

                            <div className="flex flex-col items-center sm:items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center mb-12" component={Link} role="button" to={`${ROUTEPREFIX}/users`}>
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        用户列表
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex flex-col min-w-0 items-center sm:items-start">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="title" className="truncate">
                                            {'用户名: ' + user.name}
                                        </Typography>
                                    </FuseAnimate>

                                </div>

                            </div>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="用户信息"/>
                        <Tab className="h-64 normal-case" label="用户收藏"/>
                        <Tab className="h-64 normal-case" label="用户已购"/>
                        <Tab className="h-64 normal-case" label="购买记录"/>
                    </Tabs>
                }
                content={
                    user && (
                        <div className="p-24 max-w-2xl w-full">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div className="pb-48">

                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            <Typography className="h2" color="textSecondary">用户信息</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <table className="simple mb-16">
                                                <thead>
                                                <tr>
                                                    <th>用户名</th>
                                                    <th>用户ID</th>
                                                    <th>代币</th>
                                                    <th>赠币</th>
                                                    <th>状态</th>
                                                    <th>注册时间</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="flex items-center">
                                                            {/*<Avatar className="mr-8" src={user.avatar}/>*/}
                                                            <Typography className="truncate">
                                                                {user.name}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Typography className="truncate">{user.uid}</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography className="truncate">{user.coins}</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography className="truncate">{user.gifts}</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography className="truncate">{user.status}</Typography>
                                                    </td>
                                                    <td>
                                                        <span className="truncate">{user.regtime}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                </div>
                            )}
                            {tabValue === 1 &&  <UserBooks user={this.state.user} />}
                            {tabValue === 2 && <UserOwns user={this.state.user} />}
                        </div>
                    )
                }
                innerScroll
            />
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


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(User)));
