import React from 'react';
import { ItemRenderer } from '@blueprintjs/select';
import { MenuItem, Text } from '@blueprintjs/core';
import { highlightText } from '../Select/renderers';
import { Option } from '../Select/types';

export const renderItem: ItemRenderer<Option> = (
  item,
  { handleClick, modifiers, query },
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.key}
      onClick={handleClick}
      text={
        <Text
          ellipsize
          tagName="div"
          className="flex flex-row items-center justify-start"
        >
          <img
            src={item.data}
            className="w-6 h-6 object-contain mr-2"
            alt={item.label}
          />
          {highlightText(item.label || item.key, query)}
        </Text>
      }
    />
  );
};

export const valueRenderer = (item: Option) => {
  return (
    <Text
      ellipsize
      tagName="div"
      className="flex flex-row items-center justify-start"
    >
      <img
        src={item.data}
        className="w-6 h-6 object-contain mr-2"
        alt={item.label}
      />
      {item.label || item.key}
    </Text>
  );
};
