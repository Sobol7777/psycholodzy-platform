'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Users, MessageSquare, CheckCircle, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Specialist {
  id: number;
  name: string;
  email: string;
  specialization: string;
  city: string;
  pricePerSession: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSpecialists: 0,
    activeSpecialists: 0,
    verifiedSpecialists: 0,
    totalContacts: 0
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.role !== 'admin') {
      router.push('/admin/login');
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/specialists');
      const data = await response.json();
      
      setSpecialists(data);
      setStats({
        totalSpecialists: data.length,
        activeSpecialists: data.filter((s: Specialist) => s.isActive).length,
        verifiedSpecialists: data.filter((s: Specialist) => s.isVerified).length,
        totalContacts: 0 // TODO: Implement contact requests count
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Czy na pewno chcesz usunąć tego specjalistę?')) return;

    try {
      const response = await fetch(`/api/specialists/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        alert('Błąd podczas usuwania specjalisty');
      }
    } catch (error) {
      console.error('Error deleting specialist:', error);
      alert('Błąd podczas usuwania specjalisty');
    }
  };

  const toggleStatus = async (id: number, field: 'isActive' | 'isVerified', currentValue: boolean) => {
    try {
      const response = await fetch(`/api/specialists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [field]: !currentValue
        })
      });

      if (response.ok) {
        fetchData(); // Refresh data
      } else {
        alert('Błąd podczas aktualizacji');
      }
    } catch (error) {
      console.error('Error updating specialist:', error);
      alert('Błąd podczas aktualizacji');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Panel Administracyjny</h1>
              <p className="text-slate-600">Zarządzaj specjalistami i platformą</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Zalogowany jako: {session?.user?.email}
              </span>
              <Link
                href="/admin/specialists/new"
                className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Dodaj specjalistę
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-teal-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Wszyscy specjaliści</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.totalSpecialists}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Aktywni</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.activeSpecialists}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Zweryfikowani</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.verifiedSpecialists}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Zapytania</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.totalContacts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specialists Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-900">Lista specjalistów</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Specjalista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Specjalizacja
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Miasto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {specialists.map((specialist) => (
                  <tr key={specialist.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{specialist.name}</div>
                        <div className="text-sm text-slate-500">{specialist.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {specialist.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {specialist.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {specialist.pricePerSession} PLN
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleStatus(specialist.id, 'isActive', specialist.isActive)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            specialist.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {specialist.isActive ? 'Aktywny' : 'Nieaktywny'}
                        </button>
                        <button
                          onClick={() => toggleStatus(specialist.id, 'isVerified', specialist.isVerified)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            specialist.isVerified
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {specialist.isVerified ? 'Zweryfikowany' : 'Niezweryfikowany'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/specialists/${specialist.id}/edit`}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(specialist.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 