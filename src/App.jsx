
import './App.css'

function App() {


  console.log(import.meta.env.VITE_APP_NAME);
  console.log(import.meta.env.VITE_APPWRITE_URL);
  console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  return (
    <>
       <h1>Blog-App Using AppWrite</h1>
    </>
  )
}

export default App
