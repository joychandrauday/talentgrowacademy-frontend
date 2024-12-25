import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ManageCards from '../../../../components/Dashboard/AdminComponent/ManageCards';

const AdminUtilities = () => {
    return (
        <div className="admin-utilities-container">
            <h1>Admin Utilities</h1>
            <Tabs>
                {/* Tab List: This is where you define your tabs */}
                <TabList>
                    <Tab>Manage Notices</Tab>
                    <Tab>Manage Cards</Tab>
                    <Tab>Manage Design</Tab>
                </TabList>

                {/* Tab Panels: This is where the content for each tab goes */}
                <TabPanel>
                    <h2>Manage Notices</h2>
                    <p>Here, you can create, update, and delete notices.</p>
                    {/* Add form or components to manage notices */}
                </TabPanel>
                <TabPanel>
                    <ManageCards />
                </TabPanel>
                <TabPanel>
                    <h2>Manage Design</h2>
                    <p>Here, you can customize the design of the website.</p>
                    {/* Add form or components to manage design */}
                </TabPanel>
            </Tabs>
            <ScrollRestoration />
        </div>
    );
};

export default AdminUtilities;
