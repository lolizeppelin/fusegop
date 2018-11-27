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

class UserOwns extends Component {

    state = {
        owns    : [],
        loading : true,
    };


    componentDidMount()
    {
        const {user} = this.props;
        const manager = this.props.manager;
        if (user === null) {
            this.setState({ loading: false }, () => this.props.showMessage({ message: 'user is None' }))
        } else {
            usersRequest.showUserOwns(user.uid, manager.token,
                (result) => {
                    this.setState({ owns: result.data, loading: false  })
                },
                (error) => {
                    this.setState({ loading: false }, () => this.props.showMessage({ message: error.message }))
                })
        }

    }


    render()
    {
        const {classes} = this.props;
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
                    <th>封面</th>
                    <th>已购章节</th>
                </tr>
                </thead>
                <tbody>
                {this.state.owns.map(comic => (
                    <tr key={comic.cid}>
                        <td className="w-64">
                            {comic.cid}
                        </td>
                        <td className="w-80">
                            <img className="product-image" src={`${CDNURL}/${comic.cid}/main.${comic.ext}`} alt="product"/>
                        </td>
                        <td>
                            <Typography className="truncate">{comic.name}</Typography>
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


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(UserOwns));
