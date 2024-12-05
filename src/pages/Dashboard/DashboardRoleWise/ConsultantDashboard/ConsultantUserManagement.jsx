import UserManagementTable from '../../../../components/Dashboard/UserManagementTable';

const ConsultantUserManagement = () => {
    const users = [
        {
            "name": "John Doe",
            "userID": "334255",
            "email": "john.doe@example.com",
            "password": "$hashed_password",
            "phone": "1234567890",
            "whatsapp": "1234567890",
            "status": "active",
            "role": "user",
            "referrence": "443422",
            "balance": 150,
            "paymentMethods": [],
            "groupLeader": "225633",
            "consultant": "775899",
            "seniorGroupLeader": "665699",
            "trainer": "223344",
            "createdAt": "2024-11-30T12:00:00.000Z"
        },
        {
            "name": "Jane Smith",
            "userID": "112233",
            "email": "jane.smith@example.com",
            "password": "$hashed_password",
            "phone": "9876543210",
            "whatsapp": "9876543210",
            "status": "inactive",
            "role": "consultant",
            "referrence": "998877",
            "balance": 300,
            "paymentMethods": ["PayPal"],
            "groupLeader": "445566",
            "consultant": "123456",
            "seniorGroupLeader": "332211",
            "trainer": "778899",
            "createdAt": "2024-11-28T10:00:00.000Z"
        },
        {
            "name": "Alice Johnson",
            "userID": "445566",
            "email": "alice.johnson@example.com",
            "password": "$hashed_password",
            "phone": "5432167890",
            "whatsapp": "5432167890",
            "status": "active",
            "role": "trainer",
            "referrence": "332233",
            "balance": 500,
            "paymentMethods": ["Credit Card"],
            "groupLeader": "554433",
            "consultant": "334455",
            "seniorGroupLeader": "112244",
            "trainer": "998877",
            "createdAt": "2024-11-25T08:00:00.000Z"
        },
        {
            "name": "Mark Lee",
            "userID": "778899",
            "email": "mark.lee@example.com",
            "password": "$hashed_password",
            "phone": "6574839201",
            "whatsapp": "6574839201",
            "status": "active",
            "role": "group leader",
            "referrence": "998822",
            "balance": 200,
            "paymentMethods": ["Bank Transfer"],
            "groupLeader": "445566",
            "consultant": "889900",
            "seniorGroupLeader": "667788",
            "trainer": "554433",
            "createdAt": "2024-11-20T15:30:00.000Z"
        },
        {
            "name": "Emma Wilson",
            "userID": "556677",
            "email": "emma.wilson@example.com",
            "password": "$hashed_password",
            "phone": "1230984567",
            "whatsapp": "1230984567",
            "status": "active",
            "role": "senior group leader",
            "referrence": "554433",
            "balance": 450,
            "paymentMethods": ["Debit Card"],
            "groupLeader": "998822",
            "consultant": "556677",
            "seniorGroupLeader": "667788",
            "trainer": "889900",
            "createdAt": "2024-11-18T09:45:00.000Z"
        },
        {
            "name": "Luke Brown",
            "userID": "223344",
            "email": "luke.brown@example.com",
            "password": "$hashed_password",
            "phone": "6543217890",
            "whatsapp": "6543217890",
            "status": "inactive",
            "role": "user",
            "referrence": "334455",
            "balance": 100,
            "paymentMethods": [],
            "groupLeader": "225633",
            "consultant": "554433",
            "seniorGroupLeader": "445566",
            "trainer": "223344",
            "createdAt": "2024-11-15T11:00:00.000Z"
        },
        {
            "name": "Sophia Davis",
            "userID": "667788",
            "email": "sophia.davis@example.com",
            "password": "$hashed_password",
            "phone": "4567891230",
            "whatsapp": "4567891230",
            "status": "active",
            "role": "consultant",
            "referrence": "778899",
            "balance": 250,
            "paymentMethods": ["Mobile Banking"],
            "groupLeader": "998822",
            "consultant": "223344",
            "seniorGroupLeader": "112233",
            "trainer": "334455",
            "createdAt": "2024-11-10T14:00:00.000Z"
        },
        {
            "name": "Olivia Clark",
            "userID": "889900",
            "email": "olivia.clark@example.com",
            "password": "$hashed_password",
            "phone": "7890123456",
            "whatsapp": "7890123456",
            "status": "active",
            "role": "trainer",
            "referrence": "443322",
            "balance": 600,
            "paymentMethods": ["Cash"],
            "groupLeader": "778899",
            "consultant": "112233",
            "seniorGroupLeader": "334455",
            "trainer": "998877",
            "createdAt": "2024-11-05T13:20:00.000Z"
        }
    ]

    return (
        <div className='p-6'>
            <UserManagementTable users={users} role={'consultant'} />
        </div>
    );
}

export default ConsultantUserManagement;
