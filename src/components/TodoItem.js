import React from 'react';
import '../App.css'

function TodoItem({item}) {
  return (
    <div className="todo-item">
      <input type="checkbox" />
      <input type="text" value={item.item} />
      <i class="far fa-trash-alt delete"></i>
    </div>
  );
}

export default TodoItem;
