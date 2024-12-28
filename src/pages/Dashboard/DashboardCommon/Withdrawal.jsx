import React, { useEffect, useState } from 'react';
import bkash from '../../../assets/bkash.png'
import rocket from '../../../assets/rocket.png'
import nagad from '../../../assets/nagad.png'
import useUser from '../../Others/Register/useUser';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const Withdrawal = () => {
    const { userdb } = useUser()
    const userid = userdb?._id
    const [selectedMethod, setSelectedMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [methods, setMethods] = useState([userdb?.withdraw]);
    const [newMethod, setNewMethod] = useState({ number: '', method: '' });
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const withdrawMethods = userdb.withdraw
    const [firstWithdraw, setFirstWithdraw] = useState(true);
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        const fetchData = async () => {
            // Ensure userdb and userdb._id are defined before making the API call
            if (!userdb) {
                return; // Exit early if userdb._id is not available
            }

            try {
                const queryParams = {
                    userId: userid,
                    withdraw: true,
                    type: 'debit'
                }
                const response = await axiosPublic.get(`/transactions/user`, {
                    params: queryParams

                });
                console.log(response);  // Log the response once it has been resolved

                // Check if transactions exist and update the state accordingly
                if (response?.data?.transactions?.length > 0) {
                    setFirstWithdraw(false);
                }
                console.log(firstWithdraw);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        // Call the async function to fetch data only if userdb._id is available
        fetchData();
    }, [axiosPublic, firstWithdraw, userdb, userdb._id, userid]); // Run the effect only when userdb._id changes


    const handleWithdraw = async () => {
        if (!selectedMethod) {
            alert('Please select a withdrawal method.');
            return;
        }
        if (!amount || amount <= 0) {
            alert('Please enter a valid withdrawal amount.');
            return;
        }
        try {
            const response = await axiosPublic.post(`/transactions/create`, {
                status: 'pending',
                amount,
                type: 'debit',
                description: `withdraw.`,
                userId: userid,
                withdraw: true,
                method: selectedMethod.methodName,
                withdrawAccount: selectedMethod.accountNumber,
                date: new Date().toISOString(),
            });
            if (response.status === 201) {
                toast.success('Withdrawal initiated successfully.')
            } else {
                toast.error('Failed to initiate withdrawal.')
            }
        } catch (error) {
            toast.error('Something went wrong!')
        }
        // alert(`Withdrawal of ৳${amount} initiated to ${selectedMethod.method} (${selectedMethod.number}).`);
    };
    const handleAddMethod = async (e) => {
        e.preventDefault();
        if (!newMethod.number || !newMethod.method) {
            alert('Please fill in both fields.');
            return;
        }
        setShowForm(false); // Hide the form after adding a method
        const response = await axiosPublic.post(`/users/${userdb?._id}/withdraw`, {
            accountNumber: newMethod.number,
            methodName: newMethod.method,
        })
        console.log(response);
        if (response.status === 200) {
            toast.success('successfully created new Payment Method.')
        } else {
            toast.error('Failed to create new Payment Method.')
        }
    };
    // handle delete method
    const handleDeleteMethod = async (id) => {
        if (window.confirm('Are you sure you want to delete this method?')) {
            const response = await axiosPublic.delete(`/users/${userid}/withdraw/${id}`)
            console.log(response);
            if (response.status === 200) {
                toast.success('Successfully deleted Payment Method.')
                window.location.reload() // Refresh the page to reflect the updated methods list
            } else {
                toast.error('Failed to delete Payment Method.')
            }
        }
    };


    return (
        <div className="p-6 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Balance Withdrawal</h1>
                <h4 className="text-sm text-primary italic">Withdraw your balance to a selected method.</h4>
            </div>
            <header className="text-left mb-6">
                <h1 className="text-2xl items-center flex gap-2 font-bold text-primary">Welcome Back,
                    <div className="text-secondary"> {userdb.name || 'User'}</div> to withdral page.</h1>
                {/* add current balance */}
                <h2 className="text-lg text-gray-600">Current Balance: {userdb.balance?.toFixed(2)} ৳</h2>

            </header>
            <div className="space-y-6">
                <h1 className="text-xl text-primary capitalize italic font-semibold">select withdraw method :</h1>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-center justify-center">
                    {withdrawMethods?.length && withdrawMethods.map((method) => (
                        <div
                            key={method?._id}
                            className={`p-4 border rounded-lg text-primary shadow-md cursor-pointer ${selectedMethod?._id === method?._id
                                ? 'border bg-white shadow-lg shadow-gray-700 text-secondary'
                                : 'border shadow opacity-40 hover:border-primary'
                                }`}
                            onClick={() => setSelectedMethod(method)}
                        >
                            <div className="flex justify-between items-center relative ">
                                <div className="mehtodText">
                                    <h3 className="text-lg font-bold capitalize">{method?.methodName}</h3>
                                    <p className="text-sm text-gray-400">Number: {method?.accountNumber}</p>
                                </div>
                                <div className="methodLogo">
                                    {
                                        method?.methodName === 'bkash' && <img src={bkash} alt="" className='w-32' />
                                    }
                                    {
                                        method?.methodName === 'nagad' && <img src={nagad} alt="" className='w-32' />
                                    }
                                </div>
                                <div className="absolute btn-sm -bottom-4 -right-4 btn-warning btn" onClick={() => handleDeleteMethod(method._id)}>delete</div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => setShowForm(!showForm)} // Toggle form visibility
                        className="w-full h-12 p-3 bg-secondary text-white rounded-md hover:bg-primary transition"
                    >
                        {showForm ? 'Cancel Adding Method' : 'Add New Withdrawal Method'}
                    </button>
                </div>


                <div className="flex justify-between w-full items-center" >
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Enter Amount (৳)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                const inputAmount = e.target.value;
                                setAmount(inputAmount);

                                // Check for first withdraw condition
                                if (firstWithdraw) {
                                    if (inputAmount < 500) {
                                        setErrorMessage('Withdrawal amount must be at least 500 ৳.');
                                    } else if (inputAmount > userdb.balance) {
                                        setErrorMessage('You have insufficient balance.');
                                    } else {
                                        setErrorMessage(''); // Clear error message
                                    }
                                } else {
                                    // Handle the case where it is not the first withdraw
                                    if (inputAmount < 200) {
                                        setErrorMessage('Withdrawal amount must be at least 100 ৳.');
                                    } else if (inputAmount > userdb.balance) {
                                        setErrorMessage('You have insufficient balance.');
                                    } else {
                                        setErrorMessage(''); // Clear error message
                                    }
                                }
                            }}
                            className="p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter withdrawal amount"
                            disabled={!selectedMethod}
                        />
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                    </div>

                    <div className="selectedMethod">
                        <div className="card-body">
                            <div className="flex justify-between max-w-fit items-center gap-4
                        ">
                                <div className="mehtodText">
                                    <h3 className="text-lg font-bold text-primary capitalize">{selectedMethod.methodName}</h3>
                                    <p className="text-sm text-gray-400">Number: {selectedMethod.accountNumber}</p>
                                </div>
                                <div className="selectedMethodLogo">
                                    {
                                        selectedMethod.method === 'bkash' && <img src={bkash} alt="" className='w-32' />
                                    }
                                    {
                                        selectedMethod.method === 'nagad' && <img src={nagad} alt="" className='w-32' />
                                    }
                                </div>
                            </div>
                            {/* amount */}
                            {
                                amount && <h2 className="text-lg italic text-primary capitalize font-bold">total Amount: {amount} (৳)</h2>
                            }
                        </div>
                    </div>
                    <button
                        onClick={handleWithdraw}
                        className="btn p-3 bg-primary text-white  rounded-md font-bold hover:bg-secondary transition"
                        disabled={!selectedMethod || !amount || amount < 100 || amount > userdb.balance || (firstWithdraw && amount < 500)}
                    >
                        Proceed to Withdraw
                    </button>
                </div>



                {showForm && (
                    <form onSubmit={handleAddMethod} className="space-y-4 mt-4 p-4 bg-gray-800 rounded-md">
                        <h2 className="text-lg font-bold">Add New Withdrawal Method</h2>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Method Name</label>
                            <input
                                type="text"
                                value={newMethod.method}
                                onChange={(e) => setNewMethod({ ...newMethod, method: e.target.value })}
                                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter method name (e.g., bkash)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Number</label>
                            <input
                                type="text"
                                value={newMethod.number}
                                onChange={(e) => setNewMethod({ ...newMethod, number: e.target.value })}
                                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter number"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-primary text-gray-900 rounded-md font-bold hover:bg-opacity-80 transition"
                        >
                            Add Method
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
};

export default Withdrawal;
