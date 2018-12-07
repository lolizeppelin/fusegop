import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {Typography, Button, Divider,
    LinearProgress, DialogTitle, Dialog, DialogContent,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import connect from 'react-redux/es/connect/connect';


import * as FuseActions from "store/actions";
import { getMD5 }  from 'main/utils/digestutils'
import { sendfile }  from 'main/utils/websocket'

import * as comicsRequest from '../http';


const styles = theme => ({
    line             : {
        display      : 'flex',
        alignItems   : 'center',
        marginBottom : 16,
        marginTop    : 16,
        marginRight  : 16
    },
    none : {
        display: 'none'
    },
    button   : {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
});


const BASEFILEINFO = {
    file     : null,
    filename : '',
    size     : 0,
    md5      : '',
    timeout  : 600,
};

/* 本地上传漫画章节 */
class WebsokcetUpdate extends Component {

    state = {
        precent  : 100,
        file     : BASEFILEINFO,
    };


    changePrecent = (p) => {
        const newPrecent = parseInt(p * 100, 10);
        if (newPrecent - this.state.precent >= 5 && newPrecent < 100) this.setState({ precent: newPrecent });
    };


    handleUpload = () => {
        const { manager, comic, chapter, showMessage } = this.props;
        const { file } = this.state;
        const body = {
            impl: {
                type: 'websocket',
                fileinfo: { filename: file.filename, size: file.size, md5: file.md5 }
            },
            timeout: file.timeout,
        };
        comicsRequest.createChapters(comic.cid, chapter, manager.token, body,
            (result) => {
                const uri = result.data[0].worker;
                showMessage({ message: '获取websocket上传地址成功,开始传输文件', autoHideDuration: 3000 });
                this.setState({ precent: 0 }, () => {
                    sendfile(uri, this.state.file.file, this.changePrecent)
                        .then((res) => {
                            showMessage({ message: res});
                            this.setState({ precent: 100, file: BASEFILEINFO }, () => this.props.flush());
                        })
                        .catch((error) => {
                            showMessage({ message: error.message});
                            this.setState({ precent: 100 });
                        });
                });
            },
            (error) => {
                showMessage({ message: error.message});
            });
    };


    handleLocalFile = (event) => {
        // const { comic } = this.props;
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.setState({ precent: 0 },
                () => getMD5(file, this.changePrecent)
                    .then(
                        (res) => {
                            const fileinfo = { file: file, md5: res, filename: file.name, size: file.size, timeout: this.state.file.timeout };
                            this.setState({ file: fileinfo, precent: 100 });
                        },
                        (error) => {
                            this.setState({ precent: 100, file: BASEFILEINFO },
                                () => this.props.showMessage({ message: error.message }));
                        }
                    )
            );
        }
    };


    render() {

        const {classes} = this.props;

        return (

            <div className="max-w-2xl w-full">
                <div className={classes.line}>
                    <Dialog open={this.state.precent < 100}>
                        <DialogTitle>
                            文件信息获取中
                        </DialogTitle>
                        <DialogContent>
                            <LinearProgress color="primary" variant="determinate" value={this.state.precent}/>
                        </DialogContent>
                    </Dialog>
                    <input
                        accept="application/gzip, application/zip"
                        className={classes.none}
                        id="upload-comic-main"
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
                            选择压缩包
                            <InsertDriveFile className={classes.rightIcon}/>
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        component="span"
                        color="secondary"
                        className={classes.button}
                        disabled={this.state.file.file === null}
                        onClick={this.handleUpload}
                    >
                        上传压缩包
                        <CloudUploadIcon className={classes.rightIcon}/>
                    </Button>
                    <Typography className="ml-16" color="textSecondary">允许的压缩包类型zip/gzip</Typography>
                </div>
                <Divider/>
                <div className={this.state.file.file === null ? classes.none : classes.line}>
                    <Typography className="ml-16" color="textSecondary">{"文件名: " + this.state.file.filename}</Typography>
                    <Typography className="ml-16" color="textSecondary">{"文件大小: " + this.state.file.size}</Typography>
                    <Typography className="ml-16" color="textSecondary">{"文件MD5: " + this.state.file.md5}</Typography>
                    <Typography className="ml-32" color="textSecondary">可以上传</Typography>
                </div>
            </div>

        )
    }
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


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(WebsokcetUpdate));

