import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './todoListItem';

function TodoList({
    todoList,
    toggleComplete,
    deleteTodo,
}) {
    console.log('Todolist render');
    return(
        <div className="w-full flex-1 overflow-y-auto">
        {todoList.map(item => (
                <TodoListItem
                    key={item.id}
                    item={item}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                />
            )
      )}
        </div>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number,
        text: PropTypes.string,
        isDone: PropTypes.bool,
      }),
    ).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  }; 

export default memo(TodoList);