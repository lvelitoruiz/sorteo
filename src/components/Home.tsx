import React, { useEffect, useState } from 'react'
import background from '../images/background.png';
import background2 from '../images/background-2.png';
import globos from '../images/globos.png';
import First from './First';
import Second from './Second';
import Third from './Third';
import Forth from './Forth';

// import Winners from '../images/winners.csv'

type PlayerData = {
    playerId: string;
    playerName: string;
    value: number;
};

const Home = () => {

    const [screen1, setScreen1] = useState(true);
    const [screen2, setScreen2] = useState(false);
    const [screen3, setScreen3] = useState(false);
    const [screen4, setScreen4] = useState(false);

    const [primerGanador, setPrimerGanador] = useState<PlayerData>();
    const [segundoGanador, setSegundoGanador] = useState<PlayerData>();
    const [tercerGanador, setTercerGanador] = useState<PlayerData>();

    const [primerGanadorS, setPrimerGanadorS] = useState<PlayerData>();
    const [segundoGanadorS, setSegundoGanadorS] = useState<PlayerData>();
    const [tercerGanadorS, setTercerGanadorS] = useState<PlayerData>();

    const [ganadorNombre, setGanadorNombre] = useState<any>("");
    const [nombreSuplente, setNombreSuplente] = useState<any>("");
    const [ganadorId, setGanadorId] = useState<any>("");

    const [premio, setPremio] = useState("tercero");
    const [premioNumber, setPremioNumber] = useState("3er");
    const [premioNombre, setPremioNombre] = useState("S/1,000 en créditos");

    const [clickCount, setClickCount] = useState(0);

    const processCSVData = (csvData: string): [PlayerData[], PlayerData[], PlayerData[]] => {
        const rows = csvData.split('\n');

        // Define indices directly based on the expected column order
        // Ensure these indices match your CSV structure
        const idIndex = 1; // Index for 'Player ID'
        const nameIndex = 2; // Index for 'Player Name'
        const tvIndex = 3; // Index for 'TV 43´´ + Popcorn bucket'
        const smartwatchIndex = 4; // Index for '02 Smartwatch'
        const betIndex = 5; // Index for 'S/1,000 in Palms Bet'

        // Arrays to store the data
        const tvArray: PlayerData[] = [];
        const smartwatchArray: PlayerData[] = [];
        const betArray: PlayerData[] = [];

        // Process each row, starting from the second row (to skip the header)
        rows.slice(1).forEach(row => {
            const columns = row.split(',').map(column => column.trim());

            const playerId = columns[idIndex];
            const playerName = columns[nameIndex];
            const tvValue = parseInt(columns[tvIndex], 10);
            const smartwatchValue = parseInt(columns[smartwatchIndex], 10);
            const betValue = parseInt(columns[betIndex], 10);

            // Only push to the arrays if the values are valid numbers (ignore NaN entries)
            if (!isNaN(tvValue)) {
                tvArray.push({ playerId, playerName, value: tvValue });
            }
            if (!isNaN(smartwatchValue)) {
                smartwatchArray.push({ playerId, playerName, value: smartwatchValue });
            }
            if (!isNaN(betValue)) {
                betArray.push({ playerId, playerName, value: betValue });
            }
        });

        return [tvArray, smartwatchArray, betArray];
    };

    const pickTwoUniqueWeightedRandom = (items: PlayerData[]): [PlayerData, PlayerData] => {
        const totalWeight = items.reduce((sum, item) => sum + item.value, 0);
        let firstRandomNum = Math.random() * totalWeight;
        let secondRandomNum = Math.random() * totalWeight;

        let firstIndex = -1;
        items.forEach((item, index) => {
            firstRandomNum -= item.value;
            if (firstRandomNum < 0 && firstIndex === -1) {
                firstIndex = index;
            }
        });

        // Remove the first selected item and adjust the second random number if needed
        const [firstWinner] = items.splice(firstIndex, 1);
        secondRandomNum = secondRandomNum > firstRandomNum ? secondRandomNum - firstWinner.value : secondRandomNum;

        let secondIndex = -1;
        items.forEach((item, index) => {
            secondRandomNum -= item.value;
            if (secondRandomNum < 0 && secondIndex === -1) {
                secondIndex = index;
            }
        });

        const [secondWinner] = items.splice(secondIndex, 1);

        return [firstWinner, secondWinner];
    };


    const fetchCSV = async (): Promise<string> => {
        const response = await fetch('/data/winners.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    };

    useEffect(() => {
        fetchCSV()
            .then((csvData) => {
                let [tvArray, smartwatchArray, betArray] = processCSVData(csvData);

                const [randomTvPlayer1, randomTvPlayer2] = pickTwoUniqueWeightedRandom(tvArray);
                console.log('Random TV & Popcorn Players:', randomTvPlayer1, randomTvPlayer2);
                setPrimerGanador(randomTvPlayer1);
                setPrimerGanadorS(randomTvPlayer2);

                const [randomWatchPlayer1, randomWatchPlayer2] = pickTwoUniqueWeightedRandom(smartwatchArray);
                console.log('Random Watch Players:', randomWatchPlayer1, randomWatchPlayer2);
                setSegundoGanador(randomWatchPlayer1);
                setSegundoGanadorS(randomWatchPlayer2);

                const [randomBetPlayer1, randomBetPlayer2] = pickTwoUniqueWeightedRandom(betArray);
                console.log('Random Bet Players:', randomBetPlayer1, randomBetPlayer2);
                setTercerGanador(randomBetPlayer1);
                setTercerGanadorS(randomBetPlayer2);

                setGanadorNombre(randomBetPlayer1.playerName);
                setGanadorId(randomBetPlayer1.playerId);
                setNombreSuplente(randomBetPlayer2.playerName);
            })
            .catch(error => {
                console.error('Failed to fetch or process CSV:', error);
            });
    }, [])

    const handleArrowClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 1) {
            setPremio("segundo");
            setGanadorNombre(segundoGanador?.playerName);
            setGanadorId(segundoGanador?.playerId);
            setNombreSuplente(segundoGanadorS?.playerName);
            setPremioNombre("Smartwatch");
            setPremioNumber("2do");
            setThirdPrice();
        } else if (newCount === 2) {
            setPremio("primero");
            setGanadorNombre(primerGanador?.playerName);
            setGanadorId(primerGanador?.playerId);
            setNombreSuplente(primerGanadorS?.playerName);
            setPremioNombre("TV 43' + Popcorn bucket");
            setPremioNumber("1er");
            setThirdPrice();
        } else if (newCount >= 3) {
            setResumenScreen();
        }
    };

    const setThirdPrice = () => {
        setScreen1(false);
        setScreen3(false);
        setScreen4(false);
        setScreen2(true);
    }

    const setGanadorScreen = () => {
        setScreen1(false);
        setScreen3(true);
        setScreen4(false);
        setScreen2(false);
    }

    const setResumenScreen = () => {
        setScreen1(false);
        setScreen3(false);
        setScreen4(true);
        setScreen2(false);
    }

    return (
        <section className="h-screen relative flex items-center justify-center">
            {
                screen4 ? <img className="absolute w-full h-full object-cover" src={background2} alt="" /> :
                    <img className="absolute w-full h-full object-cover" src={background} alt="" />
            }
            {
                screen4 ? null : <img className="absolute w-full h-full object-contain" src={globos} alt="" />
            }

            {
                screen1 && <First onBegin={setThirdPrice} />
            }
            {
                screen2 && <Second premioNo={premio} onTimeUp={setGanadorScreen} />
            }
            {
                screen3 && <Third onArrowClick={handleArrowClick} arrow premio={premio} nombrePremio={premioNombre} numeroPremio={premioNumber} ganadorNombre={ganadorNombre} setPremio={setPremio} setThirdPrice={setThirdPrice} setResumenScreen={setResumenScreen} ganadorId={ganadorId} nombreSuplente={nombreSuplente} />
            }
            {
                screen4 && <Forth primerGanador={primerGanador?.playerName} segundoGanador={segundoGanador?.playerName} tercerGanador={tercerGanador?.playerName} />
            }
        </section>
    )
}

export default Home
