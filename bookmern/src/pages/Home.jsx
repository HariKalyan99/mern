import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import {MdOutlineAddBox} from 'react-icons/md'
import  axios  from 'axios'
import BooksCard from '../components/home/BooksCard'
import BooksTable from '../components/home/BooksTable'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table')
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        const fetchBooks = async() => {
            setLoading(true);
          try{
            const {data} = await axios.get('http://localhost:4141/books', signal);
            setBooks(data.data);
            setLoading(false)
          }catch(error){
            console.log(error);
          }
        }
    
        fetchBooks()
    
        return () => {
          controller.abort();
        }
      }, [])
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>Table</button>
            <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>Card</button>
        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to={"/books/create"}>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>
        {loading ? <Loading /> : showType === 'table' ? <BooksTable books={books}/> : <BooksCard books={books}/>}
    </div>
  )
}

export default Home