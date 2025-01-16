import React, { useState } from 'react';
import { ethers } from 'ethers';
import "./Test.css"
const Test = () => {
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // Replace with your contract address and ABI
  // const contractAddress = "0x460298425b0b9d3A214eed5e0c207DB8803d051A";
  const contractAddress = "0x0D3DD7183a62ACE715Ae8B52138eC47f60b5290B";
  const abi = [
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
      "name": "CreateNewCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }    
  ];

  const createCampaign = async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask and try again.");
        return;
      }

      // Request account access if not connected
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up a provider using MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer
      const signer = await provider.getSigner();

      // Instantiate contract with signer
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Prepare inputs
      const endTimeUnix = Math.floor(new Date(time).getTime() / 1000);
      const parsedAmount = ethers.parseUnits(amount, "ether");

      // Call the contract function
      const tx = await contract.CreateNewCampaign(signer.address ,title, description, parsedAmount, endTimeUnix);
      await tx.wait();

      console.log("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className='test'>
      <h2>Create New Campaign</h2>
      <div className='inputElements'>

      <label>
        Title:
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Amount (in ETH):
        <input type="text" onChange={(e) => setAmount(e.target.value)} />
      </label>
      <label>
        End Date and Time:
        <input
          type="datetime-local"
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <button className='button' onClick={createCampaign}>Create Campaign</button>
      </div>
    </div>
  );
};

export default Test;
