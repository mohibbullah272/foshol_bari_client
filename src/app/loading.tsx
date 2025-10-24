import Image from "next/image";
import loadingGif from '../../asset/loading.gif'

const loading = () => {
    return (
        <div className='flex min-h-dvh flex-col justify-center items-center'>
        <Image
        src={loadingGif}
        alt='loading bar'
        width={200}
        height={200}
        unoptimized={true}
        priority={false}
        />
    </div>
    );
};

export default loading;