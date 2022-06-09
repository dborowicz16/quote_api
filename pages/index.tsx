import Head from 'next/head';
import React, { useState } from 'react';


export default function Home() {

  let [quote, setQuote] = useState('');
  let [author, setAuthor] = useState('');

  // Gets number to randomly pick json object
  function getRandomQuote(max: number) {
    return Math.floor(Math.random() * max);
  }

  // Puts random number in var (0-1643) so text & author can be from same json object
  let random = getRandomQuote(1643)

  // Creates an array to hold the json response from API
  let tmpArray: any[] = [];

  // Sends GET request to fetch quote & author from API then changes author & quote state
  function handleClick() {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          tmpArray.push(data[i])
        }
        setQuote(tmpArray[random].text)
        setAuthor(tmpArray[random].author)
      });
  }

  return (
    <>
      <div className="bg-black h-screen flex flex-col">
        <h1 className="text-white text-center self-center mt-auto text-5xl w-1/2 mb-5">{quote}</h1>
        <h1 className="text-white self-center text-5xl">{author}</h1>
        <button onClick={handleClick} className="bg-white text-blaxk font-bold py-2 px-4 rounded-full self-center my-auto">Click For A Random Quote</button>
      </div>
    </>
  )
} 
