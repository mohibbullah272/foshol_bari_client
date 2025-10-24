import Image from "next/image";
import loadingGif from '../../../asset/loading.gif'

const loading = () => {
    return (
        <div className='flex min-h-dvh flex-col justify-center items-center'>
        <Image
        src={loadingGif}
        alt='loading bar'
        width={300}
        height={300}
        unoptimized={true}
        priority={false}
        />
    </div>
    );
};

export default loading;