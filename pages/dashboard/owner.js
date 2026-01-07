import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { saveAs } from 'file-saver';
import { FaDownload, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function OwnerDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!session?.user?.role) return;
      const response = await fetch('/api/stats', {
        headers: { 'x-role': session.user.role },
      });
      const data = await response.json();
      setAnalytics(data);
    }
    fetchAnalytics();
  }, [session]);

  function exportToCSV() {
    if (!analytics) return;

    const csvContent = [
      ['Metric', 'Value'],
      ['Total Revenue', analytics.totalRevenue],
      ['Total Orders', analytics.totalOrders],
      ['Total Customers', analytics.totalCustomers],
      ['New Customers', analytics.newCustomers],
      ['Repeat Customers', analytics.repeatCustomers],
      ['Current Month Revenue', analytics.currentMonthRevenue],
      ['Last Month Revenue', analytics.lastMonthRevenue],
      ['Current Month Orders', analytics.currentMonthOrders],
      ['Last Month Orders', analytics.lastMonthOrders],
      [''],
      ['Top Items', 'Quantity', 'Revenue'],
      ...analytics.topItems.map(item => [item.name, item.qty, item.revenue]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'analytics.csv');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome, Owner! Manage your menus, invoices, and analytics here.</p>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => router.push('/dashboard/manage-menu')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 font-semibold"
          >
            Manage Menu
          </button>
          <button
            onClick={() => router.push('/dashboard/manage-invoices')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold"
          >
            Manage Invoices
          </button>
        </div>

        {/* Analytics Section */}
        {analytics ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Business Analytics</h2>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${(analytics.totalRevenue || 0).toFixed(2)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-green-600">{analytics.totalOrders || 0}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.totalCustomers || 0}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Repeat Customers</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.repeatCustomers}</p>
              </div>
            </div>

            {/* Monthly Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Current Month</h3>
                <p className="text-gray-600">Revenue: <span className="font-bold text-green-600">${(analytics.currentMonthRevenue || 0).toFixed(2)}</span></p>
                <p className="text-gray-600">Orders: <span className="font-bold">{analytics.currentMonthOrders || 0}</span></p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Last Month</h3>
                <p className="text-gray-600">Revenue: <span className="font-bold text-blue-600">${(analytics.lastMonthRevenue || 0).toFixed(2)}</span></p>
                <p className="text-gray-600">Orders: <span className="font-bold">{analytics.lastMonthOrders || 0}</span></p>
              </div>
            </div>

            {/* Customer Analytics */}
            <div className="mb-8 border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Customer Retention</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold text-blue-600">{analytics.newCustomers || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Repeat Customers</p>
                  <p className="text-2xl font-bold text-green-600">{analytics.repeatCustomers || 0}</p>
                </div>
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            {analytics.monthlyBreakdown && analytics.monthlyBreakdown.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Monthly Revenue Trend</h3>
                <LineChart
                  width={800}
                  height={300}
                  data={analytics.monthlyBreakdown}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </div>
            )}

            {/* Top Items Chart */}
            {analytics.topItems && analytics.topItems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Top Menu Items by Revenue</h3>
                <BarChart
                  width={800}
                  height={300}
                  data={analytics.topItems.slice(0, 10)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  className="mx-auto"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10B981" />
                </BarChart>
              </div>
            )}

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold"
            >
              <FaDownload /> Export Analytics to CSV
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading analytics...</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'owner') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}