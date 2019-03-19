import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {Icon, Tab, Tabs, Typography,
    CircularProgress, IconButton,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import ReplyIcon from '@material-ui/icons/Reply';


import * as FuseActions from "store/actions";
import { getMD5 }  from 'main/utils/digestutils'
import { sendfile }  from 'main/utils/websocket'


import * as logsRequest from './http';

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
    input : {
        display: 'none'
    },
    button   : {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
});

class LogEntity extends Component {


    state = {
        tabValue: 0,
        logentity    : null,
        loading  : true,
        error    : null,
        id      : this.props.match.params.id,
    };

    componentDidMount()
    {
        this.flush();
    }


    flush = () => {
        const user = this.props.user;
        logsRequest.showLog(this.state.id, user.token,
            (result) => {
                const logentity = result.data[0];
                this.setState({ logentity, loading: false, tabValue: 0 })
            },
            (error) => {
                this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
            })
    };

    render()
    {
        const {classes} = this.props;
        const {tabValue, logentity, loading} = this.state;

        if (loading) return (
            <div className={classes.root}>
                <CircularProgress size={68} className={classes.fabProgress}/>
            </div>
        );

        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                header={
                    logentity && (
                        <div className="flex flex-1 flex-col w-full sm:flex-row items-center justify-between p-24">

                            <div className="flex flex-col items-center sm:items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <IconButton
                                        className="normal-case flex items-center mb-12" aria-label="Delete"
                                        onClick={() => this.props.history.goBack()}
                                    >
                                        <ReplyIcon />
                                    </IconButton>
                                </FuseAnimate>

                                <div className="flex flex-col min-w-0 items-center sm:items-start">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="truncate">
                                            {'日志ID: ' + logentity.id}
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
                        <Tab className="h-64 normal-case" label="日志信息"/>
                        <Tab className="h-64 normal-case" label="浏览器详情"/>
                    </Tabs>
                }
                content={
                    logentity && (
                        <div className="p-24 max-w-2xl w-full">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div className="pb-48">
                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            <Typography className="h2" color="textSecondary">日志信息</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <table className="simple mb-16">
                                                <thead>
                                                <tr>
                                                    <th>漫画</th>
                                                    <th>漫画ID</th>
                                                    <th>作者</th>
                                                    <th>类型</th>
                                                    <th>地区</th>
                                                    <th>收费章节</th>
                                                    <th>最后章节</th>
                                                    <th>最后更新</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Typography className="truncate">
                                                                <span>日志内容</span>
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td><Typography className="truncate">{logentity.author}</Typography></td>
                                                    <td><Typography className="truncate">{logentity.type}</Typography></td>
                                                    <td><Typography className="truncate">{logentity.region}</Typography></td>
                                                    <td><Typography className="truncate">{logentity.point}</Typography></td>
                                                    <td><Typography className="truncate">{logentity.last}</Typography></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {tabValue === 1 &&  (
                                <div>
                                    <div className="pb-48">
                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            <Typography className="h2" color="textSecondary">日志信息</Typography>
                                        </div>

                                        <div className="mb-24">
                                            <table className="simple mb-16">
                                                <thead>
                                                <tr>
                                                    <th>漫画</th>
                                                    <th>漫画ID</th>
                                                    <th>作者</th>
                                                    <th>类型</th>
                                                    <th>地区</th>
                                                    <th>收费章节</th>
                                                    <th>最后章节</th>
                                                    <th>最后更新</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Typography className="truncate">
                                                                <span>客户端浏览器</span>
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td><span className="truncate">{logentity.lastup}</span></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
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
        user: auth.user
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
    }, dispatch);
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LogEntity)));
