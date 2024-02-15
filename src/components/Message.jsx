import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

function Message({ message, close, icon }) {
    const [displayedModuleName, setDisplayedModuleName] = useState('');

    useEffect(() => {
        const moduleName = message.moduleName;
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedModuleName(moduleName.substring(0, index + 1));
            index++;
            if (index === moduleName.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, [message.moduleName]);

    return (
        <motion.div className="w-full flex justify-center items-center h-full "
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
        >
            <div className="relative w-full p-4 bg-gray-800 border-cyan-600 rounded-[30px] border-t-4 border-b-4">
                <button
                    className="flex absolute top-3 right-3 hover:text-cyan-600 duration-500"
                    onClick={close}
                >
                    <FaTimes />
                </button>
                <div className="flex flex-col justify-center items-center">
                    <span className="p-2 text-cyan-500">
                        {icon}
                    </span>
                    <span className="p-2 font-bold text-md text-center ">
                        {displayedModuleName}
                    </span>
                    {message.link !== "#"?(
                        <div
                            className="cursor-pointer font-medium text-sm text-center mt-4 bg-cyan-600 text-white py-2 px-4 rounded-xl hover:text-cyan-900 duration-300"
                        >
                            <a href={message.link}>Drive link</a>
                        </div>
                    ):(
                       <span className="text-sm font-medium text-center p-2">Stay tuned for upcoming resources coming your way soon!</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default Message;
