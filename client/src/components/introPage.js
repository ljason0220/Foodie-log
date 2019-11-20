import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class IntroPage extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render() {
        const introSection = (
            <Fragment>
                <h1>Intro landing page here eventually</h1>
                <h2>Register or login to see entries</h2>
            </Fragment>
        );

        return(
            <Container>  
                { this.props.isAuthenticated ? null : introSection }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { })(IntroPage);