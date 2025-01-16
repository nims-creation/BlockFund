import React , {useState} from 'react'
import { ethers } from 'ethers';
import "./Card.css"
import Donate from './Donate';
const Campaign = (props) => {

  const startCampaignAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "Address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "Title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end_time",
          "type": "uint256"
        }
      ],
      "name": "create_project",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verify_setter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deadline_expire",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "title",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "description",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "goal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fundRaised",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "deadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "creator",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "creator",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
  
  ]

  const [show , setshow] = useState(false);
  const showdonate = ()=>{
    setshow(true);
    console.log("hello")
  }
  const withdrawFunds = async () => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            return;
        }
        // console.log(props.address);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        
        // Get the signer to allow sending transactions
        const signer = await provider.getSigner();
        console.log(signer.address)
        // Replace campaignAddress with the specific campaign contract address
        const campaignContract = new ethers.Contract(props.address, startCampaignAbi, signer);
        // Call the withdraw function
        // const creator = await campaignContract.creator();
        // console.log(creator);
        const tx = await campaignContract.withdraw();
        await tx.wait();

        alert("Funds withdrawn successfully!");
    } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("There was an error with the withdrawal process.");
    }
};


  return (
    <div>
        <div className='body'>
        <div className="card my-3">
          {/* <span className='position-absolute top-0 translate-middle badge rounded-pill bg-success' style={{zIndex : 100 ,left : '85%',marginTop : '14px'}}>{"source"}</span> */}
          <img src={"https://d13kjxnqnhcmn2.cloudfront.net/AcuCustom/Sitename/DAM/045/fundraising_campaigns_2020_main.jpg"} className="card-img-top" alt="..." />
          <div className="card-body mx-auto">
            <h5 className="card-title" style={{ overflowY: 'hidden'}}>{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text">Goal (ETH) : {props.goal}</p>
            <p className="card-text">FundRaised (ETH) : {props.fundRaised}</p>
            <p className="card-text">End Time : {props.EndTime}</p>
            {props.show && <button className='button' onClick={showdonate}>Donate</button>}
            {!props.show && <button className='button' onClick={withdrawFunds}>Withdawarl</button>}
            {show && <Donate address={props.address}/>} 
          </div>    
        </div>
      </div>
    </div>
  )
}

export default Campaign
