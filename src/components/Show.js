import React , {useState  , useEffect} from 'react'
import { ethers } from 'ethers';
import { formatEther } from 'ethers';
import Campaign from './Campaign';
const Show = () => {

    const campaignCreatorAbi = [
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
          "name": "CreateNewCampaign",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
            "inputs": [
                { "internalType": "uint256", "name": "", "type": "uint256" }
            ],
            "name": "deployedCampaign",
            "outputs": [
                { "internalType": "address", "name": "", "type": "address" }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
          "inputs": [],
          "name": "campaignOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "campaignLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    const startCampaignAbi = [
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
        }
      ]
      
    const [campaigns, setCampaigns] = useState([]);
    const campaignCreatorAddress = "0x0D3DD7183a62ACE715Ae8B52138eC47f60b5290B";

    const loadcampaign = async()=>{

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts' , []);
    
            const campaignCreator = new ethers.Contract(
                campaignCreatorAddress , campaignCreatorAbi , provider
            );
            const campaignData = [];
                const x = await campaignCreator.campaignLength();
                console.log(x);
            for(let i=0;i<x;i++){
                const campaignAddresses = await campaignCreator.deployedCampaign(i);
                const campaignContract = new ethers.Contract(campaignAddresses , startCampaignAbi , provider);
                const title = await campaignContract.title();
                const description = await campaignContract.description();
                const goal = await campaignContract.goal();
                const fundRaised = await campaignContract.fundRaised();
                const deadline= await campaignContract.deadline();
                const a = new Date(Number(deadline) * 1000).toLocaleString()
                campaignData.push({
                    title , description ,
                    goal : formatEther(goal) ,
                    fundRaised : formatEther(fundRaised) ,
                    deadline : a,
                    address : campaignAddresses,
                })
            }
            setCampaigns(campaignData)
        } catch (error) {
            console.log('Error occurs'  , error);
        }
    }

    useEffect(()=>{
        loadcampaign();
    } , []);

  return (
    <div>
      <div>
      <h2>All Campaigns</h2>
      <ul style={{display : 'flex' , overflow : 'none'}}>
        {campaigns.map((camp, index) => (
          <li key={index}>
            <Campaign title={camp.title}
             description={camp.description} 
            goal={camp.goal} 
            fundRaised={camp.fundRaised}
             EndTime={camp.deadline}
             address = {camp.address}
             show = {true}
             />
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Show
