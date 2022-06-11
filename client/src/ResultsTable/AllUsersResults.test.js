import AllUsersResults from "./AllUsersResults"
import { render, screen } from "@testing-library/react"
import React from 'react';
import '@testing-library/jest-dom'

describe("AllUsersResults Component", () => {
    test("renders title to header ", () => {
        render(<AllUsersResults />);
      
    });
})