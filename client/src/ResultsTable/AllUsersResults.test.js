import AllUsersResults from "./AllUsersResults"
import { render, screen } from "@testing-library/react"
import React from 'react';
import '@testing-library/jest-dom'

describe("AllUsersResults Component", () => {
    test("table renders ", () => {
       
        //mock fetch (api call to retrieve data)
        window.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                blue: [{Group1: ['Arya']}, {Group2: ['Raheema']}], green: [{Group1: ['Bob']}, {Group2: ['Dylan']}]
            })
        }))

        render(<AllUsersResults />);

        const usernameLabel = screen.getByText("User Name")
        const colorLabel = screen.getByText("Color")
        expect(usernameLabel).toBeInTheDocument();
        expect(colorLabel).toBeInTheDocument();

    });
})