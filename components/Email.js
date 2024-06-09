"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmailModal from "@/components/EmailModal";
import Loader from "./Loader";
import { classifyEmail } from "@/utils/classifyEmails"; // Import the classification function
import { classificationColor } from "@/utils/classificationColour";

const Emails = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query || "";
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailCount, setEmailCount] = useState(10); // State to keep track of the number of emails
  const [isClassified, setIsClassified] = useState(false); // State to track if emails have been classified

  const openModal = (email) => {
    setSelectedEmail(email);
    router.push(`/emails?id=${email.id}`, undefined, { shallow: true });
  };

  const closeModal = () => {
    setSelectedEmail(null);
    router.push('/emails', undefined, { shallow: true });
  };
  
  const handleEmailCountChange = (event) => {
    setEmailCount(Number(event.target.value));
  };

  useEffect(() => {
    const fetchEmails = async () => {
      if (!session) return;
      try {
        const accessToken = session.accessToken;

        const response = await fetch("/api/emails", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (data.emails) {
          setEmails(data.emails);
        } else {
          setError('Error fetching emails. Please check API logs.');
        }
      } catch (error) {
        setError('An error occurred while fetching emails.');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchEmails();
    }
  }, [session]);

  const classifyEmails = async () => {
    setLoading(true);
    try {
      if (emails) {
        const limitedEmails = emails.slice(0, emailCount);
        const classifiedEmails = await Promise.all(limitedEmails.map(async (email) => {
          const classification = await classifyEmail(email.body);
          return { ...email, classification };
        }));
        setEmails(classifiedEmails.concat(emails.slice(emailCount)));
        setIsClassified(true); // Mark as classified
      } else {
        setError('Error fetching emails. Please check API logs.');
      }
    } catch (error) {
      setError('An error occurred while fetching emails.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && emails.length) {
      const email = emails.find((email) => email.id === id);
      if (email) {
        setSelectedEmail(email);
      }
    } else {
      setSelectedEmail(null);
    }
  }, [id, emails]);

  if (loading) {
    return <Loader />;
  }
  
  let num = emails.length > 20 ? 20 : emails.length;


  return (
    <div>
      <div className="flex justify-between px-6 pt-4 space-x-4">
        <select
          id="emailCount"
          value={emailCount}
          onChange={handleEmailCountChange}
          className="bg-gray-700 text-white p-2 rounded-md"
        >
          {[...Array(num).keys()].map(i => (
            <option key={i+1} value={i+1}>{i+1}</option>
          ))}
        </select>
        <button
          onClick={classifyEmails}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Classify
        </button>
      </div>

      <ul>
        {emails.map((email) => (
          <li
            key={email.id}
            className="w-[90%] mx-auto p-4 m-4 bg-slate-700 rounded-2xl"
            onClick={() => openModal(email)}
          >
            <div className="flex border-b-4 border-slate-300 justify-around pb-2">
              <div className="text-white"><span className="text-black">FROM : </span>{email.from.split("<")[0].trim()}</div>
              <div className="text-white hidden  md:w-[60%] md:flex md:justify-center md:overflow-hidden text-center">{email.subject.length <= 40 ? email.subject : email.subject.substring(0, 40) + "..."}</div>
              <div className="font-bold" style={{ color: classificationColor[email.classification] || "white" }}>{email.classification}
              </div>
            </div>

            <div className="bg-slate-600 mt-4 p-2 rounded-2xl">
              <div
                className="font-serif text-white overflow-hidden h-[100px]"
                dangerouslySetInnerHTML={{ __html: email.body }}
              />
            </div>
          </li>
        ))}
      </ul>
      {selectedEmail && (
        <EmailModal email={selectedEmail} onClose={closeModal} />
      )}
    </div>
  );
};

export default Emails;
