import React, {Component} from 'react'
import Formsy from 'formsy-react';
import {withRouter} from 'react-router-dom';
import {Card, CardContent, Typography, withStyles, Button, Divider} from '@material-ui/core';
import classNames from 'classnames';

import {FuseAnimate, TextFieldFormsy} from '@fuse';

import {bindActionCreators} from 'redux';
import * as Actions from 'auth/store/actions';
import * as FuseActions from "store/actions";
import connect from 'react-redux/es/connect/connect';

import {webadminLogin}  from './http';

import {WebAdminNavigationConfig} from './navigation'
import {ROUTEPREFIX} from "../config";

const styles = () => ({
    root : {
        background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    intro: {
        color: '#ffffff'
    },
    card : {
        width   : '100%',
        maxWidth: 400
    },
    login: {
        width: '100%'
    }
});

class Login extends Component {

    state = {
        canSubmit: false
    };

    static analyzer (result) {
        const userinfo = result.data[0];
        return  {
            role    : "webadmin",

            id      : userinfo.id,
            name    : userinfo.username,
            token   : userinfo.token,

            from    : 'uuid',

            data    : {
                'displayName': userinfo.name,
                'photoURL'   : 'assets/images/avatars/anyone.jpg',
                'email'      : 'admin',
            }
        }
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitLogin(webadminLogin, model, Login.analyzer, () => {
            this.props.setNavigation(WebAdminNavigationConfig);
            this.props.history.push(`${ROUTEPREFIX}/welcome`);
        });

    };

    componentDidUpdate(prevProps, prevState)
    {

        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        if ( this.props.user.role !== 'guest' )
        {
            const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
            this.props.history.push({
                pathname
            });
        }
        return null;
    }

    render()
    {
        const {classes} = this.props;
        const {canSubmit} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="display2" color="inherit" className="font-light">
                            3595日志后台
                        </Typography>
                    </FuseAnimate>

                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography className="text-center md:w-full mb-48">管理员登陆</Typography>

                                <div className={classes.login}>
                                    <Formsy
                                        onValidSubmit={this.onSubmit}
                                        onValid={this.enableButton}
                                        onInvalid={this.disableButton}
                                        ref={(form) => this.form = form}
                                        className="flex flex-col justify-center w-full"
                                    >
                                        <TextFieldFormsy
                                            className="mb-16"
                                            type="text"
                                            name="email"
                                            label="Username"
                                            validations={{
                                                minLength: 3
                                            }}
                                            validationErrors={{
                                                minLength: '用户名长度小于3'
                                            }}
                                            required
                                        />

                                        <TextFieldFormsy
                                            className="mb-16"
                                            type="password"
                                            name="password"
                                            label="Password"
                                            validations={{
                                                minLength: 4
                                            }}
                                            validationErrors={{
                                                minLength: '密码长度小于4'
                                            }}
                                            required
                                        />

                                        <Button
                                            type="submit"
                                            variant="raised"
                                            color="primary"
                                            className="w-full mx-auto mt-16 normal-case"
                                            aria-label="LOG IN"
                                            disabled={!canSubmit}
                                            value="legacy"
                                        >
                                            登陆
                                        </Button>

                                    </Formsy>

                                    <div className="flex flex-col items-center pt-24">
                                        <Typography className="text-14 font-500 py-8">
                                            请输入账号密码
                                        </Typography>

                                        <Divider className="mb-16 w-256"/>
                                    </div>

                                </div>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium">~不能注册哦~</span>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: Actions.gopLogin,
        setNavigation: FuseActions.setNavigation
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}



export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));
