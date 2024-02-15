import React, { useState, useEffect } from 'react';
import FloatingBar from "./components/FloatingBar.jsx";
import Page from "./components/Page.jsx";
import bg from "./assets/bg.svg";
import { pages } from "./constants/constants.jsx";
import { motion } from "framer-motion";
import book from "../src/assets/book.webp";

function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const fullText = "Your Point of Reference";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.substring(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100); // Adjust the interval as needed
        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="fixed w-full h-full bg-center bg-cover flex flex-col justify-between items-center bg-gray-900"
             style={{backgroundImage: `url(${bg})`}}>
            <span className="text-3xl my-4 font-bold text-cyan-600 px-4 py-3 bg-gray-900 rounded-full bg-opacity-80 cursor-pointer hover:scale-105 duration-500"
                  onClick={()=>setCurrentPage(0)}
            >
                EST
                <span className="text-white">
                    IN Stu
                </span>
                dent
            </span>
            <div className="w-full h-full max-w-xl px-2">
                {currentPage === 0 &&
                    <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 1 } }}
                                exit={{ opacity: 0, transition: { duration: 1 } }}
                                className="w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 p-4 rounded-[50px]"
                    >
                        <img src={book} className="max-w-xs hover:scale-105 duration-500" alt="Book" />
                        <span className="text-[26px] font-bold text-white text-center px-2">
                            {displayText.split("").map((char, index) => (
                                <span key={index} className={index >= 5 && index <= 9 ? "text-cyan-500" : ""}>{char}</span>
                            ))}
                        </span>
                    </motion.div>
                }
                {pages.map((pageContent, index) => (
                    currentPage === index + 1 && <Page key={index} content={pageContent} />
                ))}
            </div>
            <FloatingBar currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
}

export default App;
