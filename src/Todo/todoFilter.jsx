import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const filterBtns = [
  {
    text: 'All',
    value: 'all',
  },
  {
    text: 'Pending',
    value: 'pending',
  },
  {
    text: 'Completed',
    value: 'completed',
  },
];

function TodoFilter({  setFilterType, filterType }) {
  return (
    <div className="w-full flex">
      {filterBtns.map(x => (
        <button
          key={x.value}
          type="button"
          className={clsx('btn flex-1',{
            'btn--active':filterType === x.value,
        
        })}
          onClick={() => setFilterType(x.value)}
        >
          {x.text}
        </button>
      ))}
    </div>
  );
}

TodoFilter.propTypes = {
    filterType: PropTypes.string.isRequired,
    setFilterType: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
