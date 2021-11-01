import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css'
import Todo from './components/Todo'

const url = "http://localhost:8080";

// r.HandleFunc("/get_items", h.getItems).Methods("GET")
//   r.HandleFunc("/new_item", h.newItem).Methods("POST")
//   r.HandleFunc("/update_item/{id}", h.updateItem).Methods("PUT")
//   r.HandleFunc("/update_completed/{id}", h.updateCompleted).Methods("PUT")
//   r.HandleFunc("/delete_item/{id}", h.deleteItem).Methods("DELETE")

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    axios.get(
      `${url}/get_items`
    ).then(res => {
      if (res.data.data) {
        setItems(res.data.data);
      }
    })
  }

  const addItem = (e, item) => {
    e.preventDefault();
    if (item !== "") {
      var itemData = new FormData();
      itemData.append('item', item)
      axios.post(
        `${url}/new_item`,
        itemData
      ).then(res => {
        if (res.data.type === 'error') {
          alert(res.data.message);
        } else {
          setItems([...items, res.data.data[0]]);
        }
      })
    }
  }

  const updateItem = (item, id) => {
    if (item !== "" && id !== "") {
      var itemData = new FormData();
      itemData.append('item', item)
      axios.put(
        `${url}/update_item/${id}`,
        itemData
      ).then(res => {
        console.log(res.data);
        if (res.data.type === 'error') {
          alert(res.data.message);
        }
      })
    }
  }

  const updateCompleted = (completed, id) => {
    completed = completed ? 1 : 0;
    if (completed !== "" && id !== "") {
      var itemData = new FormData();
      itemData.append('completed', completed)
      axios.put(
        `${url}/update_completed/${id}`,
        itemData
      ).then(res => {
        if (res.data.type === 'error') {
          alert(res.data.message);
        } else {
          let tempItems = [...items];
          let itemIndex = tempItems.findIndex((elem) => elem.id===id);
          tempItems[itemIndex].completed = completed;
          setItems(tempItems);
        }
      })
    }
  }

  const deleteItem = (id) => {
    console.log(id);
    if (id !== "") {
      axios.delete(
        `${url}/delete_item/${id}`,
      ).then(res => {
        if (res.data.type === 'error') {
          alert(res.data.message);
        } else {
          let tempItems = [...items];
          let itemIndex = tempItems.findIndex((elem) => elem.id===id);
          tempItems.splice(itemIndex, 1);
          setItems(tempItems);
        }
      })
    }
  }

  return (
    <div className="App">
      <Todo items={items} addItem={addItem} updateItem={updateItem} updateCompleted={updateCompleted} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
