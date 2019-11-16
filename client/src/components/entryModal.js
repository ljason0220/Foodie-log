import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addEntry } from '../actions/entryActions';

class EntryModal extends Component {
    state = {
        modal: false,
        entryId: '',
        businessId: '',
        userId: ''
    }

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
            businessId: this.state.businessId,
            userId: this.state.userId
        }

        this.props.addEntry(newEntry);

        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Entry</Button>

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
    entry: state.entry
})

export default connect(mapStateToProps, { addEntry })(EntryModal);