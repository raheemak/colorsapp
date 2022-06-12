import SearchByColorForm from "./SearchByColorForm"
import { render, screen, waitFor, act } from "@testing-library/react"
import '@testing-library/jest-dom'
import React from 'react';
describe("SearchByColorFormComponent", () => {
    test("renders form", async () => {

        //mock fetch (api call to retrieve colors)
        window.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                colors: ["red", "blue", "green"]
            })
        }))


        render(<SearchByColorForm/>);

        //check that form items render
        const title = screen.getByText("Select a color. Select none to view all users.")
        const colorInput = screen.getAllByText("Color")[0]
        
        expect(title).toBeInTheDocument();
        expect(colorInput).toBeInTheDocument();

    });

})