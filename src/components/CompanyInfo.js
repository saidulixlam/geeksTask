const CompanyInfo = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md mx-auto p-8 bg-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6ZkTvlal8HKh1jTSXEaZ0bT405bhAqzDcXiingboCbCS2wk0" alt="Company Logo" className="w-24 h-24 rounded-full" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Company: Geeksynergy Technologies Pvt Ltd</h2>
                    <p className="text-gray-700 mb-2">Address: Sanjayanagar, Bengaluru-56</p>
                    <p className="text-gray-700 mb-2">Phone: XXXXXXXXX09</p>
                    <p className="text-gray-700 mb-2">Email: XXXXXX@gmail.com</p>
                </div>
            </div>
        </div>

    );
};

export default CompanyInfo;
