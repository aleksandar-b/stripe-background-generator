import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { times } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer, PropTypes } from 'mobx-react';
import TabsControl from './tabs/TabsControl';
import { circlePositions } from '../utils/Constants';
import { random } from '../utils/Helpers';

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

  componentDidMount() {
    const { randomColorStore, store } = this.props;
    randomColorStore.fetchGradients().then(() => {
      times(
        idx =>
          setTimeout(() => {
            store.circlePosition = circlePositions[random(0, 2)].id;
            randomColorStore.setRandomBackgroundAndPaletteFromGradients();
          }, 1000 * idx),
        8,
      );
    });
  }

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
  classes: PropTypes.objectOrObservableObject.isRequired,
  randomColorStore: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.objectOrObservableObject.isRequired,
};
export default withStyles(styles)(inject('randomColorStore', 'store')(observer(Controls)));
