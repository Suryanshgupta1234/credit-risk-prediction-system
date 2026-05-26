import { useEffect, useState } from "react";
import axios from "axios";

function BankerDashboard() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-[#0B1120] text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Banker Dashboard
      </h1>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <div className="bg-[#111827] rounded-2xl p-6">

          <p className="text-gray-400">
            Total Customers
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-3">
            {users.length}
          </h2>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <p className="text-gray-400">
            High Risk
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-3">

            {
              users.filter(
                (u) => u.risk === "High Risk"
              ).length
            }

          </h2>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <p className="text-gray-400">
            Low Risk
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">

            {
              users.filter(
                (u) => u.risk === "Low Risk"
              ).length
            }

          </h2>

        </div>

        <div className="bg-[#111827] rounded-2xl p-6">

          <p className="text-gray-400">
            Total Loans
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">

            ₹ {
              users.reduce(
                (acc, curr) => acc + Number(curr.loan),
                0
              )
            }

          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111827] border border-gray-700 rounded-xl px-5 py-4 outline-none"
        />

      </div>

      {/* TABLE */}

      <div className="bg-[#111827] rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              <th className="text-left p-5">
                Name
              </th>

              <th className="text-left p-5">
                Email
              </th>

              <th className="text-left p-5">
                Loan
              </th>

              <th className="text-left p-5">
                Credit Score
              </th>

              <th className="text-left p-5">
                Risk
              </th>

              <th className="text-left p-5">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user, index) => (

              <tr
                key={index}
                className="border-t border-gray-800"
              >

                <td className="p-5">
                  {user.name}
                </td>

                <td className="p-5">
                  {user.email}
                </td>

                <td className="p-5">
                  ₹ {user.loan}
                </td>

                <td className="p-5 text-cyan-400 font-bold">
                  {user.credit_score}
                </td>

                <td className="p-5">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      user.risk === "Low Risk"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >

                    {user.risk}

                  </span>

                </td>

                <td className="p-5 flex gap-3">

                  <button
                    className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default BankerDashboard;