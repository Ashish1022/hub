import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
  return (
    <form className='flex max-w-[600px] w-full'>
      <div className='relative w-full'>
        <input type="text" placeholder='Search' className='w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-800' />
      </div>
      <button type='submit' className='px-5 py-2.5 border border-l-0 rounded-r-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'>
        <SearchIcon className='size-5'/>
      </button>
    </form>
  )
}

export default SearchInput