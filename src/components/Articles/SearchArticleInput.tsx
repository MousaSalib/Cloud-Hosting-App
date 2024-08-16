"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SearchArticleInput = () => {
    const router = useRouter();
    const [ searchText, setSearchText ] = useState("");
    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        router.push(`/articles/search?searchText=${searchText}`);

    }

  return (
    <>
        <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
             <input 
               className="w-full p-3 rounded text-xl border-none text-gray-950" 
               type="search" 
               placeholder="Search For Article"
               value={searchText}
               onChange={(e) => setSearchText(e.target.value) } 
               />
         </form>
    </>
  )
}

export default SearchArticleInput;
