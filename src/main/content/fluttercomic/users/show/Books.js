import React, {Component} from 'react';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Typography} from '@material-ui/core';

import {CDNURL, ROUTEPREFIX} from "../../config";
import {Link} from "react-router-dom";


class UserBooks extends Component {

    render() {

        const {user} = this.props;

        if (user === null) return (
          <div>
              用户为空
          </div>
        );

        return (
            <table className="simple">
                <thead>
                <tr>
                    <th>封面</th>
                    <th>漫画名</th>
                    <th>作者</th>
                    <th>收藏时间</th>
                </tr>
                </thead>
                <tbody>
                {user.books.map(comic => (
                    <tr key={comic.cid}>
                        <td className="w-80">
                            <img className="product-image" src={`${CDNURL}/${comic.cid}/main.${comic.ext}`} alt="product"/>
                        </td>
                        <td>
                            <Typography
                                className="truncate"
                                component={Link}
                                role="button" to={`${ROUTEPREFIX}/comics/${comic.cid}`}>
                                {comic.name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{comic.author}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{comic.time}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>)
    }
}

export default UserBooks
