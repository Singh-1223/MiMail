"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const Emails = () => {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState([
    {id: '18ff6ccb0a60e6c8', threadId: '18ff6ccb0a60e6c8', from: 'Google <no-reply@accounts.google.com>', subject: 'Security alert', body:`<html>
    <head></head>
    <body>
     Dear Customer,
     <br />
     <br /> Hope you are enjoying the hi-speed internet experience with Jio.
     <br />
     <br /> You have used 50% of your 1.5 GB daily high speed data quota on your Jio Number 7505160798 as of 07-Jun-24 20:26 Hrs. 
     <br />
     <br /> To track your balance and usage, give a missed call to 1299. 
     <br /> To know more on how to manage your Jio account, click https://youtu.be/nkg_fLUUxD8
     <br />
     <br /> JioCare is now available on WhatsApp. 
     <br />
     <br /> To chat with us, click https://wa.me/917000770007/?text=hi 
     <br />
     <br /> Thank you, 
     <br /> Team Jio
    </body>
   </html>`}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null); // State for selected email


  const openModal = (email) => {
    setSelectedEmail(email);
    // Update URL query parameters
    // router.push({ query: { id: email.id } });
  };

  const closeModal = () => {
    setSelectedEmail(null);
    // Remove URL query parameters
    // router.push({ pathname: '/emails' });
  };

  // useEffect(() => {
  //   const fetchEmails = async () => {
  //     if (!session) return; // Handle no session case
  //     console.log(session);
  //     try {
  //       const accessToken = session.accessToken; // Access token from session
     
  //       const response = await fetch("/api/emails", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`, // Include access token in header
  //         },
  //       });
      
  //       const data = await response.json();

  //       if (data.emails) {
  //         setEmails(data.emails);
  //       } else {
  //         setError('Error fetching emails. Please check API logs.');
  //       }
  //     } catch (error) {
  //       setError('An error occurred while fetching emails.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (session) {
  //     fetchEmails(); // Fetch emails only if session exists
  //   }
  // }, [session]);

  // if (loading) {
  //   return <p>Loading emails...</p>;
  // }
  // console.log(emails);
  return (
      <div className="inbox-container flex flex-col items-center">
        <h2>Your Emails</h2>
        <ul className="email-list w-full flex-grow overflow-y-auto"> {/* Adjust width and overflow */}
          {emails.map((email) => (
            <li
              key={email.id}
              className="email-item w-full border-b border-gray-200 hover:bg-gray-100 p-4 cursor-pointer"
              onClick={() => openModal(email)}
            >
              <div className="email-header flex items-center justify-between">
                <span className="from font-semibold">{email.from}</span>
                <div className="flex items-center">
                  <span className="subject mr-2">{email.subject}</span>
                  <span className="importance text-red-500 font-bold">IMPORTANT</span>
                </div>
              </div>
              <div className="email-body text-gray-600 truncate"  dangerouslySetInnerHTML={{ __html: email.body.substring(0, 100) + "..." }}/> {/* Truncate body content */}
              
            </li>
          ))}
        </ul>
        {selectedEmail && (
          <EmailModal email={selectedEmail} onClose={closeModal} />
        )}
      </div>
    );
  };
  
  const EmailModal = ({ email, onClose }) => (
    <div className={`modal fixed right-0 top-0 w-full h-screen bg-gray-800 opacity-75 z-50 transition-all duration-300 ease-in-out ${email ? "transform translate-x-0" : "transform translate-x-full"}`}> {/* Use email prop here */}
      <div className="modal-content bg-white w-3/4 h-full mx-auto rounded-lg shadow-md overflow-y-auto p-4">
        <div className="modal-header flex justify-between items-center pb-4 border-b border-gray-200">
          <h3>{email.subject}</h3> {/* Access email details using email prop */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body" dangerouslySetInnerHTML={{ __html: email.body }} />
      </div>
    </div>
  );
export default Emails;
