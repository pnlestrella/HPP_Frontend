import React, { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { Calendar } from "@/components/ui/calendar";
import ChatBot from '@/components/ChatBot';
import { User } from '@/types';

interface LandingProps {
  user: User;
}

const Landing: React.FC<LandingProps> = ({ user }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const firstName = user.name.split(' ')[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header>
        <Header user={user} />
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <Nav user={user} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Hero Section */}
          <section className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl mb-10">
            <img
              src="https://storage.googleapis.com/a1aa/image/41497483-f7c9-4f44-7ffa-e8453b47f693.jpg"
              alt="Hospital building with large H sign on top and blue sky background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Good Day, <span className="text-blue-400">{firstName}</span>!
              </h1>
              <p className="mt-1 text-lg lg:text-xl">
                Stay healthy and keep track of your appointments and health tips.
              </p>
            </div>
          </section>

          {/* Dashboard Section */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Schedule</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border shadow-sm
                  [&_.day]:transition-all
                  [&_.day]:rounded-full
                  [&_.day]:h-12 [&_.day]:w-12
                  [&_.day:hover]:bg-blue-50
                  [&_.day:hover]:text-blue-600
                  [&_.day[aria-selected='true']]:bg-blue-50
                  [&_.day[aria-selected='true']]:text-blue-600
                  [&_.day[aria-selected='true']]:shadow-md
                  [&_.day[aria-selected='true']]:hover:bg-blue-100
                  [&_.day[aria-selected='true']]:hover:text-blue-700
                  [&_.rdp-nav_button]:rounded-full
                  [&_.rdp-nav_button]:hover:bg-blue-50
                  [&_.rdp-nav_button]:hover:text-blue-600
                  [&_.rdp-nav_button]:transition-all
                  [&_.rdp-nav_button]:shadow-sm"
              />
            </div>

            {/* Health Tip */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 flex flex-col justify-center hover:shadow-2xl transition-shadow">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Health Tip</h2>
              <p className="text-blue-800 text-lg">Drink at least 8 glasses of water daily to stay hydrated!</p>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>May 20, 2025</span>
                  <span className="text-blue-600 font-medium">Checkup</span>
                </li>
                <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>May 25, 2025</span>
                  <span className="text-blue-600 font-medium">Lab Test</span>
                </li>
                <li className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <span>June 2, 2025</span>
                  <span className="text-blue-600 font-medium">Consultation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Announcements & Hotlines */}
          <div className="grid lg:grid-cols-2 gap-8 mt-10">
            {/* Announcements */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <i className="fas fa-bullhorn text-blue-600 text-lg"></i>
                <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
              </div>
              <div className="text-gray-600">
                <p className="mb-1">No Announcements</p>
                <p className="text-sm">Please await further instructions</p>
              </div>
            </div>

            {/* Emergency Hotlines */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Hotlines</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "NURSE STATION 1", phone: "(51) 472-4025" },
                  { name: "NURSE STATION 2", phone: "(53) 475-0000" },
                  { name: "NURSE STATION 3", phone: "(052) 871-33-77" },
                  { name: "NURSE STATION 4", phone: "(54) 472-4025" },
                  { name: "NURSE STATION 5", phone: "(59) 852-4125" },
                ].map((station, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors flex flex-col"
                  >
                    <p className="text-sm font-medium text-gray-900">{station.name}</p>
                    <p className="text-blue-600">{station.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Landing;
