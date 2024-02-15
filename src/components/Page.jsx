import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PiStudentBold } from 'react-icons/pi';
import Message from './Message.jsx';
import { GiBookCover } from 'react-icons/gi';

function Page({ content }) {
    const [selectedSemester, setSelectedSemester] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(false);
    const touchStartX = useRef(null);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current) return;

        const touchMoveX = e.touches[0].clientX;
        const difference = touchStartX.current - touchMoveX;
        const threshold = window.innerWidth / 4;

        if (difference > threshold && selectedSemester < content.semester.length - 1) {
            setSelectedSemester((prevSemester) => prevSemester + 1);
            touchStartX.current = null;
        } else if (difference < -threshold && selectedSemester > 0) {
            setSelectedSemester((prevSemester) => prevSemester - 1);
            touchStartX.current = null;
        }
    };

    const handleTouchEnd = () => {
        touchStartX.current = null;
    };

    const handleShowMessage = (module) => {
        setShowMessage(true);
        setMessage(module);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="rounded-[50px] h-full border-cyan-600 border-b-4 border-t-4 p-2 flex flex-col justify-between items-center bg-gray-900 bg-opacity-90 shadow-white text-white"
        >
            <span className="text-3xl text-cyan-500 font-bold pb-2">{content.name}</span>
            <div className="flex justify-center items-center w-full h-full"
                 onTouchStart={handleTouchStart}
                 onTouchMove={handleTouchMove}
                 onTouchEnd={handleTouchEnd}>
                <motion.div
                    initial={{ opacity: 0, x: selectedSemester === 0 ? -100 : 100 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, x: selectedSemester === 0 ? -100 : 100, transition: { duration: 0.5 } }}
                    key={selectedSemester}
                    className="w-full h-full relative"
                >
                    <center className="sm:text-2xl text-xl text-cyan-500 font-bold">{content.semester[selectedSemester].semesterNumber} <span className="text-white">Semester</span></center>
                    <div className="absolute top-10 mt-2 w-full h-full px-2 overflow-auto sm:rounded-xl rounded-[50px]">
                        {content.semester[selectedSemester].modules.map((module, idx) => (
                            <li key={idx} className="font-medium mb-3 hover:text-cyan-500 cursor-pointer text-sm w-full bg-gray-900 border-cyan-600 hover:border-white duration-500 border-b-2 max-h-16 rounded-2xl flex flex-row justify-start items-center gap-2 p-2"
                                onClick={() => handleShowMessage(module)}
                            >
                                <span className="text-cyan-600">
                                    <PiStudentBold size={28} />
                                </span>
                                {module.moduleName}
                            </li>
                        ))}
                    </div>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.5 } }}
                className="flex mt-16 mb-2 z-[998] text-sm text-cyan-500">
                <button onClick={() => setSelectedSemester(0)} className={`mx-1 ${selectedSemester === 0 ? 'bg-cyan-600 hover:scale-110 duration-500' : 'bg-gray-600 hover:scale-110 duration-500'} rounded-full px-4 py-2`}> </button>
                <button onClick={() => setSelectedSemester(1)} className={`mx-1 ${selectedSemester === 1 ? 'bg-cyan-600 hover:scale-110 duration-500' : 'bg-gray-600 hover:scale-110 duration-500'} rounded-full px-4 py-2`}> </button>
                {content.name === "2CS" &&
                    <button onClick={() => setSelectedSemester(2)} className={`mx-1 ${selectedSemester === 2 ? 'bg-cyan-600 hover:scale-110 duration-500' : 'bg-gray-600 hover:scale-110 duration-500'} rounded-full px-4 py-2`}> </button>
                }
            </motion.div>
            {showMessage &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed z-[999]  top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                >
                    <div className="max-w-md w-full p-2">
                        <Message message={message} icon={<GiBookCover size={45} />} close={() => setShowMessage(false)} />
                    </div>
                </motion.div>
            }
        </motion.div>
    );
}

export default Page;
