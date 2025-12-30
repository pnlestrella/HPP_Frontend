import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import placeholderProfile from '../assets/placeholderProfile.png';
import Button from '../components/Button';
import useDecodedToken from '../utils/DecodeToken';
import axios from 'axios';
import ChatBot from '@/components/ChatBot';
import { AlertTriangle } from 'lucide-react';

interface ProfileData {
  gender?: string;
  age?: number;
  address?: string;
  dateOfBirth?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({});
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const patient = useDecodedToken();

  useEffect(() => {
    const controller = new AbortController();

    const getProfile = async () => {
      try {
        setLoading(true);
        setError('');

        if (!patient?.email) {
          throw new Error('No email found in token');
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
          params: { email: patient.email },
          timeout: 5000,
          signal: controller.signal
        });

        if (
          !response.data ||
          response.data.code === 'fallback' ||
          response.data.code === 'error' ||
          !response.data.data
        ) {
          throw new Error('Profile service unavailable');
        }

        setProfile(response.data.data);
      } catch (err: any) {
        if (axios.isCancel(err)) return;

        console.error('❌ Profile fetch failed:', err.message);

        setProfile({});
        setError(
          err.message === 'Profile service unavailable'
            ? 'Profile service is temporarily unavailable.'
            : 'Unable to load profile. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (patient) {
      getProfile();
    }

    return () => controller.abort();
  }, [patient]);

  // =====================
  // LOADING STATE
  // =====================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  // =====================
  // INVALID SESSION
  // =====================
  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Invalid session. Please log in again.
      </div>
    );
  }

  // =====================
  // ERROR STATE (IMPROVED UI)
  // =====================
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <header>
        <Header user={patient} />

        </header>
        <div className="flex flex-1">
          <Nav user={patient} />

          <div className="flex-1 flex items-center justify-center p-10">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-md text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-50 p-4 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Profile Unavailable
              </h2>

              <p className="text-gray-600 mb-6">
                We’re having trouble retrieving your profile information right
                now. This is usually temporary. Please try again shortly.
              </p>

              <Button
                text="Retry"
                className="bg-[#005F92] text-white px-6 py-2 rounded-xl hover:opacity-90"
                onClick={() => window.location.reload()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================
  // SAFE DATA MAPPING
  // =====================
  const patientData = {
    id: 'PT-20250001',
    sex: profile.gender ?? 'N/A',
    age: profile.age ?? 'N/A'
  };

  const ContactInfo = {
    phone: '09193756332',
    email: patient.email,
    address: profile.address ?? 'N/A',
    birth: profile.dateOfBirth
      ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })
      : 'N/A'
  };

  const MedInfo = {
    doctor: 'Dr. Patricia Estrella',
    blood: 'O+',
    allergies: 'Peanuts, Seafood',
    meds:
      'Atorvastatin 20mg - Once daily at bedtime | Metformin 500mg - Twice daily with meals'
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Header user={patient} />
      </header>

      <div className="flex flex-1">
        <Nav user={patient} />

        <div className="flex-1">
          <div className="border-b border-[#9E9E9E] p-6">
            <h1 className="text-5xl text-[#005F92] font-semibold">
              Patient Profile
            </h1>

            <div className="flex justify-between m-10">
              <div className="flex items-center gap-10">
                <img
                  src={placeholderProfile}
                  alt="profile"
                  className="w-50 h-50 rounded-full"
                />
                <div>
                  <h1 className="text-3xl font-semibold text-[#404040]">
                    {patient.name}
                  </h1>
                  <p className="text-[#525252]">
                    Patient ID: {patientData.id} | {patientData.sex},{' '}
                    {patientData.age}
                  </p>
                </div>
              </div>

              <Button
                text="Edit Profile"
                className="border border-[#005F92] px-4 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="flex flex-col items-center p-10 gap-10">
            <div className="bg-gray-50 p-6 rounded-lg w-full">
              <h2 className="text-2xl mb-4">Contact Information</h2>
              <hr className="mb-6" />
              {Object.entries(ContactInfo).map(([key, value]) => (
                <div key={key} className="flex mb-4">
                  <div className="w-1/3 capitalize text-gray-600">{key}</div>
                  <div className="w-2/3">{value}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg w-full">
              <h2 className="text-2xl mb-4">Medical Information</h2>
              <hr className="mb-6" />
              {Object.entries(MedInfo).map(([key, value]) => (
                <div key={key} className="flex mb-4">
                  <div className="w-1/3 capitalize text-gray-600">{key}</div>
                  <div className="w-2/3">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Profile;
