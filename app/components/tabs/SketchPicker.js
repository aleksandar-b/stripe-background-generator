/* eslint-disable react/prop-types */

import React from 'react';
import { SketchPicker } from 'react-color';
import { observer, inject } from 'mobx-react';
import { toRgbString } from '../../utils/Helpers';

class Sketch extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = c => {
    const { store, color, backgroundPicker } = this.props;
    if (backgroundPicker) {
      store.handleChangeBackgroundColor({ id: color.id, value: c.rgb, standard: toRgbString(c.rgb) });
    } else {
      store.handleChangeColor({ id: color.id, value: c.rgb, standard: toRgbString(c.rgb) });
    }
  };

  render() {
    const { displayColorPicker } = this.state;
    const { color } = this.props;

    const styles = {
      color: {
        width: '100%',
        height: '24px',
        borderRadius: '2px',
        background: color.standard,
      },
      swatch: {
        flexGrow: 1,
        padding: '3px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.07)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    };

    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div role="presentation" style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {displayColorPicker ? (
          <div style={styles.popover}>
            <div role="presentation" style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={color.value} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default inject('store')(observer(Sketch));
