import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import TabsControl from './TabsControl';
import withGradients from './WithGradients';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },

  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Controls extends Component {
  state = {
    isShowTabs: false,
  };

  toggleTabs = () => {
    const { isShowTabs } = this.state;
    this.setState({ isShowTabs: !isShowTabs });
  };

  render() {
    const { classes } = this.props;
    const { isShowTabs } = this.state;
    return (
      <div className={classes.root}>
        {isShowTabs && <TabsControl />}
        <Button variant="fab" color="primary" aria-label="Toggle Tabs" className={classes.fab} onClick={this.toggleTabs}>
          <Icon>settings_icon</Icon>
        </Button>
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
export default withStyles(styles)(withGradients(Controls));
