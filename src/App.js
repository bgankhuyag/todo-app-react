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
      console.log(res.data.data);
      setItems(res.data.data);
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
        console.log(res.data);
        if (res.data.type === 'error') {
          alert('There was an error adding new item.');
        } else {
          setItems([...items, res.data.data[0]]);
        }
      })
    }
  }

  return (
    <div className="App">
      <Todo items={items} addItem={addItem} />
    </div>
  );
}

export default App;
