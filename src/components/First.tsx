import React from 'react';
import title from '../images/title.png';
import logo from '../images/logo.png';

type FirstProps = {
    onBegin: () => void;
};

const First: React.FC<FirstProps> = ({ onBegin }) => {
    return (
        <div className="relative w-full md:w-[80%] flex items-center justify-center flex-col">
            <img className="h-[80px] md:h-[130px]" src={logo} alt="" />
            <div className="bg-[#00000033] min-w-[90%] max-w-[90%] md:max-w-[100%] md:min-w-[100%] p-10 rounded-3xl flex flex-col items-center align-center">
                <img className="max-h-[220px]" src={title} alt="" />
                <p className="text-white text-[36px] mb-10">Mes de Abril</p>
                <button className="bg-[#00EFE5] w-[325px] h-[67px] rounded-lg flex items-center justify-center" onClick={onBegin}>
                    <span className="text-[40px] text-[#1C212B]">Empezar</span>
                </button>
            </div>
        </div>
    );
};

export default First;
