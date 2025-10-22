import Image from "next/image";
import fosholBariLogo from '../../asset/foshol_bari_logo.jpg'

const Logo = () => {
    return (
        <div>
            <Image
            src={fosholBariLogo}
            alt="foshol_bar_logo"
            width={30}
            height={30}
            className="rounded-full"
            />
        </div>
    );
};

export default Logo;