import React, { useState } from 'react'
import logo from '../images/logo.png'
import cash from '../images/cash.png'
import tv from '../images/tv.png'
import ps from '../images/ps5.png'

interface ThirdElement {
    arrow?: boolean;
    premio: string;
    nombrePremio: string;
    numeroPremio: string;
    ganadorNombre: string | undefined;
    nombreSuplente: string | undefined;
    ganadorId: string | undefined;
    setPremio: (premio: string) => void; // Función para actualizar el premio
    setThirdPrice: () => void; // Función para cambiar a la pantalla del segundo premio
    setResumenScreen: () => void; // Función para cambiar a la pantalla de resumen
    onArrowClick: () => void;
}

const Third = ({ arrow = true, ganadorId = "", nombreSuplente = "", premio = "primero", numeroPremio= "3er", onArrowClick, nombrePremio = "S/1,000 en créditos", ganadorNombre = "", setPremio, setThirdPrice, setResumenScreen }: ThirdElement) => {
    
    return (
        <div className="relative w-full md:w-[80%] flex items-center justify-center flex-col">
            <div className="bg-[#00000033] min-w-[90%] max-w-[90%] md:max-w-[100%] md:min-w-[100%] p-2 rounded-3xl flex flex-col items-center align-center">
                <img className="h-[70px] md:h-[110px]" src={logo} alt="" />
                <p className="text-2xl text-center text-white md:text-[36px] mb-5">Ganador del {numeroPremio} premio | {nombrePremio}</p>
                {/* <img className="h-[60px] md:h-[100px]" src="./img/name.png" alt="" /> */}
                <p className="flex justify-center items-center text-white text-[42px] mb-6 font-bold">{ganadorNombre}</p>
                <p className="text-white text-xl md:text-[32px] mb-10">({ganadorId})</p>
                {
                    (premio == 'primero') && <img className="h-[160px] md:h-[260px]" src={cash} alt="" />
                }
                {
                    (premio == 'segundo') && <img className="h-[160px] md:h-[260px]" src={tv} alt="" />
                }
                {
                    (premio == 'tercero') && <img className="h-[160px] md:h-[260px]" src={ps} alt="" />
                }
                
                {
                    arrow && <a className="absolute right-[40px] top-[40%]" onClick={onArrowClick}>
                        <svg width="47" height="82" viewBox="0 0 47 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.61356 80.3941C3.75763 82.5353 7.2144 82.5353 9.35846 80.3941L45.7201 44.0807C47.4266 42.3765 47.4266 39.6235 45.7201 37.9193L9.35846 1.60592C7.2144 -0.535305 3.75763 -0.535305 1.61356 1.60592C-0.530505 3.74714 -0.530505 7.19931 1.61356 9.34053L33.2933 41.0218L1.56981 72.7032C-0.530506 74.8007 -0.530505 78.2966 1.61356 80.3941Z" fill="white" />
                        </svg>
                    </a>
                }
            </div>
            <p className="text-white text-xl md:text-[36px] text-center mt-10">Suplente: {nombreSuplente}</p>
        </div>
    )
}

export default Third
