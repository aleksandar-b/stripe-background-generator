import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import styled, { css } from 'styled-components';

const GridCssBackground = ({ store }) => {
  const Grid = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    transform: skewY(-12deg);
    grid-template-columns: repeat(${store.grid.columns}, 1fr);
    grid-template-rows: repeat(${store.grid.rows}, 1fr);
    grid-gap: 5px;
    background: ${store.background[0].standard};

    ${store.background.length > 1 &&
      css`
        background: linear-gradient(to right, ${store.background.map(c => c.standard).join(',')});
      `};
  `;

  return (
    <Grid>
      {store.stripes.map(stripe => {
        const Span = styled.span`
          background: ${stripe.colors[0].standard};
          ${stripe.colors.length > 1 &&
            css`
              background: linear-gradient(to right, ${stripe.colors.map(c => c.standard).join(',')});
            `};
          grid-column-start: ${stripe.columnStart};
          grid-column-end: ${stripe.columnEnd};
          grid-row-start: ${stripe.rowStart};
          grid-row-end: ${stripe.rowEnd};
        `;
        return <Span key={stripe.id} />;
      })}
    </Grid>
  );
};

GridCssBackground.propTypes = {
  store: PropTypes.observableObject.isRequired,
};

export default inject('store')(observer(GridCssBackground));
