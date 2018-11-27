import React, {Component} from 'react';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Divider, Typography} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';

import {CDNURL, ROUTEPREFIX} from "../../config";
import {Link} from "react-router-dom";

import WebsocketUpdate from './Websocket'
import LocalUpdate from './Local'


class NewChapter extends Component {

    state = {
        loading  : false,
        precent  : 100,
        file     : null,
        type    : 'websocket',
    };


    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({type: event.target.value});
    };


    uploader = () => {
        const {comic} = this.props;
        switch (this.state.type) {
            case 'websocket': {
                return <WebsocketUpdate comic={comic} chapter={comic.last+1} flush={this.props.flush}/>
            }
            case 'local': {
                return <LocalUpdate comic={comic} chapter={comic.last+1} flush={this.props.flush}/>
            }

            default: {
                return <div>上传类型未实现</div>
            }
        }
    };


    render() {

        const {comic} = this.props;

        if (comic === null) return (
            <div className="p-16 max-w-2xl w-full">
                <div className="pb-1">
                    <div className="pb-16 flex items-center">
                        <Typography className="h2 ml-16" color="textSecondary">漫画不存在</Typography>

                    </div>
                </div>
            </div>
        );

        if (comic.last > comic.chapters.length) {
            return (
                <div className="p-16 max-w-2xl w-full">
                    <div className="pb-1">
                        <div className="pb-16 flex items-center">
                            <img className="w-128 rounded" src={`${CDNURL}/${comic.cid}/main.${comic.ext}`}/>
                            <Typography className="h2 ml-16" color="textSecondary">上传新章节中</Typography>

                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="p-16 max-w-2xl w-full">
                <div className="pb-1">
                    <div className="pb-16 flex items-center">
                        <img className="w-128 rounded" src={`${CDNURL}/${comic.cid}/main.${comic.ext}`}/>
                        <Typography className="h2 ml-16" color="textSecondary">{comic.name}</Typography>
                        <Typography className="h2 ml-16" color="textSecondary">{`最后章节: ${comic.last}`}</Typography>
                        <Typography className="h2 ml-32" color="textSecondary">{`收费章节: ${comic.point}`}</Typography>
                    </div>
                </div>
                <Divider />
                <div className="pb-16 mt-16 flex items-center">
                    <Typography className="h2" color="textSecondary">{`添加章节: ${comic.last+1}`}</Typography>
                    <Typography className="ml-52" color="textSecondary">直接上传</Typography>
                    <Radio
                        checked={this.state.type === 'websocket'}
                        onChange={this.handleChange}
                        value="websocket"
                        name="直接上传"
                    />
                    <Typography className="ml-12" color="textSecondary">爬虫爬取</Typography>
                    <Radio
                        checked={this.state.type === 'spider'}
                        onChange={this.handleChange}
                        value="spider"
                        name="爬虫爬取"
                    />
                    <Typography className="ml-12" color="textSecondary">服务器文件夹</Typography>
                    <Radio
                        checked={this.state.type === 'local'}
                        onChange={this.handleChange}
                        value="local"
                        name="服务器文件"
                    />
                </div>
                <Divider className="mb-16"/>
                { this.uploader() }
            </div>
        )
    }
}

export default NewChapter
