import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import Productions from './pages/Productions'
import Expenses from './pages/Expenses'
import { useState,useEffect } from 'react'
import initialProductions from "./data/productions";
function App() {
  const [productions,setProductions]=useState(() => {
    const savedProductions=localStorage.getItem("productions"); //Tarayıcıdaki kayıtlı üretimleri okuyor.
    if(savedProductions){
      return JSON.parse(savedProductions); // Metin biçimindeki veriyi JavaScript dizisine dönüştürüyor.
    }
    return initialProductions // Daha önce kayıt yapılmamışsa başlangıç verilerini kullanıyor.
   
  })
  const [expenses,setExpenses]=useState(()=> {
    const savedExpenses=localStorage.getItem("expenses");
    if(savedExpenses){
      return JSON.parse(savedExpenses)
    }
    return []
  }

  )

  useEffect(()=> {
    localStorage.setItem("productions",JSON.stringify(productions));

  },[productions]);
  useEffect(()=> {
    localStorage.setItem("expenses",JSON.stringify(expenses));

  },[expenses])

  return (
    <BrowserRouter>
      <div className='app-layout'>
        <Sidebar />
        
          <main className='main-content'>
            <Routes>
              <Route path="/" element={<Dashboard  productions={productions} expenses={expenses}/>} /> 
              <Route path="/productions" element={<Productions  productions={productions} setProductions={setProductions}/>} />
              <Route path="/expenses" element={<Expenses  expenses={expenses} setExpenses={setExpenses}/>} />

            </Routes>
          </main>
        

      </div>
    </BrowserRouter>

   

  )
}

export default App
