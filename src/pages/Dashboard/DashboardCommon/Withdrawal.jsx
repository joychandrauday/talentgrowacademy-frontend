import { useEffect, useState } from 'react';
import bkash from '../../../assets/bkash.png'
import nagad from '../../../assets/nagad.png'
import useUser from '../../Others/Register/useUser';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAdmins from '../../../Hooks/roleFetch/useAdmin';
const Withdrawal = () => {
    const { userdb } = useUser()
    const userid = userdb?._id
    const { admin } = useAdmins()
    const [selectedMethod, setSelectedMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newMethod, setNewMethod] = useState({ number: '', method: '' });
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [error, setError] = useState('');

    const handleNumberChange = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) {
            return;
        }
        setNewMethod({ ...newMethod, number: value });
        if (value.length === 11 && value.startsWith("01")) {
            setError('');
        } else {
            setError('Number must be 11 digits and start with 01');
        }
    };
    const withdrawMethods = userdb.withdraw
    const [firstWithdraw, setFirstWithdraw] = useState(true);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const fetchData = async () => {
            if (!userdb) {
                return; // Exit early if userdb._id is not available
            }

            try {
                const queryParams = {
                    userId: userid,
                }
                const response = await axiosPublic.get(`/transactions/user`, {
                    params: queryParams

                });
                const filtered = response?.data?.transactions?.filter((filter) => filter.description === 'withdraw.' && filter.status === 'completed')
                console.log(filtered?.length);
                console.log(filtered);
                // Check if transactions exist and update the state accordingly
                if (filtered?.length > 0) {
                    setFirstWithdraw(false);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        // Call the async function to fetch data only if userdb._id is available
        fetchData();
    }, [axiosPublic, firstWithdraw, userdb, userdb._id, userid]); // Run the effect only when userdb._id changes


    const handleWithdraw = async () => {
        if (!selectedMethod) {
            Swal.fire({
                title: 'No Method Selected',
                text: 'Please select a withdrawal method.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        if (!amount || amount <= 0) {
            Swal.fire({
                title: 'Invalid Amount',
                text: 'Please enter a valid withdrawal amount.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const result = await Swal.fire({
                title: 'Confirm Withdrawal',
                text: firstWithdraw ? `350 tk will be deducted from your first withdrawal. 
                This deduction will occur when you proceed with the withdrawal process. 
                Are you sure you want to withdraw ৳${amount} using ${selectedMethod.methodName}?`
                    : `Are you sure you want to withdraw ৳${amount} using ${selectedMethod.methodName}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Proceed',
                cancelButtonText: 'Cancel',
                preConfirm: () => {
                    return true; // Only proceed if confirmed
                },
            });

            if (!result.isConfirmed) {
                return; // Exit if the user cancels
            }

            // Show SweetAlert loader before submission
            const loadingSwal = Swal.fire({
                title: 'Processing Withdrawal...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); // Show loading spinner
                },
            });
            if (firstWithdraw && !userdb.isAdminstration) {
                // admin allocation on first transaction
                await axiosPublic.post('/transactions/create', {
                    userId: admin._id,
                    foreignUser: userdb.userID, // Use the selected user
                    amount: 350,
                    type: 'credit',
                    status: 'completed',
                    description: 'First withdraw Money allocated to the admin.',
                    showingId: userdb.userID,
                });
                // Proceed with the withdrawal
                await axiosPublic.post(`/transactions/create`, {
                    status: 'pending',
                    amount: Number(amount - 350),
                    type: 'debit',
                    description: `withdraw.`,
                    userId: userid,
                    withdraw: true,
                    firstWithdraw: firstWithdraw,
                    method: selectedMethod.methodName,
                    foreignUser: userdb?.userID,
                    withdrawAccount: selectedMethod.accountNumber,
                    date: new Date().toISOString(),
                    showingId: userdb.userID
                });
                await axiosPublic.post(`/transactions/create`, {
                    status: 'completed',
                    amount: 350,
                    type: 'debit',
                    description: `admin allocation on first withdraw.`,
                    userId: userid,
                    withdraw: true,
                    firstWithdraw: firstWithdraw,
                    method: selectedMethod.methodName,
                    foreignUser: userdb?.userID,
                    withdrawAccount: selectedMethod.accountNumber,
                    date: new Date().toISOString(),
                    showingId: userdb.userID
                });
                // Close the loading Swal after submission
                loadingSwal.close();
                window.location.reload();
                Swal.fire({
                    title: 'Success!',
                    text: 'Withdrawal initiated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to initiate withdrawal.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } else {
                // Proceed with the withdrawal
                const response = await axiosPublic.post(`/transactions/create`, {
                    status: 'pending',
                    amount,
                    type: 'debit',
                    description: `withdraw.`,
                    userId: userid,
                    showingId: userdb.userID,
                    withdraw: true,
                    firstWithdraw: firstWithdraw,
                    method: selectedMethod.methodName,
                    foreignUser: userdb?.userID,
                    withdrawAccount: selectedMethod.accountNumber,
                    date: new Date().toISOString(),
                });
                // Close the loading Swal after submission
                loadingSwal.close();

                if (response.status === 201) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Withdrawal initiated successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });

                    window.location.reload();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to initiate withdrawal.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }


        } catch (error) {
            // Close the loading Swal in case of an error
            Swal.close();

            window.location.reload();
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };


    const handleAddMethod = async (e) => {
        e.preventDefault();
        if (!newMethod.number || !newMethod.method) {
            alert('Please fill in both fields.');
            return;
        }
        setShowForm(false); // Hide the form after adding a method
        const response = await axiosPublic.post(`/users/${userdb?.userID}/withdraw`, {
            accountNumber: newMethod.number,
            methodName: newMethod.method,
        })
        if (response.status === 200) {
            window.location.reload()
            toast.success('successfully created new Payment Method.')
        } else {
            toast.error('Failed to create new Payment Method.')
        }
    };
    // handle delete method
    const handleDeleteMethod = async (id) => {
        if (window.confirm('Are you sure you want to delete this method?')) {
            const response = await axiosPublic.delete(`/users/${userdb.userID}/withdraw/${id}`)
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
                                    if (userdb.isAdminstration) {
                                        if (inputAmount < 100) {
                                            setErrorMessage('Withdrawal amount must be at least 100 ৳.');
                                        } else if (inputAmount > userdb.balance) {
                                            setErrorMessage('You have insufficient balance.');
                                        } else {
                                            setErrorMessage(''); // Clear error message
                                        }
                                    } else if (!userdb.isAdminstration) {
                                        if (inputAmount < 500) {
                                            setErrorMessage('First Withdrawal amount must be at least 500 ৳.');
                                        } else if (inputAmount > userdb.balance) {
                                            setErrorMessage('You have insufficient balance.');
                                        } else {
                                            setErrorMessage(''); // Clear error message
                                        }
                                    }
                                } else {
                                    if (userdb.isAdminstration) {
                                        if (inputAmount < 100) {
                                            setErrorMessage('Withdrawal amount must be at least 100 ৳.');
                                        } else if (inputAmount > userdb.balance) {
                                            setErrorMessage('You have insufficient balance.');
                                        } else {
                                            setErrorMessage(''); // Clear error message
                                        }
                                    } else {
                                        if (inputAmount < 100) {
                                            setErrorMessage('Withdrawal amount must be at least 100 ৳.');
                                        } else if (inputAmount > userdb.balance) {
                                            setErrorMessage('You have insufficient balance.');
                                        } else {
                                            setErrorMessage(''); // Clear error message
                                        }
                                    }
                                }
                            }}
                            placeholder={userdb.balance === 0 ? 'Your Ballance is 0' : 'Enter withdrawal amount'}
                            className={userdb.balance === 0 ? "p-3 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-primary" : "p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"}
                            disabled={!selectedMethod || userdb.balance === 0}
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
                        disabled={
                            userdb.balance <= 0 || !selectedMethod || !amount || (userdb.isAdminstration === 'false' && amount < 200) || amount > userdb.balance || (userdb.isAdminstration === 'false' && firstWithdraw && amount < 500) || (firstWithdraw && userdb.isAdminstration && amount < 100) || errorMessage !== ''}
                    >
                        Proceed to Withdraw
                    </button>
                </div>



                {showForm && (
                    <form onSubmit={handleAddMethod} className="space-y-4 mt-4 p-4 bg-gray-800 rounded-md">
                        <div>
                            <h2 className="text-lg font-bold">Add New Withdrawal Method</h2>
                            <div>
                                {/* Method Selection */}
                                <label className="block text-sm text-gray-400 mb-2">Method Name</label>
                                <select
                                    value={newMethod.method}
                                    onChange={(e) => setNewMethod({ ...newMethod, method: e.target.value })}
                                    className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="" disabled>Select a method</option>
                                    <option value="bkash">Bkash</option>
                                    <option value="nagad">Nagad</option>
                                    <option value="rocket">Rocket</option>
                                    <option value="phonepay">Phone Pay</option>
                                    <option value="googlepay">Google Pay</option>
                                    <option value="paytm">Paytm</option>
                                </select>

                                {/* Number Input */}
                                <label className="block text-sm text-gray-400 mt-4 mb-2">Account Number</label>
                                <input
                                    type="text"
                                    value={newMethod.number}
                                    onChange={handleNumberChange}
                                    maxLength="11"
                                    className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Enter account number"
                                />

                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full p-3 bg-secondary text-gray-900 rounded-md font-bold hover:bg-opacity-80 transition"
                            >
                                Add Method
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div >
    );
};

export default Withdrawal;
