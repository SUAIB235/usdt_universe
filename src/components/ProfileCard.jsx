import { RiUserFollowFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import { IoMdCheckmark } from "react-icons/io";
import { FcDoughnutChart, FcGoogle } from "react-icons/fc";
import { HiOutlineLockClosed } from "react-icons/hi";

export default function ProfileCard({ merchant }) {
  const { user, loginWithGoogle } = useAuth();

  return (
    <div className="relative w-full min-h-screen bg-[#F5F5F5] font-sans">
      {/* 🔒 BLUR OVERLAY */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-fadeIn">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Sign in required
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-6">
              Please login to continue using this feature.
            </p>

            {/* GOOGLE BUTTON */}
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition text-gray-700"
            >
              <FcGoogle className="text-lg" />
              Continue with Google
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={!user ? "pointer-events-none select-none" : ""}>
        {/* HEADER */}
        <div className="h-24 bg-gradient-to-r from-[#FCD535] to-[#F0B90B]" />

        {/* PROFILE */}
        <div className="px-3 pb-4 relative bg-white">
          {/* AVATAR */}
          <div className="absolute -top-10 left-3 w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-3xl border-4 border-white">
            {merchant.merchantName?.charAt(0)}
          </div>

          {/* FOLLOW BUTTON */}
          <a
            href={merchant.merchantLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-3 bg-yellow-400 px-2.5 py-2 rounded-md text-xs font-medium text-black flex items-center gap-1"
          >
            <RiUserFollowFill className="text-sm" />
            Follow
          </a>

          {/* INFO */}
          <div className="pt-12">
            <h2 className="text-xl font-semibold flex items-center gap-1 text-black">
              {merchant.merchantName}
              <FcDoughnutChart />
            </h2>

            <div className="flex items-center gap-2 mt-1 text-[13px] text-gray-600">
              <span className="flex items-center gap-1">
                <FcDoughnutChart /> {merchant.badge} Merchant
              </span>
              <span className="text-gray-400">|</span>
              <span>Deposit {merchant.securityDeposit || "2000"} USDT</span>
            </div>

            {/* VERIFICATION */}
            <div className="flex flex-wrap gap-3 mt-2 text-[13px] text-gray-600">
              {["Email", "SMS", "KYC", "Address"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 text-green-500"
                >
                  <IoMdCheckmark />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-2 bg-white px-3 py-3 text-[13px] border-t border-gray-200">
          <div className="flex justify-between py-1">
            <span className="text-gray-500">30d Trades</span>
            <span className="font-semibold text-black">
              {merchant.trades30d || 0}
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">30d Completion Rate</span>
            <span className="font-semibold text-black">
              {merchant.completion30d || 0}%
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">Total Orders</span>
            <span className="font-semibold text-black">
              {merchant.totalOrders || 0}
            </span>
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="mt-2 bg-white px-3 py-3 text-[13px] border-t border-gray-200">
          <div className="flex justify-between py-1">
            <span className="text-gray-500">Positive Feedback</span>
            <span className="text-green-600 font-semibold">
              {merchant.feedbackPositive || 0}
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-gray-500">Negative Feedback</span>
            <span className="text-red-500 font-semibold">
              {merchant.feedbackNegative || 0}
            </span>
          </div>
        </div>

        {/* TRADE SECTION */}
        <div className="mt-2 bg-white px-3 py-3">
          {/* PRICE */}
          <div className="flex justify-between text-[13px] mb-2">
            <div>
              <span className="text-gray-500">Buy Price</span>
              <div className="text-green-600 font-semibold">
                {merchant.buyRate || "--"}
              </div>
            </div>

            <div className="text-right">
              <span className="text-gray-500">Sell Price</span>
              <div className="text-red-500 font-semibold">
                {merchant.sellRate || "--"}
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">
            <a
              href={merchant.buyAd}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-1.5 text-xs rounded-md text-center font-medium"
            >
              Buy
            </a>

            <a
              href={merchant.sellAd}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-red-500 text-white py-1.5 text-xs rounded-md text-center font-medium"
            >
              Sell
            </a>
          </div>

          {/* LAST UPDATED */}
          <div className="text-center text-[11px] text-gray-400 mt-2">
            Last updated: {merchant.lastUpdated || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
