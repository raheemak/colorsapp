import Header from "./Header"
import { render, screen } from "@testing-library/react"
import React from 'react';
import '@testing-library/jest-dom'

describe("Header Component", () => {
    test("renders title to header ", () => {
        render(<Header />);
        var headerTitle = "COLORSAPP"

        for (var i = 0; i < headerTitle.length; i++) {
            const textElement = screen.getAllByText(headerTitle[i])[0];
            expect(textElement).toBeInTheDocument();
        }
    });
})