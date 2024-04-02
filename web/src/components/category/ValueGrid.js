import React from 'react';
import { ValueGridStyles } from '../../styles/category/CategoryGridStyles';
import ValueItem from './ValueItem';

function ValueGrid({ demtValues }) {
  return (
    <ValueGridStyles>
      {demtValues.map((item) => (
        <ValueItem key={item.id} description={item._rawDescription} />
      ))}
    </ValueGridStyles>
  );
}

export default ValueGrid;
