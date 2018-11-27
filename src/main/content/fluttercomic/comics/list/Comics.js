import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded, FusePageSimple} from '@fuse';
import ComicsHeader from '../../components/search';
import ComicsTable from './ComicsTable';

const styles = theme => ({});

class Comics extends Component {


    render()
    {
        return (
            <FusePageSimple
                classes={{
                    content: "flex"
                }}
                header={
                    <ComicsHeader icon="image" title="漫画列表"/>
                }
                content={
                    <ComicsTable />
                }
                innerScroll
            />
        )
    };
}

export default withStyles(styles)(Comics);
