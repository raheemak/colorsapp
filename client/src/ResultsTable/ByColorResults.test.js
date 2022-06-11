import ByColorResults from "./ByColorResults"
import { render, screen } from "@testing-library/react"
import React from 'react';
import '@testing-library/jest-dom'

describe("ByColorResults Component", () => {
    test("renders title to header ", () => {
        render(<ByColorResults />);
      
    });
})