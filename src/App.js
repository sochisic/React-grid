import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from 'react-modal';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 300,
    },
};

Modal.setAppElement('#root');

class App extends Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.state = {
            loading: false,
            users: [],
            modalIsOpen: false,
            modalId: 0,
        };
        this.columns = [
            {
                key: 'id',
                name: 'ID',
                resizable: true,
                width: 40,
            },
            {
                key: 'first_name',
                name: 'FirstName',
                resizable: true,
                events: {
                    onClick: this.openModal,
                },
            },
            {
                key: 'last_name',
                name: 'LastName',
                resizable: true,
                events: {
                    onClick: this.openModal,
                },
            },
            {
                key: 'email',
                name: 'Email',
                resizable: true,
            },
            {
                key: 'gender',
                name: 'Gender',
                resizable: true,
            },
            {
                key: 'company',
                name: 'Company',
                resizable: true,
            },
        ];
    }

    openModal(e, args) {
        this.setState({
            modalIsOpen: true,
            modalId: this.state.users[args.rowId],
        });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
    // 测试 devServer 的代理功能
        axios({
            method: 'GET',
            url: 'http://localhost:4000/api/clients',
            crossDomain: true,

        }).then(resp => this.setState({ users: resp.data }));
    }

    rowGetter(i) {
        return this.state.users[i];
    }

    render() {
        const { modalId } = this.state;

        return (
            <div className="App">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Row Modal">
                    <p>Id: {modalId.id}</p>
                    <p>FirstName: {modalId.first_name}</p>
                    <p>LastName: {modalId.last_name}</p>
                    <p>Email: {modalId.email}</p>
                    <p>Gender: {modalId.gender}</p>
                    <p>Company: {modalId.company}</p>
                </Modal>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Grid Challange</h2>
                </div>
                <div className="container">
                    {this.state.users.length > 0 ? (
                        <ReactDataGrid
                            columns={this.columns}
                            rowGetter={this.rowGetter}
                            rowsCount={this.state.users.length}
                            minHeight={500}
                            minColumnWidth={120} />
          ) : (
              <CircularProgress />
            )}
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(App);
