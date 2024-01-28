import { useCallback, useState, useEffect, useRef } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setpassword] = useState("")
  
  // use ref hook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*(){}[]+_="

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, numberAllowed, charAllowed, setpassword])

  const copyPasswordToclipbord = useCallback(() => {
    passwordRef.current?.select()

    // use too seclect specific rangef password 
    // passwordRef.current?.setSelectionRange(0, 8) 
    window.navigator.clipboard.writeText(password)
  },
    [password])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, charAllowed, passwordGenrator])
  return (
    <>
      <h1 className='text-4xl text-center text-white my-10'>Password generator</h1>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-5 py-4 my-8 text-withe-500 bg-gray-800'>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className='outline-none w-full py=1 px-3'
            placeholder='passwoord'
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToclipbord}
            className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0  hover:bg-blue-800 text-white'
          >copy</button>

        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type="range"
              min={8}
              max={50}
              value={length}
              className='coursr-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-white'>length : {length}</label>


          </div>
          <div className='flex item-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='nunberInput'
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className='text-white'>Numbers</label>
          </div>

          <input type="checkbox"
            defaultChecked={charAllowed}
            id='nunberInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className='text-white'>Characters</label>
        </div>
      </div>
    </>
  )
}
export default App
