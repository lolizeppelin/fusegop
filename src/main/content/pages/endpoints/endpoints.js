import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Typography, Icon} from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {FuseAnimate} from '@fuse';


const GOPCONFIG = window.GOPCONFIG;


const styles = theme => ({
    root    : {
        background: theme.palette.primary.main,
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    board   : {
        cursor                  : 'pointer',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow border-color',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        background              : theme.palette.primary.dark,
        color                   : theme.palette.getContrastText(theme.palette.primary.dark),
        '&:hover'               : {
            boxShadow: theme.shadows[6]
        }
    }
});



const ROUTEPREFIX = `${GOPCONFIG.BASEPATH}/${GOPCONFIG.fluttercomic.ROUTEPREFIX}`;



class EndpointPage extends Component {


    state = {
        endpoint      : this.props.match.params.endpoint,
    };


    render()
    {

        const {classes} = this.props;

        if (!this.state.endpoint) {
            return (
                <div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>
                    <div className="max-w-512 text-center">

                        <FuseAnimate delay={500}>
                            <Typography variant="headline" color="textSecondary" className="mb-16">
                                Sorry You Need Select Endpoint First
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>

            )
        }

        const prefix = `${GOPCONFIG.BASEPATH}/${GOPCONFIG[this.state.endpoint].ROUTEPREFIX}`;

        return (
            <div className={classNames(classes.root, "flex flex-grow flex-no-shrink flex-col items-center")}>

                <FuseAnimate>
                    <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">路由选择</Typography>
                </FuseAnimate>

                <div>
                    <div className="w-224 h-224 p-16" key={this.state.endpoint + '-manager'}>
                        <Link
                            to={`${prefix}/managers/login`}
                            className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                            role="button"
                        >
                            <Icon className="text-56">account_circle</Icon>
                            <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">管理员登陆</Typography>
                        </Link>
                    </div>
                    <div className="w-224 h-224 p-16" key={this.state.endpoint + '-client'}>
                        <Link
                            to={`${prefix}/users/login`}
                            className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                            role="button"
                        >
                            <Icon className="text-56">people</Icon>
                            <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">用户登陆</Typography>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(EndpointPage);
