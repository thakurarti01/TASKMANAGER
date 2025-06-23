import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({selectedUsers, setSelectedUsers}) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); //false according to chatgpt, earlier it was true
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        console.log("🔍 getAllUsers triggered...");

        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            console.log("💡 All Users Response:", response.data); // ADD THIS
            if (response.data?.length>0){
                setAllUsers(response.data);
            }
        } catch (error) {
            console.error("❌ Error in getAllUsers:", error.response?.data || error.message);
            // console.error("Error fetching users:", error);
            //commented the above line because of chatgpt
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUsersAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if(selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }

        return () => {};
    }, [selectedUsers]);


    return <div className="space-y-4 mt-2">
        {selectedUsersAvatars.length === 0 && (
            <button className="card-btn" onClick={() => setIsModalOpen(true)}>
                <LuUsers className="text-sm" /> Add Members
            </button>
        )}

        {selectedUsersAvatars.length>0 && (
            <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <AvatarGroup avatars={selectedUsersAvatars} maxVisible={3} />
            </div>
        )}

        <Modal
        isOpen = {isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
        >
            {/* <div className="space-y-4 h-[600vh] overflow-y-auto"> */}
            {/* as per chatgpt */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {allUsers.map((user) => (
                    <div
                    key={user._id}
                    className="flex items-center gap-4 p-3 border-b border-gray-200"
                    >
                        <img
                        src={user.profileImageUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-white">
                                {user.name}
                            </p>
                            <p className="text-[13px]">{user.email}</p>
                        </div>

                        <input
                        type="checkbox"
                        checked={tempSelectedUsers.includes(user._id)}
                        onChange={()=> toggleUserSelection(user._id)}
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button className="card-btn" onClick={() => setIsModalOpen(false)}>
                    CANCEL
                </button>
                <button className="card-btn-fill" onClick={handleAssign}>
                    DONE
                </button>
            </div>
        </Modal>
    </div>
}

export default SelectUsers;