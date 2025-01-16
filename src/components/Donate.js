import React , {useState} from 'react'
import {ethers} from "ethers" 
import "./Donate.css"
const Donate = (props) => {
    const abi = [
        {
          "inputs": [
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
            "name": "verify",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
          
      ]
    const [donationAmount, setDonationAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const payEthers = async()=>{
      setIsProcessing(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
await provider.send('eth_requestAccounts', []);

// Get the signer (an account that will sign transactions)
const signer = await provider.getSigner();

// Create the contract instance with the signer
const contract = new ethers.Contract(props.address, abi, signer);

try {
    // Call the verify_setter function
    const verifyTx = await contract.verify_setter();
    await verifyTx.wait();  // Wait for the transaction to be mined

    const tx = await contract.deposit({
        value: ethers.parseEther(donationAmount),
    });
    await tx.wait();
    

        } catch (error) {
            console.log("error"  , error);
           
        }
        finally {
            setIsProcessing(false);
            
        }

    }

  return (
    <div>
      <div className="donate-container">
      <h2>Donate to the Campaign</h2>
      <input
        type="number"
        placeholder="Enter donation amount (ETH)"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        disabled={isProcessing}
      />
      <button onClick={payEthers} disabled={isProcessing || !donationAmount}>
        {isProcessing ? "Processing..." : "Donat"}
      </button>
    </div>
    </div>
  )
}

export default Donate
