import React, { useEffect, useState } from 'react'
import title3 from '../images/title-premio.png'
import title1 from '../images/premio1.png'
import title2 from '../images/premio2.png'
import logo from '../images/logo.png'
import ruleta from '../images/ruleta.png'
import Lottie from "lottie-react";
import Blob from '../images/conteo.json';

interface premios {
    premioNo: string;
    onTimeUp: () => void;  // Agrega esta línea para tipar la nueva prop
}

const Second = ({ premioNo, onTimeUp }: premios) => {

    const [premio, setPremio] = useState("primero");

    useEffect(() => {
        if (premioNo !== "") {
            setPremio(premioNo);
        }
    }, [premioNo]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeUp();  // Esta función cambia a la pantalla del ganador después de 10 segundos
        }, 6000);  // 10000 milisegundos = 10 segundos

        return () => clearTimeout(timer);  // Limpiar el temporizador al desmontar el componente
    }, []);

    return (
        <div className="relative w-full md:w-[80%] flex items-center justify-center flex-col">
            {
                (premio == 'primero') && <img className="h-[70px] md:h-[130px]" src={title1} alt="" />
            }
            {
                (premio == 'segundo') && <img className="h-[70px] md:h-[130px]" src={title2} alt="" />
            }
            {
                (premio == 'tercero') && <img className="h-[70px] md:h-[130px]" src={title3} alt="" />
            }
            <div className="bg-[#00000033] min-w-[90%] max-w-[90%] md:max-w-[100%] md:min-w-[100%] p-2 rounded-3xl flex flex-col items-center align-center">
                {/* <img className="md:h-[420px]" src={ruleta} alt="" /> */}
                <div className='h-[420px] w-[472px] overflow-hidden'>
                    <Lottie className='p-1' height={420} width={472} animationData={Blob} loop={false} />
                </div>
            </div>
            <img className="md:absolute h-[60px] top-[140px] left-[10px]" src={logo} alt="" />
        </div>
    )
}

export default Second
