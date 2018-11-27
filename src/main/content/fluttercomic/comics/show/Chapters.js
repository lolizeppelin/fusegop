import React, {Component} from 'react';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Typography} from '@material-ui/core';

import {CDNURL, ROUTEPREFIX} from "../../config";
import {Link} from "react-router-dom";


class Chapters extends Component {

    need_pay = (chapter) => {
        return (this.props.comic.point >= chapter.index);
    };


    render() {

        const {comic} = this.props;

        if (comic === null) return (
            <div>
                漫画为空
            </div>
        );


        return (
            <table className="simple">
                <thead>
                <tr>
                    <th>章节</th>
                    <th>章节最大页</th>
                    <th>加密KEY</th>
                    <th>收费</th>
                </tr>
                </thead>
                <tbody>
                {comic.chapters.map(chapter => (
                    <tr key={chapter.index}>
                        <td>
                            <Typography className="truncate">{chapter.index}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{chapter.max}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{chapter.key}</Typography>
                        </td>
                        <td>
                            <Typography className="truncate">{this.need_pay(chapter) ? '是' : '否'}</Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>)
    }
}

export default Chapters
