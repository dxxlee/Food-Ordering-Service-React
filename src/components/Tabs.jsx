import { useState } from "react";
import { TabItem } from "./TabItem";
import { motion } from "framer-motion";

export const Tabs = ({ list, activeTab, onTabSwitch }) => {
    const uniqueList = [...new Set(list)];
    let active = activeTab === "" ? list[0] : activeTab;

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto flex justify-center space-x-6 py-3 border-b border-gray-300">
                {uniqueList.map((item, index) => (
                    <TabItem 
                        title={item}
                        key={index}
                        index={index}
                        active={active === item}
                        setActive={onTabSwitch}
                    />
                ))}
            </div>
        </div>
    );
};
