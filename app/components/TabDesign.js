import React, { Component } from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Flex, { FlexItem } from 'styled-flex-component';
import ColorPaletteList from './ColorPaletteList';
import { stripeSizes, stripeStyles } from '../utils/Constants';

class TabDesign extends Component {
    state = {
      isPickerOpen: false,
    };

    handleChange = name => (event) => {
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
        store: {
          rows, columns, stripeSize, stripeStyle, background, palette,
        },
      } = this.props;
      const { store } = this.props;

      return (
        <>
          <Flex column>
            <Flex flex justifyBetween alignCenter>
              <h3>Background</h3><IconButton onClick={() => store.addBackgroundPalette({ id: Math.random(), value: '#000000' })}><Icon>add_icon</Icon></IconButton>
            </Flex>
            <Flex flex>
              <ColorPaletteList palette={background} backgroundPicker />
            </Flex>
          </Flex>
          <Flex column>
            <Flex flex justifyBetween alignCenter>
              <h3>Palette</h3><IconButton onClick={() => store.addPalette({ id: Math.random(), value: '#000000' })}><Icon>add_icon</Icon></IconButton>
            </Flex>
            <Flex flex>
              <ColorPaletteList palette={palette} />
            </Flex>
          </Flex>
          <Flex column>
            <h3>Grid</h3>
            <Flex justifyAround contentSpaceAround>
              <FlexItem grow={1} style={{ marginRight: 16 }}>
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
              </FlexItem>
              <FlexItem grow={1} style={{ marginLeft: 16 }}>
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
              </FlexItem>
            </Flex>
          </Flex>
          <Flex column>
            <h3>Stripe options</h3>
            <Flex justifyBetween contentSpaceAround alignCenter>
              <FlexItem grow={1} style={{ marginRight: 16 }}>
                <TextField
                  fullWidth
                  id="stripe-size"
                  select
                  label="Stripe size"
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
              </FlexItem>
              <FlexItem grow={1}>
                <TextField
                  fullWidth
                  id="stripe-style"
                  select
                  label="Stripe style"
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
              </FlexItem>
            </Flex>
          </Flex>
        </>
      );
    }
}

TabDesign.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject('store')(observer(TabDesign));
