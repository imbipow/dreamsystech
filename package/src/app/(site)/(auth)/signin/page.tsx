import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | DreamSys Technologies",
};

const SigninPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Authentication Not Available</h1>
        <p className="text-gray-600 mb-8">
          This is a static website. Authentication features are not available.
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default SigninPage;
