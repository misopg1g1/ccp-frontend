import React from 'react';
import {fireEvent, render, screen, getByTestId} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockComponent from './MockComponent';


describe('<MockComponent />', () => {
    test('it should mount', () => {
        render(<MockComponent/>);
        const mockComponent = screen.getByTestId('MockComponent');
        const someEnv = screen.getByTestId('SomeEnv');
        const button = screen.getByTestId('button');
        let numb = screen.getByTestId('numb');
        expect(mockComponent).toBeInTheDocument();
        expect(someEnv.innerHTML).toEqual(process.env.VITE_SOME_KEY)
        expect(numb.innerHTML).toBe("0")
        fireEvent.click(button)
        expect(numb.innerHTML).toBe("1")

    });

});