"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import routes from "@/data/routes.json";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("No verification token provided");
        return;
      }

      try {
        const response = await fetch(`/api/confirm_email?token=${token}`);
        const data = await response.json();

        if (data.redirectURL) {
          window.location.href = data.redirectURL;
          return;
        }

        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully");
          
          // Clean up local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("signup_email");
            localStorage.removeItem("signup_password");
            localStorage.removeItem("sendAgainAt");
            
            // Remove email from emailsSent throttling
            const emailsSent = JSON.parse(localStorage.getItem("emailsSent") || "{}");
            if (data.verifiedEmail && emailsSent[data.verifiedEmail]) {
              delete emailsSent[data.verifiedEmail];
              localStorage.setItem("emailsSent", JSON.stringify(emailsSent));
            }
          }
        } else {
          setStatus("error");
          setMessage(data.message || "Email verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [token]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Verifying Email...</h1>
          <p className="text-gray-600">Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Email Confirmed!</h1>
            <p className="text-gray-600">{message}</p>
          </div>
          <button
            onClick={() => router.push(routes.profile.path)}
            className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Verification Failed</h1>
          <p className="text-gray-600">{message}</p>
        </div>
        <button
          onClick={() => router.push(routes.login.path)}
          className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
