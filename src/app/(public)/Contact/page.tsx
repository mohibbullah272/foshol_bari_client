import ContactComponent from "@/SubPage/ContactComponent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'আপনার যেকোনো প্রশ্ন বা সহায়তার জন্য আমরা সর্বদা প্রস্তুত। আমাদের সাথে যোগাযোগ করুন।',
}

export const dynamic = "force-static";





const ContactPage = () => {
  return (
    <div>
      <ContactComponent></ContactComponent>
    </div>
  );
};

export default ContactPage;