import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ManageTrainer from "./ManageTrainer";
import ManageGL from "./ManageGL";
import ManageSGL from "./ManageSGL";
import ManageSGLManager from "./ManageSGLManager";
import ManageConsultant from "./ManageConsultant";
import ManageConsultantManager from "./ManageConsultantManager";
import ManageController from "./ManageController";
import ManageTeachher from "./ManageTeachher";
import ManageTeacherManager from "./ManageTeacherManager";
import ManageAccountant from "./ManageAccountant";

const ManageAdministration = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the tab from the query parameters
    const params = new URLSearchParams(location.search);
    const initialTab = params.get("tab") || "all-transactions";

    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        { id: "all-adminstrations", name: "All adminstrations" },
        { id: "manage-trainer", name: "Manage Trainer" },
        { id: "manage-gl", name: "Manage GL" },
        { id: "manage-sgl", name: "Manage SGL" },
        { id: "manage-sgl-manager", name: "Manage SGL Manager" },
        { id: "manage-consultant", name: "Manage Consultant" },
        { id: "manage-consultant-manager", name: "Manage Consultant Manager" },
        { id: "manage-controller", name: "Manage Controller" },
        { id: "manage-teachers", name: "Manage Teachers" },
        { id: "manage-teacher-managers", name: "Manage Teacher Managers" },
        { id: "manage-accountants", name: "Manage Accountants" },
    ];

    const handleTabChange = (event) => {
        const tabId = event.target.value;
        setActiveTab(tabId);
        navigate(`?tab=${tabId}`); // Update the URL query parameter
    };

    useEffect(() => {
        setActiveTab(initialTab); // Ensure state syncs with the URL on mount or reload
    }, [initialTab]);

    return (
        <div className="p-5 min-h-screen w-full">
            <h1 className="text-2xl font-bold text-center mb-5">Manage Administration</h1>

            {/* Dropdown for Tabs */}
            <div className="flex justify-center mb-5">
                <select
                    value={activeTab}
                    onChange={handleTabChange}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                    {tabs.map((tab) => (
                        <option key={tab.id} value={tab.id}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tab Content */}
            {activeTab === "all-adminstrations" && (
                <div className="text-center">All Transactions content goes here.</div>
            )}
            {activeTab === "manage-trainer" &&
                <ManageTrainer />
            }
            {activeTab === "manage-gl" && (
                <ManageGL />
            )}
            {activeTab === "manage-sgl" && (
                <ManageSGL />
            )}
            {activeTab === "manage-sgl-manager" && (
                <ManageSGLManager />
            )}
            {activeTab === "manage-consultant" && (
                <ManageConsultant />
            )}
            {activeTab === "manage-consultant-manager" && (
                <ManageConsultantManager />
            )}
            {activeTab === "manage-controller" && (
                <ManageController />
            )}
            {activeTab === "manage-teachers" && (
                <ManageTeachher />
            )}
            {activeTab === "manage-teacher-managers" && (
                <ManageTeacherManager />
            )}
            {activeTab === "manage-accountants" && (
                <ManageAccountant />
            )}
        </div>
    );
};

export default ManageAdministration;
