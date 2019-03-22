import React, {Component} from 'react';
import {FusePageCarded, FusePageSimple} from '@fuse';

import {Avatar, Icon, Tab, Tabs, Typography, withStyles,
    CircularProgress, IconButton, Button,
    LinearProgress, DialogTitle, Dialog, DialogContent,
} from '@material-ui/core';

import ReplyIcon from '@material-ui/icons/Reply';
import {withRouter} from 'react-router-dom';

import LogsTable from './LogsTable';

import {FuseUtils, FuseAnimate} from '@fuse';
import green from "@material-ui/core/colors/green";
import {ROUTEPREFIX} from "../../fluttercomic/config";
import {indexLogs} from "./http";
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect";
import * as wbActions from "../store/actions";

import * as FuseActions from "store/actions";

import TextField from '@material-ui/core/TextField';



const styles = theme => ({
    root          : {
        display   : 'flex',
        alignItems: 'center',
        position      : 'absolute',
        top           : 30,
        left          : 50,
        width         : '90%',
    },
    textField: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit*2,
        width: 150,
    },
    fabProgress   : {
        color   : green[500],
        position: 'absolute',
        top     : '50%',
        left    : '50%',
        zIndex  : 1
    }
});

class Logs extends Component {


    date = '';

    state = {
        loading: false,
    };


    componentDidMount()
    {
        if (this.props.logs.length === 0) this.index(0, 1000, 0);
        this.setState({ loading: false })
    }


    index = (post, limit, timeline) => {
        this.setState({ loading: true}, async () => {
            await indexLogs(
                this.props.user.token,
                post, limit, timeline,
                (result) => {
                    if (result.data.length > 0) {
                        const _post = limit > 0 ? result.data[result.data.length-1].id : result.data[0].id;
                        this.props.setWebadminLogs(result.data, _post)
                    }
                },
                (error) => {
                    this.props.showMessage({ message: error.message})
                }
                );
            await this.setState({ loading: false })
        });

    };


    fetch1000 = (gonext=true) => {
        const post = this.props.post;
        if (gonext) this.index(post, 1000, 0);
        else this.index(post, -1000, 0);
    };

    repost = () => {
        const timeline = Math.round(new Date(`${this.date} 23:59:59`).getTime()/1000);
        console.log(this.date);
        console.log(timeline);
        this.index(0, 1000, timeline);
    };



    render()
    {
        const { classes } = this.props;
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                header={
                    <div className="flex flex-1 flex-col w-full sm:flex-row items-center justify-between p-24">

                        <div className="flex flex-row ml-52">
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <IconButton
                                    className="normal-case flex items-center mb-12" aria-label="Delete"
                                    onClick={() => {
                                        if (!this.state.loading) this.fetch1000(false)
                                    }}
                                >
                                    前1000
                                    <Icon className="mr-4 text-20">keyboard_arrow_left</Icon>
                                </IconButton>
                            </FuseAnimate>
                            {/*<div style={ {width: 30}}/>*/}
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <IconButton
                                    className="normal-case flex items-center mb-12" aria-label="Delete"
                                    onClick={() => {
                                        if (!this.state.loading) this.fetch1000(true)
                                    }}
                                >
                                    <Icon className="mr-4 text-20">keyboard_arrow_right</Icon>
                                    后1000
                                </IconButton>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue=""
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        this.date = e.target.value;
                                    }}
                                />
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <IconButton
                                    className="normal-case flex items-center mb-12 ml-20" aria-label="Delete"
                                    onClick={() => this.repost()}
                                >
                                    <Icon className="mr-4 text-20">search</Icon>
                                    截止时间
                                </IconButton>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={

                    this.state.loading
                        ? <div className={classes.root}>
                            <CircularProgress size={68} className={classes.fabProgress}/>
                        </div>
                        : <LogsTable logs={this.props.logs}/>
                }
                innerScroll
            />
        )
    };
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
        setWebadminLogs: wbActions.setWebadminLogs,
    }, dispatch);
}


function mapStateToProps({auth, webAdmin})
{
    return {
        logs: webAdmin.fetchlog.logs,
        post: webAdmin.fetchlog.post,
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Logs)));

