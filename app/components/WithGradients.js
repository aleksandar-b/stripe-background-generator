import React, { Component } from 'react';

const WithGradients = WrappedComponent => class extends Component {
    state = {
      gradients: [],
    };

    componentDidMount() {
      window.fetch('https://raw.githubusercontent.com/ghosh/uiGradients/master/gradients.json')
        .then(response => response.json())
        .then((gradients) => {
          this.setState({ gradients });
        });
    }

    render() {
      const { gradients } = this.state;
      return (
        <WrappedComponent {...this.props} gradients={gradients} />
      );
    }
};

export default WithGradients;
