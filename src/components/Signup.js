import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from '../images/login.png';
import signupImage from '../images/sign-up.png';

const Signup = ({onLogin}) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    });

    const [loginData, setLoginData] = useState({
        name: '',
        password: '',
        category: ''
    });

    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.name === loginData.name && userData.password === loginData.password) {
                // localStorage.setItem('login', true);
                // localStorage.setItem('category',loginData.category);
                onLogin(loginData.category);
                navigate("/test");
            } else {
                setError('No user found ! Sign-up instead');
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            localStorage.setItem('userData', JSON.stringify(formData));
            setIsLogin(true);
            setError('');
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
                <img src={isLogin ? loginImage : signupImage} alt="Illustration" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-5 mt-2">
                <div className="w-full max-w-md bg-white shadow-md p-5 rounded-lg lg:mx-12">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-3xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign up'}</h2>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={isLogin ? loginData.name : formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="mt-1 block w-full rounded-md p-1"
                            />
                        </div>
                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="mt-1 block w-full rounded-md p-1"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your password again"
                                        className="mt-1 block w-full rounded-md p-1"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        {isLogin && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        required
                                        className="mt-1 block w-full rounded-md p-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-gray-700">Category</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={loginData.category}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md p-1 border-2"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option className="p-1" value="sports">Sports</option>
                                        <option className="p-1" value="arts">Arts</option>    
                                        <option value="history">History</option>
                                        <option value="physics">Physics</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button type="submit" className="mt-4 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 w-full">
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                        <p className="mt-4 text-gray-400 text-center">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button type="button" className="text-blue-500" onClick={toggleForm}>
                                {isLogin ? 'Signup' : 'Login'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
