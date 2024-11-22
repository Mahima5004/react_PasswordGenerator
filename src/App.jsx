import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  //logic to generate password >> using useCallback hook, this is used where we have to run same funtion 
  //multiple numbers of time
  const  generatePassword = useCallback(()=>{
   let pass = ""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numberAllowed) str +="0123456789"
   if(specialCharAllowed) str+="!@#$%^&*()_-+=[]{}|;:,.<>?"
   for(let i=1;i<=length;i++){
    pass += str.charAt(Math.floor(Math.random()*str.length))
   }
   setPassword(pass);
  },[length,numberAllowed,specialCharAllowed]);

  useEffect(()=>{
    generatePassword();
  },[length,numberAllowed,specialCharAllowed]);

  //logic for copying the password thorugh inbuld methods
  const passwordRef = useRef(null); // using useRef hook to take a reference of the text or the unit in the webPage
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,499); // this is used if you want to select only 500 char

  }
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 
      bg-gray-80 text-orange-500'>
        <h1 className='text-white text-center my-3 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
          className='outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white'
          onClick={copyPasswordToClipboard}>
          Copy
          </button>
        </div>
        <div className='flex gap-x-2 text-sm'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          className='cursor-pointer'
          min={6}
          max={100}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          name=''
          id='' />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>setNumberAllowed((prev)=>!prev)}
          name=''
          id='' />
          <label htmlFor="number">Number</label>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={specialCharAllowed}
          onChange={()=>setSpecialCharAllowed((prev)=>!prev)}
          name=''
          id='' />
          <label htmlFor="character">Special Character</label>
        </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
