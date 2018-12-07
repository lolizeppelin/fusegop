import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {Avatar, Icon, Tab, Tabs, Typography,
    CircularProgress, IconButton, Button,
    LinearProgress, DialogTitle, Dialog, DialogContent,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import green from '@material-ui/core/colors/green';
import {Link, withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

import ReplyIcon from '@material-ui/icons/Reply';


import * as FuseActions from "store/actions";
import { getMD5 }  from 'main/utils/digestutils'
import { sendfile }  from 'main/utils/websocket'
import {ROUTEPREFIX, CDNURL} from "../../config";



import * as comicsRequest from '../http';
import NewChapter from "./NewChapters";
import Chapters from './Chapters';

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

class Comic extends Component {


    state = {
        tabValue : 0,
        comic    : null,
        loading  : true,
        error    : null,
        cid      : this.props.match.params.cid,
        precent  : 100,
        file     : null,
    };

    componentDidMount()
    {
        this.flush();
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };


    handleUpload = () => {
        const { file, comic} = this.state;
        const {manager, showMessage} = this.props;
        const body = {
            timeout: 30,
            fileinfo: { md5: file.md5, filename: file.filename, size: file.size },
        };
        comicsRequest.coverComics(comic.cid, manager.token, body,
            (result) => {
                const uri = result.data[0];
                showMessage({ message: '获取websocket上传地址成功,开始传输文件', autoHideDuration: 3000 });
                this.setState({ precent: 0 }, () => {
                    sendfile(uri, file.file, this.changePrecent)
                        .then((res) => {
                            showMessage({ message: res});
                            this.setState({ precent: 100, file: null }, () => this.flush());
                        })
                        .catch((error) => {
                            showMessage({ message: error.message});
                            this.setState({ precent: 100, file: null });
                        });
                });
            },
            (error) => {
                showMessage({ message: error.message});
            });
    };

    changePrecent = (p) => {
        const newPrecent = parseInt(p * 100, 10);
        if (newPrecent - this.state.precent >= 5) this.setState({ precent: newPrecent });
    };

    handleLocalFile = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.setState({ precent: 0 },
                () => getMD5(file, this.changePrecent)
                    .then(
                        (res) => {
                            const fileinfo = { file: file, md5: res, filename: file.name, size: file.size };
                            this.setState({ file: fileinfo, precent: 100 },
                                () => this.props.showMessage({ message: `SIZE: ${parseInt(file.size/1024, 10)}KB || MD5: ${res}` }));
                        },
                        (error) => {
                            this.setState({ precent: 100, file: null },
                                () => this.props.showMessage({ message: error.message }));
                        }
                    )
            );

        }
    };

    flush = () => {
        const manager = this.props.manager;
        comicsRequest.showComic(this.state.cid, manager.token,
            (result) => {
                const comic = result.data[0];
                this.setState({ comic, loading: false, tabValue: 0 })
            },
            (error) => {
                this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
            })
    };

    render()
    {
        const {classes} = this.props;
        const {tabValue, comic, loading} = this.state;

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
                    comic && (
                        <div className="flex flex-1 flex-col w-full sm:flex-row items-center justify-between p-24">

                            <div className="flex flex-col items-center sm:items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <IconButton
                                        className="normal-case flex items-center mb-12" aria-label="Delete"
                                        onClick={() => this.props.history.goBack()}
                                    >
                                        <ReplyIcon />
                                    </IconButton>
                                    {/*<Typography className="normal-case flex items-center mb-12" component={Link} role="button" to={`${ROUTEPREFIX}/users`}>*/}
                                        {/*<Icon className="mr-4 text-20">arrow_back</Icon>*/}
                                        {/*返回*/}
                                    {/*</Typography>*/}
                                </FuseAnimate>

                                <div className="flex flex-col min-w-0 items-center sm:items-start">

                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="truncate">
                                            {'漫画: ' + comic.name}
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
                        <Tab className="h-64 normal-case" label="漫画信息"/>
                        <Tab className="h-64 normal-case" label="章节信息"/>
                        <Tab className="h-64 normal-case" label="添加章节"/>
                    </Tabs>
                }
                content={
                    comic && (
                        <div className="p-24 max-w-2xl w-full">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <Dialog open={this.state.precent < 100}>
                                        <DialogTitle>
                                            文件处理获取中
                                        </DialogTitle>
                                        <DialogContent>
                                            <LinearProgress color="primary" variant="determinate" value={this.state.precent}/>
                                        </DialogContent>
                                    </Dialog>
                                    <div className="pb-48">
                                        <div className="pb-16 flex items-center">
                                            <Icon className="mr-16" color="action">account_circle</Icon>
                                            <Typography className="h2" color="textSecondary">漫画信息</Typography>
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
                                                                <img className="w-128 mr-16 rounded" src={`${CDNURL}/${comic.cid}/main.${comic.ext}`}/>
                                                                <Typography className="truncate">
                                                                    <span>{comic.name}</span>
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td><Typography className="truncate">{comic.cid}</Typography></td>
                                                        <td><Typography className="truncate">{comic.author}</Typography></td>
                                                        <td><Typography className="truncate">{comic.type}</Typography></td>
                                                        <td><Typography className="truncate">{comic.region}</Typography></td>
                                                        <td><Typography className="truncate">{comic.point}</Typography></td>
                                                        <td><Typography className="truncate">{comic.last}</Typography></td>
                                                        <td><span className="truncate">{comic.lastup}</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div className="pb-16 flex items-center">
                                            <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="upload-comic-main"
                                                multiple
                                                type="file"
                                                onChange={this.handleLocalFile}
                                            />
                                            <label htmlFor="upload-comic-main">
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    // color="secondary"
                                                    className={classes.button}
                                                >
                                                    选择封面
                                                    <PhotoCamera className={classes.rightIcon}/>
                                                </Button>
                                            </label>
                                            <Button
                                                variant="contained"
                                                component="span"
                                                color="secondary"
                                                className={classes.button}
                                                disabled={this.state.file === null}
                                                onClick={this.handleUpload}
                                            >
                                                上传封面
                                                <CloudUploadIcon className={classes.rightIcon}/>
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {tabValue === 1 &&  <Chapters comic={this.state.comic} flush={this.flush} />}
                            {tabValue === 2 && <NewChapter comic={this.state.comic} flush={this.flush} />}
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


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Comic)));
