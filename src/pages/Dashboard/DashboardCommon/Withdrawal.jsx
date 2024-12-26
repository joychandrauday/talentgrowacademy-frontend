import React, { useState } from 'react';
import bkash from '../../../assets/bkash.png'
import rocket from '../../../assets/rocket.png'
import nagad from '../../../assets/nagad.png'
const Withdrawal = () => {
    const user = {
        name: "Joy Chandra Uday",
        email: "joy@example.com",
        image: "https://via.placeholder.com/150", // Replace with actual profile image URL if needed
        balance: 120.75,
        role: "user",
        activeCourses: 4,
        transactions: 12,
        pendingTasks: 3
    };
    const [selectedMethod, setSelectedMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [methods, setMethods] = useState([
        { id: 'method1', number: '01711111111', method: 'bkash' },
        { id: 'method2', number: '01722222222', method: 'nagad' },
    ]);
    const [newMethod, setNewMethod] = useState({ number: '', method: '' });
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    const handleWithdraw = () => {
        if (!selectedMethod) {
            alert('Please select a withdrawal method.');
            return;
        }
        if (!amount || amount <= 0) {
            alert('Please enter a valid withdrawal amount.');
            return;
        }
        alert(`Withdrawal of ৳${amount} initiated to ${selectedMethod.method} (${selectedMethod.number}).`);
    };

    const handleAddMethod = (e) => {
        e.preventDefault();
        if (!newMethod.number || !newMethod.method) {
            alert('Please fill in both fields.');
            return;
        }

        const addedMethod = {
            id: `method${methods.length + 1}`,
            number: newMethod.number,
            method: newMethod.method,
        };
        setMethods([...methods, addedMethod]);
        setNewMethod({ number: '', method: '' });
        setShowForm(false); // Hide the form after adding a method
        alert('New method added!');
    };

    return (
        <div className="p-6 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Balance Withdrawal</h1>
                <h4 className="text-sm text-primary italic">Withdraw your balance to a selected method.</h4>
            </div>
            <header className="text-left mb-6">
                <h1 className="text-2xl items-center flex gap-2 font-bold text-primary">Welcome Back,
                    <div className="text-secondary"> {user.name || 'User'}</div> to withdral page.</h1>
                {/* add current balance */}
                <h2 className="text-lg text-gray-600">Current Balance: {user.balance.toFixed(2)} ৳</h2>

            </header>
            <div className="space-y-6">
                <h1 className="text-xl text-primary capitalize italic font-semibold">select withdraw method :</h1>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 items-center justify-center">
                    {methods.map((method) => (
                        <div
                            key={method.id}
                            className={`p-4 border rounded-lg text-primary shadow-md cursor-pointer ${selectedMethod.id === method.id
                                ? 'border bg-white shadow-lg shadow-gray-700 text-secondary'
                                : 'border shadow opacity-40 hover:border-primary'
                                }`}
                            onClick={() => setSelectedMethod(method)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="mehtodText">
                                    <h3 className="text-lg font-bold capitalize">{method.method}</h3>
                                    <p className="text-sm text-gray-400">Number: {method.number}</p>
                                </div>
                                <div className="methodLogo">
                                    {
                                        method.method === 'bkash' && <img src={bkash} alt="" className='w-32' />
                                    }
                                    {
                                        method.method === 'nagad' && <img src={nagad} alt="" className='w-32' />
                                    }
                                </div>
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

                                if (inputAmount < 100) {
                                    setErrorMessage('Withdrawal amount must be at least 100 ৳.');
                                } else if (inputAmount > user.balance) {
                                    setErrorMessage('You have insufficient balance.');
                                } else {
                                    setErrorMessage(''); // Clear the error message
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
                                    <h3 className="text-lg font-bold text-primary capitalize">{selectedMethod.method}</h3>
                                    <p className="text-sm text-gray-400">Number: {selectedMethod.number}</p>
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
                        disabled={!selectedMethod || !amount || amount < 100 || amount > user.balance}
                    >
                        Proceed to Withdraw
                    </button>
                    {

                    }
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
        </div>
    );
};

export default Withdrawal;
