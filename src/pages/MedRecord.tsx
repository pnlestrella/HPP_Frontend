import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import useDecodedToken from '../utils/DecodeToken';
import SearchBar from '../components/SearchBar';
import Filter from '@/components/Filter';
import { sortOptions, typeOptions } from '@/utils/filterOptions';
import MedicalTable from '@/components/MedTable';
import MedResults from '@/components/MedResults';
import ChatBot from '@/components/ChatBot';
import { FileText } from 'lucide-react';

interface MedicalRecord {
  id: string;
  type: string;
  date: string;
  status: string;
  [key: string]: string | number | boolean;
}

const MedicalRecord = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  // 🔹 Simulated records state (replace with API data later)
  const [records] = useState<MedicalRecord[]>([]);

  const patient = useDecodedToken();

  const handleBack = () => {
    setSelectedRecord(null);
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  const hasRecords = records.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header>
        <Header user={patient} />

      </header>

      <div className="flex flex-1">
        <Nav user={patient} />

        <main className="flex-1 p-8">
          {selectedRecord ? (
            <MedResults PatientData={selectedRecord} onBack={handleBack} />
          ) : (
            <>
              <SearchBar
                title="Medical Records"
                description="View and manage your health information"
                data={records}
              />

              <div className="flex flex-col gap-8 mt-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl font-semibold">All Records</h1>
                  <p className="text-gray-500 mt-1">
                    Click on a record to view details
                  </p>
                </div>

                {/* Filters */}
                <div className="flex justify-end gap-3">
                  <Filter
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={typeOptions}
                    placeholder="Filter by Type"
                  />
                  <Filter
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value as 'newest' | 'oldest')}
                    options={sortOptions}
                    placeholder="Sort by"
                  />
                </div>

                {/* Validation / Empty State */}
                {!hasRecords ? (
                  <div className="flex flex-col items-center justify-center h-[300px] bg-white rounded-xl border border-dashed border-gray-300">
                    <FileText size={48} className="text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium text-gray-700">
                      No medical records found
                    </h2>
                    <p className="text-gray-500 mt-2 text-center max-w-sm">
                      Your medical records will appear here once they are
                      available.
                    </p>
                  </div>
                ) : (
                  <MedicalTable
                    sortOrder={sortOrder}
                    typeFilter={typeFilter}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <ChatBot />
    </div>
  );
};

export default MedicalRecord;
