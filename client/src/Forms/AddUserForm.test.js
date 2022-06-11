import AddUserForm from "./AddUserForm"
import { render, screen , act} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from 'react';
import '@testing-library/jest-dom'
describe("AddUserForm Component", () => {
    test("renders form", () => {
        render(<AddUserForm />);
        const title = screen.getByText("Enter information below to get started.")
        const usernameInput = screen.getByText("User Name")
        const colorInput = screen.getByText("Color")
        const groupInput = screen.getByText("Group")


        expect(title).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(colorInput).toBeInTheDocument();
        expect(groupInput).toBeInTheDocument();

    });

    test("renders error message if all fields are empty", () => {
        render(<AddUserForm />);

        //click button 
        const buttonElement = screen.getByText("Submit")
        userEvent.click(buttonElement)

        const error = screen.getByText("Please enter required fields.")
        expect(error).toBeInTheDocument();


    });

    test("renders error message if one field is empty and label turns red", () => {
        render(<AddUserForm />);

        //enter text for username and color but not for group
        const usernameInput = screen.getByText("User Name")
        const colorInput = screen.getByText("Color")

        userEvent.type(usernameInput, "RaheemaKadwa")
        userEvent.type(colorInput, "Red")

        //click button 
        const buttonElement = screen.getByText("Submit")
        userEvent.click(buttonElement)

        //check if group input turned red 
        const groupInputStyle = window.getComputedStyle(screen.getByText("Group"))
        expect(groupInputStyle.color).toBe("rgb(211, 47, 47)")

        //check if error message rendered
        const error = screen.getByText("Please enter required fields.")
        expect(error).toBeInTheDocument();


    });

    test("renders success message and card if user submits all fields ", async () => {

        //mock fetch (api call to submit user/group/color)
        window.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                username: "Raheema",
                group: "Group1",
                color: "red"
            })
        }))

        await act( async () => render(<AddUserForm/>));

        //submit form and click button 
        const usernameInput = screen.getByText("User Name")
        const colorInput = screen.getByText("Color")
        const groupInput = screen.getByText("Group")
        userEvent.type(usernameInput, "Raheema")
        userEvent.type(colorInput, "red")
        userEvent.type(groupInput, "Group1")
        const buttonElement = screen.getByText("Submit")
        await act( async () => userEvent.click(buttonElement ));

        //check if card rendered and user added message rendered
        const userAddedMessage = screen.getByText("User added!")
        const userAddedCard = screen.getByText("Added User Information")
        expect(userAddedMessage).toBeInTheDocument();
        expect(userAddedCard).toBeInTheDocument();

    });
})