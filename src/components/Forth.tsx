import React from 'react'
import logo from '../images/logo.png'

interface ThirdElement {
    primerGanador?: string;
    segundoGanador?: string;
    tercerGanador?: string;
}

const Forth = ({primerGanador = "",segundoGanador = "", tercerGanador = ""}: ThirdElement) => {
    return (
        <div className="relative w-full md:w-[80%] flex items-center justify-center flex-col">
            <div className="bg-[#00000033] min-w-[90%] max-w-[90%] md:max-w-[100%] md:min-w-[100%] p-2 rounded-3xl flex flex-col items-center align-center">
                <img className="h-[70px] md:h-[110px]" src={logo} alt="" />
                <p className="text-white text-2xl text-center md:text-[48px] font-bold mb-5">Felicitaciones a los ganadores</p>
                <div className="w-full p-2 md:p-0 md:w-8/12 md:mt-6">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">{primerGanador}</p>
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">Premio 1</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">{segundoGanador}</p>
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">Premio 2</p>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">{tercerGanador}</p>
                        <p className="text-white text-xl md:text-[44px] md:mb-6 min-h-[44px]">Premio 3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forth
