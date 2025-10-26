'use client';
import 'bootstrap/dist/css/bootstrap.min.css';  
import ContactsButton from "../../components/buttons/contactsButton";
import ChatButton from "../../components/buttons/chatButton";
import ChatsList from "../../components/chats/chatsList";


const DashboardPage = () => {
  return (
    <div>
      <ContactsButton />
      <ChatButton />

    </div>
  );
};

export default DashboardPage;
