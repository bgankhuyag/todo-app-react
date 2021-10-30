import React, { useState } from 'react';
import TodoItem from './TodoItem'
import '../App.css'

function Todo({items, addItem}) {
  const [newItem, setNewItem] = useState('');

  const handleChange = (e) => {
    setNewItem(e.target.value)
  }

  return (
    <div className="todo">
      <div className="heading">
        <span className="title">Todo Items</span> ({items.length})
      </div>
      <div className="content">
        <form className="add" onSubmit={(e) => {setNewItem(''); addItem(e, newItem)}}>
          <input type="text" placeholder="Enter New Item" className="add-input" value={newItem} onChange={handleChange} />
          <button className="add-button" type="submit">Add Item</button>
        </form>
        {items.map((item) => <TodoItem key={item.id} item={item}/>)}
      </div>
    </div>
  );
}

export default Todo;
