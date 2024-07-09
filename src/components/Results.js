import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { useLocation } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LuBellDot } from "react-icons/lu";
import { MdExpandCircleDown } from "react-icons/md";

const Results = ({ handleLogout }) => {
    const location = useLocation();

    const { correct, skipped, wrong, totalQuestions, timeLeft, note } = location.state || {};

    const correctPercentage = (correct / totalQuestions) * 100;
    const skippedPercentage = (skipped / totalQuestions) * 100;
    const wrongPercentage = (wrong / totalQuestions) * 100;
    const score = (correct / totalQuestions) * 100  ;
    const timeTaken = 300 - timeLeft;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    // const correct = isNaN(scoreData.correct) ? 0 : scoreData.correct;
    // const totalQuestions = isNaN(scoreData.totalQuestions) ? 0 : scoreData.totalQuestions;
    const scoreDataFromStorage = JSON.parse(localStorage.getItem('scoreData')) || {};
    console.log(scoreDataFromStorage);

    const [scoreData, setScoreData] = useState({
         score: (scoreDataFromStorage.score==null) ? score:scoreDataFromStorage.score,
        // score: scoreDataFromStorage.score !== null ? scoreDataFromStorage.score : score,
        timeTaken: scoreDataFromStorage.timeTaken || timeTaken,
        correct: scoreDataFromStorage.correct || correct,
        skipped: scoreDataFromStorage.skipped || skipped,
        wrong: scoreDataFromStorage.wrong || wrong,
        totalQuestions: scoreDataFromStorage.totalQuestions || totalQuestions,
        note: scoreDataFromStorage.note || note,
        minutes: scoreDataFromStorage.minutes || minutes,
        seconds: scoreDataFromStorage.seconds || seconds,
    });
    console.log(scoreData);
    


    useEffect(() => {
        localStorage.setItem('scoreData', JSON.stringify(scoreData));
    }, [scoreData]);

    const handleExit = () => {
        handleLogout();
    };

    return (
        <div className="test-page flex flex-col min-h-screen">

            <nav className="bg-gray-100 text-dark p-4 md:p-6 flex justify-between items-center shadow-sm w-full">
                <div className="logo">
                    <img src={logo} alt="Logo" className="h-8 md:h-10" />
                </div>
                <div className="exam-name text-center md:text-left">
                    <span className="text-lg md:text-2xl font-bold">SUBJECT: {localStorage.getItem('category').toUpperCase()}</span>
                </div>
                <div className="controls flex space-x-2">
                    <button className="px-2 md:px-3 py-1 md:py-2 bg-gray-400 text-white rounded-lg">
                        <LuBellDot className="inline-block text-emerald-950" />
                    </button>
                    <button className="px-2 md:px-3 py-1 md:py-2 bg-gray-400 text-white rounded-lg">
                        <MdExpandCircleDown className="inline-block text-emerald-950" />
                    </button>
                </div>
            </nav>
            <div className="results-container flex flex-col items-center p-8">
                <div className="flex flex-col items-center md:flex-row w-full mb-6 gap-6">
                    <div className="flex-1 p-4">
                        <p className="text-md">Final Score: <span className='text-xl text-bold'>{scoreData.correct}/{scoreData.totalQuestions}</span></p>
                        <p className="text-md">Time Taken:<span className='text-xl text-bold'> {scoreData.minutes}:{scoreData.seconds.toString().padStart(2, '0')}</span></p>
                        <p className="text-md">Score Percentage:<span className='text-5xl text-bold text-green-600'> {scoreData.score.toFixed(2)}%</span></p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                        <div className="w-20 h-20 mb-4 md:mr-4">
                            <CircularProgressbar
                                value={scoreData.score}
                                text={`${scoreData.score.toFixed(2)}%`}
                                styles={buildStyles({
                                    textColor: '#4caf50',
                                    pathColor: '#4caf50',
                                })}
                            />
                            <p className="text-center mt-2">Final Score</p>
                        </div>
                        <div className="w-20 h-20 mb-4 md:mr-4">
                            <CircularProgressbar
                                value={correctPercentage}
                                text={`${scoreData.correct}`}
                                styles={buildStyles({
                                    textColor: '#4caf50',
                                    pathColor: '#4caf50',
                                })}
                            />
                            <p className="text-center mt-2">Correct</p>
                        </div>
                        <div className="w-20 h-20 mb-4 md:mr-4">
                            <CircularProgressbar
                                value={wrongPercentage}
                                text={`${scoreData.wrong}`}
                                styles={buildStyles({
                                    textColor: '#f44336',
                                    pathColor: '#f44336',
                                })}
                            />
                            <p className="text-center mt-2">Wrong</p>
                        </div>
                        <div className="w-20 h-20 mb-4 md:mr-4">
                            <CircularProgressbar
                                value={skippedPercentage}
                                text={`${scoreData.skipped}`}
                                styles={buildStyles({
                                    textColor: '#ff9800',
                                    pathColor: '#ff9800',
                                })}
                            />
                            <p className="text-center mt-2">Skipped</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap border rounded-lg p-4 mt-12 w-full">
                    <h2 className='text-left text-xl text-bold'>
                        Your scribble notes :
                    </h2>
                    <p className="text-md left w-full my-2">Notes: {scoreData.note}</p>
                </div>
                <button onClick={handleExit} className="px-12 py-2 mt-10 rounded-md bg-white border-2 border-blue-400 text-blue-400">
                    Exit
                </button>
            </div>
            <footer className="bg-gray-200 text-dark p-4 mt-auto">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="logo my-2">
                        <img src={logo} alt="Logo" className="h-8 md:h-10" />
                    </div>
                    <div className="social-links flex gap-4 my-2">
                        <FaFacebook className="text-2xl text-gray-600" />
                        <FaTwitter className="text-2xl text-gray-600" />
                        <FaInstagram className="text-2xl text-gray-600" />
                        <FaYoutube className="text-2xl text-gray-600" />
                    </div>
                    <div className="text-xs my-2">
                        <p>&copy; 2024 Online Test Application. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Results;
