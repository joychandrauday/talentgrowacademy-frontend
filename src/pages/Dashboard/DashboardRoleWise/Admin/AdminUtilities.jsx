import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ManageCards from "../../../../components/Dashboard/AdminComponent/ManageCards";
import ManageAdminBanner from "../../../../components/Dashboard/AdminComponent/ManageAdminBanner";

const AdminUtilities = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the active tab from the query parameter
    const params = new URLSearchParams(location.search);
    const initialTab = params.get("tab") || "manage-notices";

    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        {
            id: "manage-notices", title: "Manage Notices", content: (
                <div>
                    <h2>Manage Notices</h2>
                    <p>Here, you can create, update, and delete notices.</p>
                    {/* Add form or components to manage notices */}
                </div>
            )
        },
        { id: "manage-cards", title: "Manage Cards", content: <ManageCards /> },
        {
            id: "manage-design", title: "Manage Design", content: (
                <ManageAdminBanner />
            )
        },
    ];

    // Update the active tab state and query parameter
    const handleTabChange = (index) => {
        const selectedTab = tabs[index].id;
        setActiveTab(selectedTab);
        navigate(`?tab=${selectedTab}`);
    };

    // Sync the active tab state with the URL query parameter
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    return (
        <div className="admin-utilities-container p-5">
            <h1 className="text-2xl font-bold text-center mb-5">Admin Utilities</h1>
            <Tabs
                selectedIndex={tabs.findIndex((tab) => tab.id === activeTab)}
                onSelect={handleTabChange}
            >
                {/* Tab List */}
                <TabList className="tab-list">
                    {tabs.map((tab) => (
                        <Tab key={tab.id} className="tab bg-secondary text-white mr-2 shadow">
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>

                {/* Tab Panels */}
                {tabs.map((tab) => (
                    <TabPanel key={tab.id} className="tab-panel">
                        {tab.content}
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default AdminUtilities;
