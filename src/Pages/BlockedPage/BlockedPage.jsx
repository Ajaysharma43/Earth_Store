import { Link, useNavigate } from "react-router-dom";

const BlockedUserPage = () => {
    const navigate = useNavigate();

    

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-md">
                <div className="mb-6">
                    <img
                        src="https://img.icons8.com/ios-filled/150/denied.png" // Replace with a relevant icon or image
                        alt="Blocked Icon"
                        className="mx-auto w-24 h-24"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-blue-600 mb-4">
                    Account Blocked
                </h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your account has been blocked. If this is an error, you can reach out to our support team to resolve the issue.
                </p>
                <Link to={'/login'}>
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                >
                    Go to Login
                </button>
                </Link>
            </div>
        </div>
    );
};

export default BlockedUserPage;
