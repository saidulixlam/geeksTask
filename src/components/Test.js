import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { LuBellDot } from "react-icons/lu";
import { MdExpandCircleDown } from "react-icons/md";
import WarningModal from './WarningModal';
import { useNavigate } from 'react-router-dom';

const Test = ({ handleLogout }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(300);
    const [isMuted, setIsMuted] = useState(false);
    const [note, setNote] = useState('');
    const [testSubmitted, setTestSubmitted] = useState(localStorage.getItem('test') === 'true');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [skippedAnswers, setSkippedAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const navigate = useNavigate();
    const category = localStorage.getItem('category') || 'default';

    useEffect(() => {
        fetch('/assests/sampleData.json')
            .then(response => response.json())
            .then(data => {
                const filteredQuestions = data.filter(question => question.category === category);
                setQuestions(filteredQuestions.slice(0, 10));
            });
    }, [category]);

    useEffect(() => {
        if (!testSubmitted && timeLeft > 0) {
            const timerId = setInterval(() => setTimeLeft(prevTimeLeft => prevTimeLeft - 1), 1000);
            return () => clearInterval(timerId);
        }
    }, [testSubmitted, timeLeft]);

    const calculateResults = () => {
        let correct = 0;
        let skipped = 0;
        let wrong = 0;

        questions.forEach((question, index) => {
            if (userAnswers[index] === undefined) {
                skipped++;
            } else if (userAnswers[index] === question.correct_option) {
                correct++;
            } else {
                wrong++;
            }
        });

        setCorrectAnswers(correct);
        setSkippedAnswers(skipped);
        setWrongAnswers(wrong);
    };

    const handleOptionChange = (questionIndex, optionId) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: optionId
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSkipQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handleSubmit = () => {

        calculateResults();

        setTestSubmitted(true);
        localStorage.setItem('test', 'true');
        setShowModal(false);
    };



    useEffect(() => {
        if (testSubmitted) {
            navigate('/results', {
                state: {
                    correct: correctAnswers,
                    skipped: skippedAnswers,
                    wrong: wrongAnswers,
                    totalQuestions: questions.length,
                    note,
                    timeLeft,
                },
            });
        }
    }, [testSubmitted]);



    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const handleExit = () => {
        setModalMessage('Do you want to exit?');
        setConfirmAction(() => () => {
            setShowModal(false);
            handleLogout();
        });
        setShowModal(true);
    };

    return (
        <div className="test-page flex flex-col min-h-screen">

            <nav className="bg-gray-100 text-dark p-4 md:p-6 flex justify-between items-center shadow-sm w-full">
                <div className="logo">
                    <img src={logo} alt="Logo" className="h-8 md:h-10" />
                </div>
                <div className="exam-name text-center md:text-left">
                    <span className="text-lg md:text-2xl font-bold">SUBJECT: {category.toUpperCase()}</span>
                </div>
                <div className="controls flex space-x-2">
                    <button onClick={toggleMute} className="px-2 md:px-3 py-1 md:py-2 bg-gray-400 text-white rounded-lg">
                        <LuBellDot className="inline-block text-emerald-950" />
                    </button>
                    <button onClick={toggleMute} className="px-2 md:px-3 py-1 md:py-2 bg-gray-400 text-white rounded-lg">
                        <MdExpandCircleDown className="inline-block text-emerald-950" />
                    </button>
                </div>
            </nav>

            <div className='h-full'>
                <div className="timer text-3xl text-center mt-3">
                    {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
                </div>
                <div className="flex flex-col md:flex-row justify-between p-4">
                    <div className="flex-1 p-4">
                        <div>
                            <p className="text-lg mt-2 text-gray-500">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </p>
                        </div>
                        <div className="question-container my-4">
                            <h2 className="text-lg py-4">{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].options.map(option => (
                                <div key={option.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`question${currentQuestionIndex}-option${option.id}`}
                                        name={`question${currentQuestionIndex}`}
                                        value={option.id}
                                        checked={userAnswers[currentQuestionIndex] === option.id}
                                        onChange={() => handleOptionChange(currentQuestionIndex, option.id)}
                                        className="appearance-none my-2 mr-4 h-4 w-4 border border-gray-700 rounded-md checked:bg-blue-600 checked:border-transparent"
                                    />
                                    <label htmlFor={`question${currentQuestionIndex}-option${option.id}`}>{option.value}</label>
                                </div>
                            ))}
                        </div>
                        <div className="navigation-buttons flex gap-2 mt-4">
                            {currentQuestionIndex === 0 && (
                                <button onClick={handleExit} className="px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-600">
                                    Exit
                                </button>
                            )}
                            {currentQuestionIndex > 0 && (
                                <button onClick={handlePrevQuestion} className="px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-600">
                                    Previous
                                </button>
                            )}
                            {currentQuestionIndex < questions.length - 1 && (
                                <button onClick={handleNextQuestion} className="px-4 py-2 rounded-md bg-blue-600 text-white">
                                    Next
                                </button>
                            )}
                            {currentQuestionIndex === questions.length - 1 && (
                                <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-blue-600 text-white">
                                    Submit
                                </button>
                            )}
                            {currentQuestionIndex !== questions.length - 1 && <button onClick={handleSkipQuestion} className="px-4 py-2 rounded-md bg-white text-blue-600 border border-blue-600">
                                Skip
                            </button>}
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 rounded-md shadow-lg mt-4">
                        <h3 className="text-xl font-bold mb-2 p-2">Note Pad</h3>
                        <hr className="my-2 border-t-2 border-gray-300 mx-2" />
                        <textarea
                            className="w-full h-full mt-4 rounded-md p-3"
                            placeholder="Enter your notes here..."
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="relative">
                <WarningModal
                    showModal={showModal}
                    message={modalMessage}
                    onConfirm={confirmAction}
                    onCancel={() => setShowModal(false)}
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                />
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

export default Test;
