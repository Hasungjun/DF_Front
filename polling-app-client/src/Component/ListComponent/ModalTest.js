
import React, { Component } from 'react';
import { Modal, Button, Row, Card } from 'antd';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import { API_BASE_URL } from '../../constants/index'

class TabForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data.description,
            title: this.props.data.title,
            visible: false,
            content: this.props.data.content,
            description: this.props.data.description,
            modify: this.props.modify,
            id: this.props.data.id,
            fileName: this.props.data.fileName
        }
    }
    componentWillMount() {
        if (this.state.fileName != null) {
            this.setState({
                fileName: this.state.fileName.split(";")
            });

        }
        // console.log(this.state.fileName)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    updateContent = (value) => {
        this.setState({ content: value })
    }
    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => this.jodit = jodit;

    config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    modify = () => {
        if (this.props.modify === true) {
            return <div>
                <JoditEditor
                    editorRef={this.setRef}
                    value={this.state.content}
                    config={this.config}
                    onChange={this.updateContent}
                />
                <p></p>
                <Row type="flex" justify="end">
                    <Button onClick={a => this.props.modifyConfirm(this.state.content, this.state.id)}>수정</Button>
                </Row>
                <p></p>
            </div>
        } else {
            return <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
        }
    }

    holdDescription = () => {
        if (this.props.hold === true) {
            return <div>
                <p></p>
                <Card title="반려사유">
                    {this.state.description}
                </Card>
            </div>
        }
    }

    render() {
        // console.log(this.state.fileName)
        return (
            <div>

                <Button onClick={this.showModal}>
                    보고서 보기
                </Button>
                <Modal
                    title={'보고서 보기'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1100}
                >
                    <Card
                        title={this.state.title}
                    >
                        <Row type="flex" justify="center">


                            {this.modify()}
                        </Row>

                    </Card>

                    {this.holdDescription()}
                    <p></p>
                    <Card
                        title="파일"
                    >
                        {(this.state.fileName === '') || (this.state.fileName === null) ? '' :

                            this.state.fileName.map(fileName =>
                                <Button key="file" href={API_BASE_URL + "/report/downloadFile/" + fileName}>{fileName}</Button>
                            )}
                    </Card>
                </Modal>

            </div>);
    }
}
export default TabForm;