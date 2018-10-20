import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Grid from '@material-ui/core/Grid';
import ColorPaletteList from './ColorPaletteList';
import { stripeSizes, stripeStyles, circlePositions } from '../../utils/Constants';

class TabDesign extends Component {
  state = {
    isPickerOpen: false,
  };

  handleChange = name => event => {
    const { store } = this.props;
    store[`handle${name}`](event.target.value);
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
      store: { rows, columns, stripeSize, stripeStyle, stripeRound, background, palette, stripeAlpha, circlePosition },
    } = this.props;
    const { store, randomColorStore } = this.props;

    return (
      <>
        <Grid direction="column">
          <Grid direction="row" container justify="space-between">
            <h3>Background</h3>
            <IconButton onClick={() => randomColorStore.setRandomBackgroundAndPaletteFromGradients()}>
              <Icon>refresh_icon</Icon>
            </IconButton>
            <IconButton onClick={() => store.addBackgroundPalette({ id: Math.random(), value: '#000000' })}>
              <Icon>add_icon</Icon>
            </IconButton>
          </Grid>
          <Grid flex>
            <ColorPaletteList palette={background} backgroundPicker />
          </Grid>
        </Grid>
        <Grid column>
          <Grid direction="row" container justify="space-between">
            <h3>Palette</h3>
            <IconButton onClick={() => store.addPalette({ id: Math.random(), value: '#000000' })}>
              <Icon>add_icon</Icon>
            </IconButton>
          </Grid>
          <Grid flex>
            <ColorPaletteList palette={palette} />
          </Grid>
        </Grid>
        <Grid column>
          <h3>Grid</h3>
          <Grid container spacing={32} alignItems="center">
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
        <Grid column>
          <h3>Stripe</h3>
          <Grid container spacing={32} alignItems="center">
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
        <Grid column>
          <Grid container spacing={32} alignItems="center">
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
        <Grid column>
          <h3>Circles</h3>
          <Grid container spacing={32} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                id="circle-position"
                select
                label="Position"
                value={circlePosition}
                onChange={this.handleChange('CirclePosition')}
                margin="normal"
              >
                {circlePositions.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

TabDesign.propTypes = {
  store: PropTypes.observableObject.isRequired,
  randomColorStore: PropTypes.observableObject.isRequired,
};

export default inject('store', 'randomColorStore')(observer(TabDesign));
