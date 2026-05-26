import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";

import axios from "axios";

import Navbar from "./components/Navbar";

import {
  ShieldCheck,
  DollarSign,
  Wallet,
  AlertTriangle,
} from "lucide-react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    income: "",
    age: "",
    loan: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    // VALIDATION

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.aadhaar ||
      !formData.income ||
      !formData.age ||
      !formData.loan
    ) {

      toast.error("Please fill all fields");
      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          ...formData,
          income: Number(formData.income),
          age: Number(formData.age),
          loan: Number(formData.loan),
        }
      );

      setResult(response.data);

      toast.success("Prediction Generated Successfully");

      setHistory((prev) => [
        ...prev,
        {
          income: formData.income,
          loan: formData.loan,
          score: response.data.credit_score,
        },
      ]);

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("Server Error");

      setLoading(false);

    }
  };

  return (

    <>

      <Navbar />

      <Toaster />

      <div className="min-h-screen bg-[#0B1120] text-white px-6 py-10">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* LEFT SECTION */}

          <div>

            {/* HERO */}

            <div className="mb-10">

              <h1 className="text-5xl font-bold leading-tight">

                Credit Risk

                <span className="text-cyan-400">
                  {" "}Prediction System
                </span>

              </h1>

              <p className="text-gray-400 mt-5 text-lg leading-8">

                AI-powered fintech platform that predicts loan
                default risk using machine learning and financial analytics.

              </p>

            </div>

            {/* FEATURES */}

            <div className="grid md:grid-cols-2 gap-5 mb-10">

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <ShieldCheck
                  className="text-cyan-400 mb-4"
                  size={35}
                />

                <h3 className="text-xl font-semibold mb-3">
                  Secure Analysis
                </h3>

                <p className="text-gray-400">
                  Intelligent risk detection using predictive ML models.
                </p>

              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <DollarSign
                  className="text-green-400 mb-4"
                  size={35}
                />

                <h3 className="text-xl font-semibold mb-3">
                  Smart Scoring
                </h3>

                <p className="text-gray-400">
                  Generate AI-based dynamic credit scores instantly.
                </p>

              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <Wallet
                  className="text-yellow-400 mb-4"
                  size={35}
                />

                <h3 className="text-xl font-semibold mb-3">
                  Loan Insights
                </h3>

                <p className="text-gray-400">
                  Analyze customer financial behavior effectively.
                </p>

              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

                <AlertTriangle
                  className="text-red-400 mb-4"
                  size={35}
                />

                <h3 className="text-xl font-semibold mb-3">
                  Risk Detection
                </h3>

                <p className="text-gray-400">
                  Detect high-risk applicants before loan approval.
                </p>

              </div>

            </div>

            {/* ABOUT */}

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-5">
                About This System
              </h2>

              <p className="text-gray-400 text-lg leading-8">

                This AI-powered credit risk prediction system helps
                banks, fintech companies, and financial institutions
                evaluate whether a customer is likely to default on a loan.

              </p>

            </div>

          </div>

          {/* RIGHT SECTION */}

          <div>

            {/* FORM */}

            <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

              <div className="mb-8">

                <h2 className="text-3xl font-bold">
                  Customer Financial Details
                </h2>

                <p className="text-gray-400 mt-2">
                  Enter applicant details for AI-powered risk prediction.
                </p>

              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="text"
                  name="aadhaar"
                  placeholder="Aadhaar Number"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="number"
                  name="income"
                  placeholder="Annual Income"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="number"
                  name="loan"
                  placeholder="Loan Amount"
                  onChange={handleChange}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl px-4 py-4 outline-none focus:border-cyan-400"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all py-4 rounded-xl font-semibold text-lg"
                >

                  {loading ? "Analyzing..." : "Predict Credit Risk"}

                </button>

              </div>

            </div>

            {/* RESULT */}

            {result && (

              <div className="mt-8 bg-[#111827] border border-gray-800 rounded-3xl p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Prediction Result
                </h2>

                <div className="grid grid-cols-2 gap-5">

                  <div className="bg-[#0B1120] rounded-2xl p-5 border border-gray-700">

                    <p className="text-gray-400 text-sm">
                      Credit Score
                    </p>

                    <h3 className="text-4xl font-bold text-cyan-400 mt-2">
                      {result.credit_score}
                    </h3>

                  </div>

                  <div className="bg-[#0B1120] rounded-2xl p-5 border border-gray-700">

                    <p className="text-gray-400 text-sm">
                      Risk Level
                    </p>

                    <h3
                      className={`text-2xl font-bold mt-2 ${
                        result.risk === "Low Risk"
                          ? "text-green-400"
                          : result.risk === "Medium Risk"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {result.risk}
                    </h3>

                  </div>

                </div>

              </div>

            )}

            {/* GRAPH */}

            {history.length > 0 && (

              <div className="mt-8 bg-[#111827] border border-gray-800 rounded-3xl p-8">

                <h2 className="text-2xl font-bold mb-5">
                  Credit Score Analytics
                </h2>

                <div className="bg-[#0B1120] rounded-2xl p-5 h-[350px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                      data={history.map((item, index) => ({
                        name: `P${index + 1}`,
                        score: item.score,
                      }))}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                      />

                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                      />

                      <YAxis
                        stroke="#9CA3AF"
                      />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#06B6D4"
                        strokeWidth={3}
                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </>

  );
}

export default App;