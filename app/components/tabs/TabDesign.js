import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Chip from '@material-ui/core/Chip/Chip';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ColorPaletteList from './ColorPaletteList';
import { stripeSizes, stripeStyles, circlePositions, circleStyles } from '../../utils/Constants';

const styles = theme => ({
  section: {
    background: theme.palette.background.paper,
  },
  refresh: {
    marginBottom: 20,
  },
});

class TabDesign extends Component {
  state = {
    isPickerOpen: false,
  };

  handleChange = (name, idx) => event => {
    const { store } = this.props;
    if (idx !== undefined) {
      store[`handle${name}`](event.target.value, idx);
    } else {
      store[`handle${name}`](event.target.value);
    }
  };

  toggleOpenPicker = () => {
    const { isPickerOpen } = this.state;
    this.setState({
      isPickerOpen: !isPickerOpen,
    });
  };

  closePicker = () => {
    this.setState({
      isPickerOpen: false,
    });
  };

  render() {
    const {
      store: {
        rows,
        columns,
        stripeSize,
        stripeStyle,
        stripeRound,
        background,
        palette,
        stripeAlpha,
        showCirclesSection,
        circlesGroup,
      },
    } = this.props;
    const { store, classes } = this.props;

    return (
      <>
        <Grid container direction="column">
          <Chip
            icon={<Icon>refresh_icon</Icon>}
            label="Refresh"
            color="primary"
            onClick={() => store.forceRefresh()}
            className={classes.refresh}
          />
          <Chip
            icon={<Icon>add_icon</Icon>}
            label="Add Background"
            color="primary"
            onClick={() => store.addBackgroundPalette({ r: 255, g: 255, b: 255, a: 1 })}
          />
          <Grid>
            <ColorPaletteList palette={background} backgroundPicker />
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Chip
            icon={<Icon>add_icon</Icon>}
            label="Add Palette"
            color="primary"
            onClick={() => store.addPalette({ r: 255, g: 255, b: 255, a: 1 })}
          />
          <Grid>
            <ColorPaletteList palette={palette} />
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Chip icon={<Icon>face_icon</Icon>} label="Grid" color="primary" />
          <Grid container direction="row" spacing={32} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                id="rows"
                label="Rows"
                type="number"
                inputProps={{ min: 1, max: 2000 }}
                value={rows}
                onChange={this.handleChange('Rows')}
                margin="normal"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                id="columns"
                label="Columns"
                type="number"
                inputProps={{ min: 1, max: 2000 }}
                value={columns}
                onChange={this.handleChange('Columns')}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Chip icon={<Icon>face_icon</Icon>} label="Stripe" color="primary" />
          <Grid container direction="row" spacing={32} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                id="stripe-size"
                select
                label="Size"
                value={stripeSize}
                onChange={this.handleChange('StripeSize')}
                margin="normal"
              >
                {stripeSizes.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                id="stripe-style"
                select
                label="Style"
                value={stripeStyle}
                onChange={this.handleChange('StripeStyle')}
                margin="normal"
              >
                {stripeStyles.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Grid container direction="row" spacing={32} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                id="stripe-round"
                label="Round"
                type="number"
                inputProps={{ min: 0, max: 2000 }}
                value={stripeRound}
                onChange={this.handleChange('StripeRound')}
                margin="normal"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                id="stripe-alpha"
                label="Alpha"
                type="number"
                inputProps={{ min: 0, max: 100 }}
                value={stripeAlpha}
                onChange={this.handleChange('StripeAlpha')}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <Chip icon={<Icon>add_icon</Icon>} label="Add Circles Group" color="primary" onClick={() => store.addCircleGroup()} />

          {circlesGroup.map((group, idx) => {
            return (
              <Grid container direction="column" key={group.id} className={classes.section}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <h4>Group #{idx + 1}</h4>
                  <IconButton onClick={() => store.deleteCircleGroup(idx)}>
                    <Icon>delete_icon</Icon>
                  </IconButton>
                </Grid>
                <Grid container direction="row" spacing={32} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      id="circle-position"
                      select
                      label="Position"
                      value={group.circlePosition}
                      onChange={this.handleChange('CirclePosition', idx)}
                      margin="normal"
                    >
                      {circlePositions.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      id="circle-style"
                      select
                      label="Style"
                      value={group.circleStyle}
                      onChange={this.handleChange('CircleStyle', idx)}
                      margin="normal"
                    >
                      {circleStyles.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={32} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      id="circle-quantity"
                      label="Quantity"
                      type="number"
                      inputProps={{ min: 0, max: 100 }}
                      value={group.circleQuantity}
                      onChange={this.handleChange('CircleQuantity', idx)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      fullWidth
                      id="circle-size"
                      label="Size"
                      type="number"
                      inputProps={{ min: 0, max: 100 }}
                      value={group.circleSize}
                      onChange={this.handleChange('CircleSize', idx)}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={32} alignItems="center">
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        showCirclesSection && (
                          <Checkbox
                            checked={group.circleAnimation}
                            onChange={this.handleChange('CircleAnimation', idx)}
                            value={`animation${idx}`}
                            label="Animation"
                            color="primary"
                          />
                        )
                      }
                      label="Animation"
                    />
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

TabDesign.propTypes = {
  store: PropTypes.observableObject.isRequired,
  classes: PropTypes.objectOrObservableObject.isRequired,
};

export default withStyles(styles)(inject('store')(observer(TabDesign)));
