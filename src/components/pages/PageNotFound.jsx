import React, { Component } from 'react';
import { Card, CircularProgress } from '@material-ui/core';

class PageNotFound extends Component {
  constructor (props) {
    super(props);
    this.state = {
      blankPage: false,
    };
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ blankPage: true });
      setTimeout(() => {
        this.props.history.push('/');
      }, 750);
    }, 2000);
  }

  shouldComponentUpdate (nextState) {
    if (this.state.blankPage !== nextState.blankPage) return true;
    return false;
  }

  render () {
    return (
      <>
        {this.state.blankPage ? (
          null
        ) : (
          <div className="container">
            <div className="center-text">
              <Card className="card border no-shadow px-sm py-sm mb-sm">
                <h3>
                  {"We're sorry, we can't find this page."}
                </h3>
                <h5 className="subtitle">
                  Please wait while we redirect you to the homepage.
                </h5>
                <CircularProgress />
              </Card>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PageNotFound;
