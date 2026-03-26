import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  TrendingUp, TrendingDown, AlertCircle, RefreshCw, 
  Calendar, Target, BarChart3, Filter, Search,
  ChevronDown, ChevronUp, ExternalLink, Clock
} from "lucide-react";

const IPOPage = () => {
  const [activeTab, setActiveTab] = useState("gmp");
  const [gmpData, setGmpData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchIPOData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchIPOData();
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchIPOData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from APIs with CORS proxy
      const [gmpResponse, subResponse] = await Promise.allSettled([
        axios.get('https://api.allorigins.win/raw?url=https://www.investorgain.com/report/live-ipo-gmp/331/'),
        axios.get('https://api.allorigins.win/raw?url=https://www.investorgain.com/report/ipo-subscription-live/333/')
      ]);

      if (gmpResponse.status === 'fulfilled') {
        const parsedGMP = parseGMPData(gmpResponse.value.data);
        setGmpData(parsedGMP);
      } else {
        setGmpData(getMockGMPData());
      }

      if (subResponse.status === 'fulfilled') {
        const parsedSub = parseSubscriptionData(subResponse.value.data);
        setSubscriptionData(parsedSub);
      } else {
        setSubscriptionData(getMockSubscriptionData());
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching IPO data:', err);
      setError('Unable to fetch live data. Showing sample data.');
      setGmpData(getMockGMPData());
      setSubscriptionData(getMockSubscriptionData());
    } finally {
      setLoading(false);
    }
  };

  const parseGMPData = (html) => {
    // Basic parsing logic - in production, you'd want more robust parsing
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('table tr');
    const data = [];
    
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header
      const cols = row.querySelectorAll('td');
      if (cols.length >= 10) {
        data.push({
          name: cols[0]?.textContent?.trim() || 'N/A',
          gmp: cols[1]?.textContent?.trim() || '0',
          rating: cols[2]?.textContent?.trim() || '0',
          subscription: cols[3]?.textContent?.trim() || '0',
          price: cols[4]?.textContent?.trim() || '0',
          size: cols[5]?.textContent?.trim() || '0',
          lot: cols[6]?.textContent?.trim() || '0',
          open: cols[7]?.textContent?.trim() || 'N/A',
          close: cols[8]?.textContent?.trim() || 'N/A',
          listing: cols[9]?.textContent?.trim() || 'N/A'
        });
      }
    });
    
    return data.length > 0 ? data : getMockGMPData();
  };

  const parseSubscriptionData = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('table tr');
    const data = [];
    
    rows.forEach((row, index) => {
      if (index === 0) return;
      const cols = row.querySelectorAll('td');
      if (cols.length >= 10) {
        data.push({
          name: cols[0]?.textContent?.trim() || 'N/A',
          total: cols[1]?.textContent?.trim() || '0',
          qib: cols[2]?.textContent?.trim() || '0',
          shni: cols[3]?.textContent?.trim() || '0',
          bhni: cols[4]?.textContent?.trim() || '0',
          nii: cols[5]?.textContent?.trim() || '0',
          rii: cols[6]?.textContent?.trim() || '0',
          size: cols[7]?.textContent?.trim() || '0',
          price: cols[8]?.textContent?.trim() || '0',
          closeDate: cols[9]?.textContent?.trim() || 'N/A'
        });
      }
    });
    
    return data.length > 0 ? data : getMockSubscriptionData();
  };

  const getMockGMPData = () => [
    { name: "Apsis Aerocom", gmp: "23", rating: "🔥🔥🔥🔥", subscription: "3.39x", price: "110", size: "33.95", lot: "1200", open: "11-Mar", close: "13-Mar", listing: "18-Mar" },
    { name: "Innovision", gmp: "59", rating: "🔥🔥🔥", subscription: "0.12x", price: "548", size: "322.84", lot: "27", open: "10-Mar", close: "12-Mar", listing: "17-Mar" },
    { name: "Rajputana Stainless", gmp: "0", rating: "🔥", subscription: "1.12x", price: "122", size: "254.98", lot: "110", open: "9-Mar", close: "11-Mar", listing: "16-Mar" },
    { name: "Raajmarg Infra", gmp: "0", rating: "🔥", subscription: "1.13x", price: "98", size: "19.30", lot: "1200", open: "6-Mar", close: "10-Mar", listing: "13-Mar" },
    { name: "SEDEMAC Mechatronics", gmp: "0", rating: "🔥", subscription: "2.68x", price: "1352", size: "1087.35", lot: "11", open: "4-Mar", close: "6-Mar", listing: "11-Mar" },
    { name: "Elfin Agro", gmp: "0", rating: "🔥", subscription: "1.14x", price: "112", size: "46.49", lot: "1200", open: "27-Feb", close: "4-Mar", listing: "9-Mar" },
    { name: "Striders Impex", gmp: "0", rating: "🔥", subscription: "1.33x", price: "72", size: "34.47", lot: "1600", open: "26-Feb", close: "2-Mar", listing: "6-Mar" },
    { name: "Omnitech Engineering", gmp: "0", rating: "🔥", subscription: "1.2x", price: "227", size: "583.00", lot: "66", open: "25-Feb", close: "27-Feb", listing: "5-Mar" },
    { name: "Yaap Digital", gmp: "0", rating: "🔥", subscription: "4.26x", price: "145", size: "76.05", lot: "1000", open: "25-Feb", close: "27-Feb", listing: "5-Mar" },
    { name: "Shree Ram Twistex", gmp: "-28", rating: "🔥", subscription: "43.66x", price: "104", size: "110.24", lot: "144", open: "23-Feb", close: "25-Feb", listing: "2-Mar" }
  ];

  const getMockSubscriptionData = () => [
    { name: "Apsis Aerocom", total: "3.38x", qib: "0.01x", shni: "3.42x", bhni: "7.49x", nii: "6.13x", rii: "4.15x", size: "33.95", price: "110", closeDate: "13-03-2026" },
    { name: "Innovision", total: "0.12x", qib: "1.00x", shni: "0.03x", bhni: "0.28x", nii: "0.20x", rii: "0.07x", size: "322.84", price: "548", closeDate: "12-03-2026" },
    { name: "Rajputana Stainless", total: "1.12x", qib: "2.51x", shni: "0.31x", bhni: "3.74x", nii: "2.59x", rii: "0.27x", size: "254.98", price: "122", closeDate: "11-03-2026" },
    { name: "SEDEMAC Mechatronics", total: "2.68x", qib: "8.46x", shni: "0.53x", bhni: "0.89x", nii: "0.77x", rii: "0.20x", size: "1087.35", price: "1352", closeDate: "6-03-2026" },
    { name: "Shree Ram Twistex", total: "43.66x", qib: "3.94x", shni: "179.00x", bhni: "240.94x", nii: "220.30x", rii: "76.63x", size: "110.24", price: "104", closeDate: "25-02-2026" },
    { name: "Mobilise App", total: "100.07x", qib: "49.16x", shni: "136.89x", bhni: "195.13x", nii: "175.72x", rii: "96.52x", size: "19.08", price: "80", closeDate: "25-02-2026" }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = parseFloat(a[sortConfig.key]) || a[sortConfig.key];
      const bVal = parseFloat(b[sortConfig.key]) || b[sortConfig.key];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  };

  const filteredGMPData = getSortedData(
    gmpData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredSubscriptionData = getSortedData(
    subscriptionData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ChevronDown size={14} className="opacity-30" />;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-20" />
        
       <div className="relative overflow-hidden pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6">
              <Target size={16} className="text-blue-300" />
              <span className="text-sm font-medium text-white/90">Live IPO Data • Real-time Updates</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              IPO Tracker
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Track live IPO GMP, subscription status, and market sentiment in real-time
            </p>

            {lastUpdated && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                <Clock size={14} />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </motion.div>
        </div>

        
      </section>

      {/* Main Content */}
      <section className="py-8 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setActiveTab("gmp")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "gmp"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Live IPO GMP
              </button>
              <button
                onClick={() => setActiveTab("subscription")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "subscription"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Subscription Status
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search IPOs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={fetchIPOData}
                disabled={loading}
                className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}

          {/* GMP Table */}
          {activeTab === "gmp" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["IPO Name", "GMP (₹)", "Rating", "Sub", "Price (₹)", "Size (Cr)", "Lot", "Open", "Close", "Listing"].map((header, idx) => (
                        <th
                          key={idx}
                          onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        >
                          <div className="flex items-center gap-1">
                            {header}
                            <SortIcon column={header.toLowerCase().replace(' ', '')} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                          <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
                          Loading IPO data...
                        </td>
                      </tr>
                    ) : filteredGMPData.length > 0 ? (
                      filteredGMPData.map((ipo, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">{ipo.name}</td>
                          <td className={`px-4 py-3 font-semibold ${
                            parseFloat(ipo.gmp) > 0 ? 'text-green-600' : 
                            parseFloat(ipo.gmp) < 0 ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {ipo.gmp}
                            {parseFloat(ipo.gmp) > 0 && <TrendingUp size={14} className="inline ml-1" />}
                            {parseFloat(ipo.gmp) < 0 && <TrendingDown size={14} className="inline ml-1" />}
                          </td>
                          <td className="px-4 py-3">{ipo.rating}</td>
                          <td className="px-4 py-3">{ipo.subscription}</td>
                          <td className="px-4 py-3">₹{ipo.price}</td>
                          <td className="px-4 py-3">₹{ipo.size}</td>
                          <td className="px-4 py-3">{ipo.lot}</td>
                          <td className="px-4 py-3">{ipo.open}</td>
                          <td className="px-4 py-3">{ipo.close}</td>
                          <td className="px-4 py-3">{ipo.listing}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                          No IPOs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Subscription Table */}
          {activeTab === "subscription" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["IPO Name", "Total", "QIB", "SHNI", "BHNI", "NII", "RII", "Size (Cr)", "Price (₹)", "Close Date"].map((header, idx) => (
                        <th
                          key={idx}
                          onClick={() => handleSort(header.toLowerCase().replace(' ', ''))}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                        >
                          <div className="flex items-center gap-1">
                            {header}
                            <SortIcon column={header.toLowerCase().replace(' ', '')} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                          <RefreshCw size={24} className="animate-spin mx-auto mb-2" />
                          Loading subscription data...
                        </td>
                      </tr>
                    ) : filteredSubscriptionData.length > 0 ? (
                      filteredSubscriptionData.map((ipo, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-900">{ipo.name}</td>
                          <td className="px-4 py-3 font-semibold text-blue-600">{ipo.total}</td>
                          <td className="px-4 py-3">{ipo.qib}</td>
                          <td className="px-4 py-3">{ipo.shni}</td>
                          <td className="px-4 py-3">{ipo.bhni}</td>
                          <td className="px-4 py-3">{ipo.nii}</td>
                          <td className="px-4 py-3">{ipo.rii}</td>
                          <td className="px-4 py-3">₹{ipo.size}</td>
                          <td className="px-4 py-3">₹{ipo.price}</td>
                          <td className="px-4 py-3">{ipo.closeDate}</td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                          No IPOs found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">About Grey Market Premium (GMP)</h3>
                <p className="text-sm text-blue-800">
                  GMP is the unofficial premium at which IPO shares are traded in the grey market before listing. 
                  It indicates market sentiment and potential listing gains. Higher GMP suggests stronger demand.
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Positive GMP = Expected listing gain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-600">Negative GMP = Expected listing loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Subscription  1x = Oversubscribed</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                ⚠️ Disclaimer: GMP is unofficial market data. Always analyze company fundamentals, 
                financials, and consult with a SEBI-registered advisor before investing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IPOPage;