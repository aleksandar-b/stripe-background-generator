import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabDesign from './TabDesign';
import TabCode from './TabCode';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3, maxHeight: 500 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: '80px',
    right: 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
    width: 350,
  },
});

class TabsControl extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="Design" />
            <Tab label="Code" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          containerStyle={{ maxHeight: 600, minHeight: 600 }}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>{value === 0 && <TabDesign />}</TabContainer>
          <TabContainer dir={theme.direction}>{value === 1 && <TabCode />}</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

TabsControl.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles, { withTheme: true })(TabsControl);
