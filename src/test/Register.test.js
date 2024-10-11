import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from "../pages/register"; 


jest.mock('../assets/illustration.png', () => 'test-file-stub');

describe("Register Component", () => {
    beforeEach(() => {
        render(<Register />);
    });

    test("renders register form", () => {
    
        expect(screen.getByPlaceholderText("-- Enter your name --")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("-- Enter Email address --")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("-- Enter your password --")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("-- Enter your phone number --")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("-- Enter your address --")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

});
