import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../actions/entryActions';
import PropTypes from 'prop-types';

class EntryList extends Component {

    componentDidMount() {
        this.props.getEntries();
    }

    onDeleteClick = (entryId) => {
        this.props.deleteEntry(entryId);
    }

    render() {
        const { entries } = this.props.entry;

        return(
            <Container>  
                <ListGroup>
                    <TransitionGroup className="entry-list">
                        {entries.map(({ _id, entryId }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >
                                        &times;</Button>
                                    {entryId}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

EntryList.propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    entry: state.entry
});

export default connect(mapStateToProps, { getEntries, deleteEntry })(EntryList);