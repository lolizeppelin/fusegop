import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import {Link, withRouter} from 'react-router-dom';

import {Button, MenuItem,
    LinearProgress , Typography,
    DialogTitle, Dialog, DialogContent, Icon
} from '@material-ui/core';

import Formsy from 'formsy-react';

import {TextFieldFormsy, CheckboxFormsy, RadioGroupFormsy,
    SelectFormsy, FusePageCarded, FuseAnimate} from '@fuse';

import * as FuseActions from "store/actions";

import { createComics } from '../http'

import {ROUTEPREFIX} from "../../config";

class NewComic extends Component {
    state = {
        canSubmit : false,
        loading   : false,
    };

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.setState({ loading: true}, () => {
            createComics(this.props.manager.token, model,
                (result) => {
                    const comic = result.data[0];
                    this.props.history.push(`${ROUTEPREFIX}/comics/${comic.cid}`);
                },
                (error) => {
                    this.props.showMessage({ message: error.message});
                    this.setState({ loading: false })
                })
        });
        // console.info('submit', model);
    };

    render()
    {
        const {canSubmit} = this.state;

        if (this.props.manager.token.length === 0) return (
            <div className="flex flex-col items-center justify-center pt-32">
                <span className="font-medium mt-256">请先使用管理员账号登陆</span>
                <Link className="font-medium mt-8" to={`${ROUTEPREFIX}/managers/login`}>跳转至登陆</Link>
            </div>
        );


        return (
            <FusePageCarded
                classes={{
                    content: "flex"
                }}
                header={
                    <div className={"flex flex-1 flex-col w-full sm:flex-row items-center justify-between p-8 md:p-24"}>
                        <div className="flex flex-col items-center sm:items-start max-w-full">

                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="normal-case flex items-center" component={Link} role="button" to={`${ROUTEPREFIX}/comics`}>
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    漫画列表
                                </Typography>
                            </FuseAnimate>

                            <div className="flex flex-col min-w-0 items-center sm:items-start mt-24">
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="title" className="truncate">
                                        添加新漫画
                                    </Typography>
                                </FuseAnimate>
                            </div>

                        </div>

                    </div>

                }
                content={
                    <div className="flex flex-1 flex-col w-full max-w-sm ml-48 mt-48">
                        <Dialog open={this.state.loading}>
                            <DialogTitle>
                                漫画添加中,请稍等
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
                                className="mb-24"
                                type="text"
                                name="name"
                                label="漫画名"
                                validations={{
                                    minLength: 2
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 2'
                                }}
                                required
                            />

                            <TextFieldFormsy
                                className="mb-24"
                                type="text"
                                name="author"
                                label="作者"
                                validations={{
                                    minLength: 2
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 2'
                                }}
                                required
                            />

                            <TextFieldFormsy
                                className="mb-24"
                                type="text"
                                name="type"
                                label="类型"
                                validations={{
                                    minLength: 2
                                }}
                                validationErrors={{
                                    minLength: 'Min character length is 2'
                                }}
                                required
                            />


                            <SelectFormsy
                                className="my-24"
                                name="region"
                                label="Related with"
                                value="日本"
                                // validations="equals:none"
                                // validationError="Must be None"
                            >
                                <MenuItem value="日本">日本</MenuItem>
                                <MenuItem value="韩国">韩国</MenuItem>
                                <MenuItem value="欧美">欧美</MenuItem>
                                <MenuItem value="大陆">大陆</MenuItem>
                                <MenuItem value="香港">香港</MenuItem>
                            </SelectFormsy>

                            <CheckboxFormsy
                                className=""
                                name="accept"
                                label="Accept"
                                validations="equals:true"
                                validationError="You need to accept"
                            />

                            <Button
                                type="submit"
                                variant="raised"
                                color="primary"
                                className="mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={!canSubmit}
                            >
                                添加漫画
                            </Button>
                        </Formsy>
                    </div>
                }
            />
        )


    }
}


function mapStateToProps({auth})
{
    return {
        manager        : auth.user,
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        showMessage: FuseActions.showMessage,
    }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComic));