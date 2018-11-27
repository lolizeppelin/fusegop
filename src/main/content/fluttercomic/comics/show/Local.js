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
import Formsy from 'formsy-react';


import {TextFieldFormsy, SelectFormsy} from '@fuse';


import * as FuseActions from "store/actions";
import { getMD5 }  from 'main/utils/digestutils'
import { sendfile }  from 'main/utils/websocket'

import * as comicsRequest from '../http';
import {ROUTEPREFIX} from "../../config";




/* 服务器文件夹 */
class LocalUpdate extends Component {

    state = {
        loading   : false,
        canSubmit : false,
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.setState({ loading: true}, () => {
            const { manager, comic, chapter, showMessage } = this.props;
            const body = {
                impl: {
                    type: 'local',
                    path: model.path
                },
                timeout: 60,
            };
            comicsRequest.createChapters(comic.cid, chapter, manager.token, body,
                () => {
                    this.setState({ loading: false},
                        () => showMessage({ message: '章节文件孵化中', autoHideDuration: 3000 }))
                },
                (error) => {
                    this.setState({ loading: false},
                        () => showMessage({ message: error.message}))
                });
        });
        // console.info('submit', model);
    };


    render() {

        return (

            <div className="max-w-2xl w-full">
                <Dialog open={this.state.loading}>
                    <DialogTitle>
                        章节添加中,请稍等
                    </DialogTitle>
                    <DialogContent>
                        <LinearProgress />
                    </DialogContent>
                </Dialog>
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    // ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >

                    <TextFieldFormsy
                        className="mb-24 mt-24 ml-0 max-w-256"
                        type="text"
                        name="path"
                        label="章节文件夹"
                        validations={{
                            minLength: 2
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 2'
                        }}
                        required
                    />

                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        // className="mx-auto mt-16"
                        className="mx-auto mb-24 ml-0"
                        aria-label="ADD"
                        disabled={!this.state.canSubmit}
                    >
                        添加章节
                    </Button>
                </Formsy>
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


export default connect(mapStateToProps, mapDispatchToProps)(LocalUpdate);

