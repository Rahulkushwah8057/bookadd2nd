
import React, { useState } from 'react';
import './Bookadd.css'; 

function Bookadd() {
  const [selectedBook, setSelectedBook] = useState('');
  const [price, setPrice] = useState(''); //for price
  const [books, setBooks] = useState([]); // for book

  function handleFormSubmit(e){
    e.preventDefault();
    
    if (!selectedBook) return;
    // createing for book object and add to the books array
    const newBook = {
      name: selectedBook,
      price: price,
      qty: 1,
      total: price,
    };
    setBooks([...books,newBook]);
    // for clear the selected book and price inputs
    setSelectedBook(books.name);
    setPrice('');
  }

  function handleBookChange(e) {
    setSelectedBook(e.target.value);
  }
 

  return (
    <div >
      <h1 className='title'>Book On</h1>
      <div className='center'>
      <form onSubmit={handleFormSubmit}>
        <select value={selectedBook} onChange={handleBookChange}>
          <option value=""></option>
          <option value="Book 1">Book 1</option>
          <option value="Book 2">Book 2</option>
          <option value="Book 3">Book 3</option>
        </select>      
        <button type="submit">Add Book</button>
      </form>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>  <input type="text" value={book.price} onChange={(e)=>{
            const newPrice = e.target.value; //storing the input value
            const newTotal = newPrice*book.qty ; // storing the total price 

            const updatedBooks = [...books]; //spread oprator for copying and creating a new array
            updatedBooks[index]={
              ...updatedBooks[index], //updating the values
              price:newPrice,
              total: newTotal,
            };
            setBooks(updatedBooks);            
          }}/> 
         </td>
                <td>
                  <select
                    value={book.qty}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value);
                      // for updating total price of  book
                      const newTotal = newQty * book.price;
                      //for update the book object in the books array
                      const updatedBooks = [...books];
                      updatedBooks[index] = {
                        ...updatedBooks[index],
                        qty: newQty,
                        total: newTotal,
                      };
                      setBooks(updatedBooks);
                    }}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </td>
                <td>{book.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="totalPrice">Grand Total: {books.reduce((rahul, curr) => rahul + curr.total, 0)}</p>
      </div>
      </div>);
 }
export default Bookadd;
