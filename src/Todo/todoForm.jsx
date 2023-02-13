import React, {forwardRef, memo} from "react";
import PropTypes from 'prop-types';

const TodoForm = forwardRef (({ addTodo},ref) => {
    console.log('Todoform ');
    return(
        <form 
            onSubmit={addTodo}
            className='todo__form todo_form'>
            <input 
                ref={ref}
                className='todo_form__input'
                placeholder="Add your todo items"
                type="text"
            />
            <button 
                type="submit"
                className='todo_form__btn'
            >Add</button>
        </form>
    );  
});

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default memo(TodoForm);
