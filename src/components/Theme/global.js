/** @format */

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.textPrimary};
        transition: all 0.25s linear;
    }
    .input__span {
        background: ${({ theme }) => theme.body};
    }
    input {
        background: ${({ theme }) => theme.bodyLight};
        color: ${({ theme }) => theme.textPrimary};
        border: 1px solid ${({ theme }) => theme.blank};
    }
    input:focus {
        border: 1px solid ${({ theme }) => theme.textSecondary};
    }
    .btn-primary {
        background: ${({ theme }) => theme.textSecondary};
        opacity: .9;
        color: ${({ theme }) => theme.textLight};
    }
    .btn-primary:focus, .btn-primary:hover {
        opacity: 1;
    }    
    .shadow {
        box-shadow: .1px .1px 5px .5px ${({ theme }) => theme.textSecondary};
    }
    .hero-description {
        color: ${({ theme }) => theme.textSecondary};
    }
    a {
        color: ${({ theme }) => theme.textPrimary};
    }
`;
