import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../actions/entryActions';
import PropTypes from 'prop-types';

class EntryList extends Component {

    static propTypes = {
        getEntries: PropTypes.func.isRequired,
        entry: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        userId: PropTypes.object
    };

    componentDidUpdate() {
        if (!this.props.loaded && this.props.isAuthenticated && this.props.userId) {
            this.props.getEntries(this.props.userId._id);
        } 
    }

    onDeleteClick = (entryId) => {
        this.props.deleteEntry(entryId);
    }

    render() {
        const { entries } = this.props.entry;

        const entryListFrag = (
            <Fragment>
                <ListGroup>
                    <TransitionGroup className="entry-list">
                        {entries.map(({ _id, entryId }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >
                                        &times;
                                        </Button> : null}
                                    {entryId}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Fragment>
        );


        return(
            <Container>  
                { this.props.isAuthenticated ? entryListFrag : null }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    entry: state.entry,
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user,
    loaded: state.entry.loaded
});

export default connect(mapStateToProps, { getEntries, deleteEntry })(EntryList);