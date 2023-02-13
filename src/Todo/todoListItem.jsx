import clsx from 'clsx';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function TodoListItem({
  item,
  toggleComplete,
  deleteTodo,
}) {
    return (
        <div key={item.id} className="flex items-center m-4">
          <input
            type="checkbox"
            checked={item.isDone}
            className="disabled:accent-slate-400 disabled:cursor-wait"
            onChange={() => toggleComplete(item)}
          />
          <p
            className={clsx('flex-1 px-4', {
              'line-through': item.isDone,
            })}
          >
            {item.text}
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => deleteTodo(item)}
          >
            Delete
          </button>
        </div>
      );
}

TodoListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    text: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};


export default memo(TodoListItem);
