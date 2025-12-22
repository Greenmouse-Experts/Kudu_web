import { useSearchParams, useNavigate } from "react-router-dom";
import QueryCage from "../../components/query/QueryCage";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AliConnect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  const query = useQuery({
    queryKey: ["ali-oauth-exchange", code],
    queryFn: async () => {
      if (!code) {
        throw new Error("No authorization code found.");
      }
      // Simulate an API call to exchange the code for tokens
      // In a real application, you would send the 'code' to your backend
      // Your backend would then exchange it with the OAuth provider for access tokens
      // For this example, we'll just return a success message after a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: "Authorization successful!" });
        }, 1500);
      });
    },
    enabled: !!code, // Only run the query if a code exists and no error
    retry: false, // Do not retry on failure for OAuth
  });

  useEffect(() => {
    if (query.isSuccess) {
      // Optionally redirect to a dashboard or home page after successful authorization
      // navigate("/dashboard");
    }
  }, [query.isSuccess, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736942330/Sign_Up_1_og6gq5.jpg)`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div data-theme="kudu" className="rounded-box shadow-xl p-4 ">
        <section className="p-8 bg-base-100  flex flex-col items-center space-y-4 ">
          <QueryCage
            query={query}
            customLoadingComponent={
              <>
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <h2 className="text-2xl font-semibold">
                  Connecting your account...
                </h2>
                <p className="text-center">
                  Please wait while we securely connect your service.
                </p>
              </>
            }
            customErrorComponent={(error, refetch) => (
              <>
                <h2 className="text-3xl font-bold text-error">
                  Connection Error
                </h2>
                <p className="text-lg text-center">
                  Failed to process the authorization.
                </p>
                <p className="text-sm text-center text-error-content">
                  {error}
                </p>
                <button className="btn btn-primary mt-4" onClick={handleGoHome}>
                  Go Home
                </button>
              </>
            )}
          >
            {(data) => (
              <div className="space-y-3 flex justify-center flex-col text-center">
                <h2 className="text-3xl font-bold text-success">
                  Account Connected!
                </h2>
                <p className="text-lg text-center">
                  Your account has been successfully linked.
                </p>
                <p className="text-sm text-center text-success-content bg-base-200 ring p-3 rounded-box ring-current/20">
                  {data?.message || "You can now enjoy all features."}
                </p>
                <button
                  className="btn text-white btn-primary mt-4"
                  onClick={handleGoHome}
                >
                  Continue to Application
                </button>
              </div>
            )}
          </QueryCage>
        </section>
      </div>
    </div>
  );
}
