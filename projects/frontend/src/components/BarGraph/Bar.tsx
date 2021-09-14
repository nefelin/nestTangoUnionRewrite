import React, { HTMLAttributes } from 'react';

import { BarFill, YearBarProps } from './BarFill';

const Bar = ({
  barHeight,
  color,
  hovered,
  selected,
  allSelected,
  year,
  ...divProps
}: HTMLAttributes<HTMLDivElement> & YearBarProps) => {
  const backgroundColor = allSelected || selected ? 'inherit' : 'rgb(220,220,240)'
  const startsDecade = year % 10 === 0;
  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      style={{
        // borderTop: hovered ? '2px solid black' : 'none',
        backgroundColor,
        boxSizing: 'border-box',
        // paddingTop: '4px',
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%',
        width: '1%',
        transition: 'all 1s, background-color 0s',
        marginRight: 1,
        // borderLeft: startsDecade ? '1px solid black' : 'none',
        // borderTop: '2px solid dimgrey',
      }}
      {...divProps}
    >
      <BarFill {...{ year, allSelected, selected, hovered, barHeight, color }} />
    </div>
  );
};

export default Bar;
