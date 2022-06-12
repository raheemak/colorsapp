import ByColorResults from "./ByColorResults"
import { render, screen } from "@testing-library/react"
import React from 'react';
import '@testing-library/jest-dom'

describe("ByColorResults Component", () => {
    test("renders tabel ", () => {
      
         //mock fetch (api call to retrieve data)
         window.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                groups: {"Group1": ["Raheema", "Bob"], "Group2": ["Dylan", "Cooper"]}
            })

        }))
        render(<ByColorResults />);

        const usernameLabel = screen.getByText("User Name")
        const groupnameLabel = screen.getByText("Group Name")
        expect(usernameLabel).toBeInTheDocument();
        expect(groupnameLabel).toBeInTheDocument();


    });
})