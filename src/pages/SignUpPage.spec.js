import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
// import ReactLoading from 'react-loading';


describe("Sign Up Page", () => {
    describe("Layout", () => {
        test("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });

        test("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("username")
            expect(input).toBeInTheDocument();
        });

        test("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("email");
            expect(input).toBeInTheDocument();
        });

        test("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("password");
            expect(input).toBeInTheDocument();
        });
        test("has password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("password");
            expect(input.type).toBe("password");
        });

        test("has confirm password input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("confirm password");
            expect(input).toBeInTheDocument();
        });
        test("has confirm password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByPlaceholderText("confirm password");
            expect(input.type).toBe("password");
        });

        test("has Sign Up button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });

        test("disables the button initially", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });


    describe("interactions with layout", () => {
        test("enables the button when password and confirm password fields have the same value", () => {
            render(<SignUpPage />);
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled();
        });

        test("sends username and password to backend after clicking the button", () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByPlaceholderText("username");
            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");

            userEvent.type(usernameInput, "Maxwell Agyei");
            userEvent.type(emailInput, "max@test.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });

            const mockFn = jest.fn();
            axios.post = mockFn;

            userEvent.click(button);

            const firstCallOfMockFunction = mockFn.mock.calls[0]
            const body = firstCallOfMockFunction[1];
            expect(body).toEqual({
                username: "Maxwell Agyei",
                email: "max@test.com",
                password: "Password",
            })
        });

        test("disables button after sign up is pressed to prevent multiple request", () => {
            // let counter = 0;

            render(<SignUpPage />);
            const usernameInput = screen.getByPlaceholderText("username");
            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");

            userEvent.type(usernameInput, "Maxwell Agyei");
            userEvent.type(emailInput, "max@test.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });

            const mockFn = jest.fn();
            axios.post = mockFn;
            userEvent.click(button);
            expect(button).toBeDisabled();

        });

        test("displays loader after clicking the button", () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByPlaceholderText("username");
            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");

            userEvent.type(usernameInput, "Maxwell Agyei");
            userEvent.type(emailInput, "max@test.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", { name: "Sign Up" });

            const mockFn = jest.fn();
            axios.post = mockFn;
            userEvent.click(button);

            const loader = screen.getByRole("loading")
            expect(loader).toBeInTheDocument()
        });
    })

    describe("form validation", () => {
        test("username validation", () => {
            render(<SignUpPage />);

            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");
                        
            userEvent.type(emailInput, "max@test.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", {name: "Sign Up"});

            userEvent.click(button);
            expect(screen.getByText("please enter a valid username")).toBeInTheDocument()
        })

        test("email validation", () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByPlaceholderText("username")
            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");
            
            userEvent.type(usernameInput, "Maxwell");
            userEvent.type(emailInput, "not valid");
            userEvent.type(passwordInput, "Password");
            userEvent.type(confirmPasswordInput, "Password");
            const button = screen.queryByRole("button", {name: "Sign Up"});

            userEvent.click(button);
            expect(screen.getByText("please use a valid email address")).toBeInTheDocument()
        })

        test("password validation", () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByPlaceholderText("username")
            const emailInput = screen.getByPlaceholderText("email");
            const passwordInput = screen.getByPlaceholderText("password");
            const confirmPasswordInput = screen.getByPlaceholderText("confirm password");
            
            userEvent.type(usernameInput, "Maxwell");
            userEvent.type(emailInput, "max@test.com");
            userEvent.type(passwordInput, "1 2");
            userEvent.type(confirmPasswordInput, "1 2");
            const button = screen.queryByRole("button", {name: "Sign Up"});

            userEvent.click(button);
            expect(screen.getByText("password must be at least 6 characters")).toBeInTheDocument()
        })


    });
});
