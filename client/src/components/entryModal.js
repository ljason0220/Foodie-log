import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addEntry } from '../actions/entryActions';
import PropTypes from 'prop-types';

class EntryModal extends Component {
    state = {
        modal: false,
        entryId: '',
        userId: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        userId: PropTypes.object
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newEntry = {
            entryId: this.state.entryId,
            userId: this.props.userId
        }

        this.props.addEntry(newEntry);

        this.toggle();
    }

    render() {
        return (
            <div>
                { this.props.isAuthenticated ? 
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Entry
                </Button> : <h4 className="mb-3 ml-4">Log in to manage entries</h4>}



                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="entry">Entry</Label>
                                <Input 
                                    type="text"
                                    name="entryId"
                                    id="entry"
                                    placeholder="Add Entry"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Entry</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    entry: state.entry,
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user
})

export default connect(mapStateToProps, { addEntry })(EntryModal);