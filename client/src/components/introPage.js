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
                <video className='video' autoPlay muted loop playsInline>
                    <source src='../../api/video' type="video/mp4"/>
                </video>
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