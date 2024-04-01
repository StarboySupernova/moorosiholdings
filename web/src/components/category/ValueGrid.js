import React from 'react';
import { CategoryGridStyles } from '../../styles/category/CategoryGridStyles';
import ValueItem from './ValueItem';

function ValueGrid({ demtValues }) {
  return (
    <CategoryGridStyles>
      {demtValues.map((item) => (
        <ValueItem key={item.id} description={item._rawDescription} />
      ))}
    </CategoryGridStyles>
  );
}

export default ValueGrid;
