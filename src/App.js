import './App.css';
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import Navbar from './components/Navbar.comp/Navbar';
import Test from './components/Test';
import Show from './components/Show';
import Home from './components/Home';
import Campaign from './components/Campaign';
import Withdrawl from './components/Withdrawl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {

  <ToastContainer/>
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    }
    ,{
    path : "/createCampaign",
    element : <Test/>
    },{
    path : "/showCampaign",
    element : <Show/>
    },{
    path : "/campaign",
    element : <Campaign/>
    }
    ,{
    path : "/withdrawl",
    element : <Withdrawl/>
    }
  ])

  return (
    <div className="App">
      <Navbar/>
      {/* <div>
        <div className="quote">
          Fundraising Platform Powered By Blockchain
          <button className='btn'>CREATE COMPAIGN</button>
        </div>
      </div> */}
      {/* <Test/> */}
      <RouterProvider router = {router}/>
      {/* <Show/> */}
    </div>
  );
}

export default App;
