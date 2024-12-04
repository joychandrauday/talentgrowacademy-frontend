import React, { useState } from 'react';
import { ScrollRestoration } from 'react-router-dom';

// Dummy data
const dummyData = [
    {
        date: '2024-12-03',
        userId: 'USR12345',
        name: 'John Doe',
        phone: '+880123456789',
        whatsapp: '+880987654321',
        reference: 'Referral Code',
        status: 'active',
    },
    {
        date: '2024-11-28',
        userId: 'USR67890',
        name: 'Jane Smith',
        phone: '+8801122334455',
        whatsapp: '+8805566778899',
        reference: 'Promo Link',
        status: 'inactive',
    },
    {
        date: '2024-10-15',
        userId: 'USR54321',
        name: 'Alice Johnson',
        phone: '+8802233445566',
        whatsapp: '+8809988776655',
        reference: 'Special Offer',
        status: 'active',
    },
];

const ReferenceHistory = () => {
    const [searchParams, setSearchParams] = useState({
        id: '',
        dateFrom: '',
        dateTo: '',
        status: 'all',
    });

    const [filteredData, setFilteredData] = useState(dummyData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        let filtered = dummyData;

        if (searchParams.id) {
            filtered = filtered.filter((item) =>
                item.userId.toLowerCase().includes(searchParams.id.toLowerCase())
            );
        }

        if (searchParams.dateFrom) {
            filtered = filtered.filter((item) => item.date >= searchParams.dateFrom);
        }

        if (searchParams.dateTo) {
            filtered = filtered.filter((item) => item.date <= searchParams.dateTo);
        }

        if (searchParams.status !== 'all') {
            filtered = filtered.filter((item) => item.status === searchParams.status);
        }

        setFilteredData(filtered);
    };

    return (
        <div className='p-6'>
            <div className="mb-8">
                <h1 className="text-primary italic text-2xl capitalize font-bold">Reference History</h1>
                <h4 className="text-sm text-primary italic">All references you have got to manage.</h4>
            </div>

            {/* Card Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="card bg-white shadow-md p-4 border text-center">
                    <h2 className="text-primary font-bold text-lg">Total References</h2>
                    <p className="text-secondary font-semibold text-2xl">{dummyData.length}</p>
                </div>
                <div className="card bg-white shadow-md p-4 border text-center">
                    <h2 className="text-primary font-bold text-lg">Active References</h2>
                    <p className="text-secondary font-semibold text-2xl">{dummyData.filter(item => item.status === 'active').length}</p>
                </div>
                <div className="card bg-white shadow-md p-4 border text-center">
                    <h2 className="text-primary font-bold text-lg">Inactive References</h2>
                    <p className="text-secondary font-semibold text-2xl">{dummyData.filter(item => item.status === 'inactive').length}</p>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white shadow-md p-6 mb-8">
                <h3 className="text-primary font-bold text-lg mb-4">Search Filters</h3>
                <div className="grid grid-cols-5 items-center gap-4 mb-4">
                    <input
                        type="text"
                        name="id"
                        value={searchParams.id}
                        onChange={handleInputChange}
                        placeholder="Search by ID"
                        className="input input-bordered w-full"
                    />
                    <select
                        name="status"
                        value={searchParams.status}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <input
                        type="date"
                        name="dateFrom"
                        value={searchParams.dateFrom}
                        onChange={handleInputChange}
                        placeholder="From Date"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="date"
                        name="dateTo"
                        value={searchParams.dateTo}
                        onChange={handleInputChange}
                        placeholder="To Date"
                        className="input input-bordered w-full"
                    />
                    <button
                        onClick={handleSearch}
                        className="btn bg-secondary text-white w-full"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="table-auto table-zebra-zebra w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-4">Date</th>
                            <th className="border border-gray-300 p-4">User ID</th>
                            <th className="border border-gray-300 p-4">Name</th>
                            <th className="border border-gray-300 p-4">Phone</th>
                            <th className="border border-gray-300 p-4">WhatsApp</th>
                            <th className="border border-gray-300 p-4">Reference</th>
                            <th className="border border-gray-300 p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-4">{item.date}</td>
                                    <td className="border border-gray-300 p-4">{item.userId}</td>
                                    <td className="border border-gray-300 p-4">{item.name}</td>
                                    <td className="border border-gray-300 p-4">{item.phone}</td>
                                    <td className="border border-gray-300 p-4">{item.whatsapp}</td>
                                    <td className="border border-gray-300 p-4">{item.reference}</td>
                                    <td className={`border border-gray-300 p-4 ${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border border-gray-300 p-4" colSpan="7">
                                    No references found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReferenceHistory;
