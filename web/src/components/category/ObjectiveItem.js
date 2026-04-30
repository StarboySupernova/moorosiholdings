import React from 'react';
import MyPortableText from '../MyPortableText';
import { CategoryItemStyles } from '../../styles/category/CategoryItemStyles';

function ObjectiveItem({ description }) {
  return (
    <CategoryItemStyles>
      <div className="text">
        <MyPortableText value={description} />
      </div>
    </CategoryItemStyles>
  );
}

export default ObjectiveItem;
