import React from 'react';
import '../App.css'

function TodoItem({item, updateItem, updateCompleted, deleteItem}) {
  return (
    <div className="todo-item">
      <input type="checkbox" className="item-completed" defaultChecked={item.completed ? true : false} onChange={(e) => updateCompleted(e.target.checked, item.id)} />
      <input type="text" className={item.completed ? "completed item-text" : "item-text"} row="1" defaultValue={item.item} onBlur={(e) => updateItem(e.target.value, item.id)} />
      <span className="far fa-trash-alt delete" onClick={(e) => deleteItem(item.id)}></span>
    </div>
  );
}

export default TodoItem;
