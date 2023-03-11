import React, {FC, useEffect, useState} from 'react';
import './MockComponent.css';

interface MockComponentProps {
}

const MockComponent: FC<MockComponentProps> = () => {
    const [number, setNumber]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0)

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        console.log("rendering whole page")
    }, []);
    const increaseState = () => {
        setNumber((n: number) => {
            n = n + 1
            return n
        })
    }
    return <div className="MockComponent" data-testid="MockComponent">
        <h1>Si ve este texto es por que el servicio frontend esta funcionando</h1>
        <br/>
        <div className="MockText">
            <p>
                MockComponent Template con una variable de entorno que viene de archivo .env igual a:
                &nbsp;
                <mark data-testid="SomeEnv">{process.env.VITE_SOME_KEY}</mark>
            </p>
        </div>
        <br/>
        <div className="ButtonFeature">
            <button onClick={increaseState} className="MockButton" data-testid="button">Incrementar numero</button>
            <br/>
            <br/>
            <span className="IncreasingNumber" data-testid="numb">{number}</span>
        </div>

    </div>
};

export default MockComponent;
