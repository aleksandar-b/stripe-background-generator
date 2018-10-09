import React from 'react';
import { PropTypes, observer, inject } from 'mobx-react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import SketchPicker from './SketchPicker';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const ColorPaletteList = props => {
  const { classes, palette, backgroundPicker } = props;

  const handleDeleteColor = c => {
    const { store } = props;
    if (backgroundPicker) {
      store.deleteColorFromPaletteBackground(c);
    } else {
      store.deleteColorFromPalette(c);
    }
  };
  return (
    <div className={classes.root}>
      <List>
        {palette.map(color => (
          <ListItem dense button className={classes.listItem} key={color.id}>
            <ListItemText>
              <SketchPicker backgroundPicker={backgroundPicker} color={color} />
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={() => handleDeleteColor(color)}>
                <Icon>delete_icon </Icon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ColorPaletteList.propTypes = {
  classes: PropTypes.objectOrObservableObject.isRequired,
  palette: PropTypes.arrayOrObservableArray.isRequired,
  store: PropTypes.objectOrObservableObject.isRequired,
  backgroundPicker: propTypes.bool,
};
ColorPaletteList.defaultProps = {
  backgroundPicker: false,
};

export default withStyles(styles)(inject('store')(observer(ColorPaletteList)));
