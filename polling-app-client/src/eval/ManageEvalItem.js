import React, { Component } from 'react';
import { Card } from 'antd';
import VersionSelect from './VersionSelect';
import ItemTable from './ItemTable';
import VersionAdd from './VersionAdd';
import './ManageEvalItem.css';


class ManageEvalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: null,
            version: ''
        };
    }

    itemListCallback = (childItemList) => {
        this.setState({
            itemList: childItemList
        });
    }

    refresh = () => {
        window.location.reload();
    }

    setVersion = (childVersion) => {
        this.setState({
          version: childVersion
        });
    }
    
    render() {
        return (
            <div className="Option8">
                 <Card title="평가 항목 관리" headStyle={{backgroundColor:"#00B1B6",color:"#FBFBFB",fontWeight:"bold"}}>
                <VersionSelect 
                    getItemList={this.itemListCallback}
                    disabled={false} 
                    setVersion={this.setVersion} />
                <ItemTable itemList={this.state.itemList} />
                <VersionAdd 
                    refresh={ this.refresh }
                    setVersion={this.setVersion}/>
                    </Card>
            </div>
        );
    }
}
export default ManageEvalItem;