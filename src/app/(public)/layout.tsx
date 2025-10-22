
import { Footer } from "@/components/shared/Footer";
import { Navbar5 } from "@/components/shared/Navbar";
import { ReactNode } from "react";


const CommonLayout = ({children}:{children:ReactNode}) => {
    return (
        <div>

<Navbar5></Navbar5>
            <main className="flex flex-col  min-h-dvh ">{children}</main>
<Footer></Footer>
        </div>
    );
};

export default CommonLayout;