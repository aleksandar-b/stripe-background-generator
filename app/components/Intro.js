import React from 'react';
import chroma from 'chroma-js';
import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip/Chip';
import Icon from '@material-ui/core/Icon/Icon';
import { observer, inject, PropTypes } from 'mobx-react';

const styles = theme => ({
  root: {
    position: 'absolute',
    marginTop: '-7%',
    fontFamily: 'Camphor,Open Sans,Segoe UI,sans-serif',
    margin: '150px 0 0 0',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  announcement: {
    color: '#fff',
    borderRadius: 15,
    fontSize: 14,
    fontWeight: 300,
    textDecoration: 'none',
    margin: '130px 0 30px 0',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 2px 1px -1px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    margin: '30px 20px 30px 0',
  },
  primaryButton: {
    margin: '30px 20px 30px 0',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  secondaryButton: {
    margin: '30px 20px 30px 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  divider: {
    maxWidth: '50%',
    background: 'rgba(255, 255, 255, .3)',
  },
  header: {
    fontSize: 40,
    fontWeight: 300,
    maxWidth: '70%',
    color: '#fff',
    fontFamily: 'Camphor,Open Sans,Segoe UI,sans-serif',
    margin: '30px 0 30px 0',
  },
  bodyText: {
    fontWeight: 300,
    fontSize: 17,
    color: '#fff',
    lineHeight: '28px',
    maxWidth: '50%',
    margin: '30px 0 30px 0',
  },
});

const Intro = props => {
  const {
    classes,
    store: { headOfPalette, lastOfPalette },
    store,
    randomColorStore,
  } = props;

  const color = value => (chroma(value).luminance() > 0.5 ? '#000' : '#fff');

  const Header = styled.h1`
    font-size: 40px;
    font-weight: 300;
    max-width: 70%;
    font-family: Camphor, Open Sans, Segoe UI, sans-serif;
    margin: 30px 0 30px 0;
    ${css`
      color: ${color(headOfPalette.standard)};
    `};

    @media (max-width: 900px) {
      max-width: 100%;
      font-size: 30px;
    }
  `;

  const BodyText = styled.p`
    font-weight: 300;
    font-size: 17px;
    color: #fff;
    line-height: 28px;
    max-width: 50%;
    margin: 30px 0 30px 0;
    ${css`
      color: ${color(headOfPalette.standard)};
    `};

    @media (max-width: 900px) {
      max-width: 100%;
    }
  `;
  return (
    <section className={classes.root}>
      <div>
        <Chip
          icon={<Icon>face_icon</Icon>}
          label="Introducing Background Generator"
          className={classes.announcement}
          style={{ background: headOfPalette.standard, color: color(headOfPalette.standard) }}
          color="primary"
        />
        <Header>The new standard in background generators</Header>
        <BodyText>
          Background generator is the best software platform for running an internet business. We handle billions of dollars
          every year for forward-thinking businesses around the world.
        </BodyText>
        <Button
          variant="contained"
          size="large"
          className={classes.secondaryButton}
          style={{
            background: lastOfPalette.standard,
            color: color(lastOfPalette.standard),
          }}
          onClick={() => randomColorStore.setRandomBackgroundAndPaletteFromGradients()}
        >
          Next Palette
        </Button>
        <Button
          variant="contained"
          size="large"
          className={classes.primaryButton}
          style={{
            background: headOfPalette.standard,
            color: color(headOfPalette.standard),
          }}
          onClick={() => store.toggleTabs()}
        >
          Try now
        </Button>
      </div>
    </section>
  );
};

Intro.propTypes = {
  classes: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.objectOrObservableObject.isRequired,
  randomColorStore: PropTypes.objectOrObservableObject.isRequired,
};

export default withStyles(styles)(inject('store', 'randomColorStore')(observer(Intro)));
