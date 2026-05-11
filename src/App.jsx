import { useState,useCallback ,useEffect,useRef} from 'react'
import heroImg from './assets/hero.png'

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] =useState(false)
  const [charAllowed, setcharAllowed] =useState(false)
  const [password, setpassword] =useState("")

  // useRef hook
   const passwordRef = useRef(null)// we have no default val now so null, useref is used to Acess DOM so that hm password select ya usko range select kr payenge

  const passwordGenerator = useCallback(() => {//usecallback b/c if normal fn hota to Har render pe new function create hota:
    let pass = ""// or ye Function same rakhta hai jab tak dependency change na ho,Performance better,unnecessary re-renders kam,child components optimization
    let str ="QWERTYUIOPASDFGHJKLXZCVBNMqwertyuiopasdfghjklzxcvnm"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+=-[]{};:"


    for(let i=1; i<=length ;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)

    }, [length,numberAllowed,charAllowed,setpassword])// here we only give those things on which dependency hai
                              // here we talk @ optimisation so we can skip setpassword
                              // & if password is given then continusly vales get changes
    const copyPasswordToClipboard =useCallback(() => {
      passwordRef.current?.select()// due to this on coping the text gets highlighted
      passwordRef.current?.setSelectionRange(0,3)// for selectiong ony b/w range 0 to 3
      window.navigator.clipboard.writeText(password)
    },
    [password])// b/c dependency is only on password

// when page load first time useEffect called and if any value among length,...changes then also it is called 
//useEffect takes a callback fn and depenedency array....useEffect( ()=>{} , [] )
    useEffect(() => {
      passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])// here we talk @ ki agr inme se kisi me v koi change hota h to dubara se run kro
    
  return (
    
      <div className ='w-full max-w-md mx-auto shadow-md rounded-lg text px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className ='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" 
          placeholder='password' 
          readOnly 
          ref = {passwordRef}
          />
          <button  onClick ={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>    
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}} 
            />
            <label>Length: {length}</label>   
          </div>
          
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" 
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className = 'flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id="characterInput"
            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="characterInput">characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App

















