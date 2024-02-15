import React from 'react';
import {
    TbSquareRoundedNumber1Filled,
    TbSquareRoundedNumber2Filled,
    TbSquareRoundedNumber3Filled,
    TbSquareRoundedNumber4Filled,
    TbSquareRoundedNumber5Filled
} from "react-icons/tb";

const FloatingBar = ({ currentPage, handlePageChange }) => {
    const buttons = [
        { icon: <TbSquareRoundedNumber1Filled size={30} />, pageNumber: 1, tooltip: "1CP" },
        { icon: <TbSquareRoundedNumber2Filled size={30} />, pageNumber: 2, tooltip: "2CP" },
        { icon: <TbSquareRoundedNumber3Filled size={30} />, pageNumber: 3, tooltip: "1CS" },
        { icon: <TbSquareRoundedNumber4Filled size={30} />, pageNumber: 4, tooltip: "2CS" },
        { icon: <TbSquareRoundedNumber5Filled size={30} />, pageNumber: 5, tooltip: "3CS" }
    ];

    return (
        <div className="p-2 w-full flex flex-col justify-center items-center">
            <div className="flex flex-row bg-gray-900 rounded-full bg-opacity-80 p-1">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className={`p-2 m-1 rounded-full relative group ${currentPage === button.pageNumber ? 'bg-cyan-700 text-white hover:scale-110 duration-500' : 'text-white bg-gray-700 hover:bg-cyan-700 hover:scale-110 duration-500'}`}
                    onClick={() => handlePageChange(button.pageNumber)}
                >
                    <div className="tooltip absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 font-bold text-[10px] text-cyan-500 py-1 px-3 rounded-3xl border-cyan-600 border-b-2 border-t-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {button.tooltip}
                    </div>
                    {button.icon}
                </button>
            ))}
            </div>
            <span className="text-white font-medium text-sm p-2 bg-gray-900 rounded-b-xl bg-opacity-80">
                Copyright © Abdelmalek Djemaa
            </span>
        </div>
    );
};

export default FloatingBar;
