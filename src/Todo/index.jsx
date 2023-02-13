import React, { createRef, PureComponent } from 'react'
import './todo.css'
import TodoForm from './todoForm';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

export default class Todo extends PureComponent {
    state = {
        todoList: [],
        filterType: 'all',
        error: null,
    };
    
    todoText = createRef();

    async componentDidMount() { 
      this.loadTodo('all');
    }

    loadTodo = async filterType => {
      try {
        let  url = 'http://localhost:3000/todoList'
        if (filterType !== 'all') {
          url += `?isDone=${filterType==='completed'}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json);
        }
        this.setState({todoList: json,filterType});
      } catch (error) {
          this.setState({error});
      }
    }

    addTodo = async event => {
      event.preventDefault();

      const todoText = this.todoText.current.value;

      const res = await fetch('http://localhost:3000/todoList', {
        method:'POST',
        body: JSON.stringify({
          text: todoText,
          isDone: false
        }),
        headers:{
          "Content-Type": 'application/json',
          Accept: 'application/json',
        }
      })

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      this.setState(
        ({ todoList }) => ({
            todoList: 
            [
              ...todoList,
              json
            ],
        }),
        () => {
          this.todoText.current.value = '';
        },
      );
    };

    toggleComplete = async item => {

      try {

        const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method:'PUT',
        body: JSON.stringify( { ...item, isDone: !item.isDone },),
        headers:{
          "Content-Type": 'application/json',
          Accept: 'application/json',
        }
      })

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }
        
      this.setState(({ todoList }) => {
        const index = todoList.findIndex(
          x => x.id === item.id,
        );
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
      } catch (error) {
        this.setState({error});
      }
    };
  
    deleteTodo = async item => {

      try {

        const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method:'DELETE',
        body: JSON.stringify( { ...item, isDone: !item.isDone },),
        headers:{
          "Content-Type": 'application/json',
          Accept: 'application/json',
        }
      })
      
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json);
      }
      
        this.setState(({ todoList }) => {
          const index = todoList.findIndex(
            x => x.id === item.id,
          );
          return {
            todoList: [
              ...todoList.slice(0, index),
              ...todoList.slice(index + 1),
            ],
          };
        });
        
      } catch (error) {
          this.setState({error});
      }
    };

    // setFilterType = filterType => {
    //   this.setState({filterType});
    // }

  render() {

    const { error, filterType, todoList } = this.state;

    if (error) {
      return <h1>{error.message}</h1>
      
    }

    return(
        <div className='todo'>
    <h1 className='todo__title'>Todo App</h1>
    <TodoForm
      addTodo={this.addTodo}
      ref={this.todoText}
    />
    
      <TodoList 
        todoList={todoList}
        toggleComplete={this.toggleComplete}
        deleteTodo={this.deleteTodo}
      />
    <TodoFilter 
      setFilterType={this.loadTodo} 
      filterType={filterType}
    />
</div>
    )
  }
}

