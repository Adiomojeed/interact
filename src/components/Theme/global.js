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
    input {
        background: ${({ theme }) => theme.bodyLight};
        color: ${({ theme }) => theme.textPrimary};
        border: 1px solid ${({ theme }) => theme.blank};
    }
    input:focus {
        border: 1px solid ${({ theme }) => theme.textSecondary};
    }
    .btn-primary, .bodys button {
        background: ${({ theme }) => theme.textSecondary};
        opacity: .9;
        color: ${({ theme }) => theme.textLight};
    }
    .btn-primary:focus, .btn-primary:hover, .bodys button:hover {
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
    .avatar {
        background: ${({ theme }) => theme.textLight};
        border: 1px solid ${({ theme }) => theme.textPrimary};
    }
    .nav-text, .sign-out {
        background: ${({ theme }) => theme.textSecondary};
        color: ${({ theme }) => theme.textLight};
        border: 1px solid ${({ theme }) => theme.textLight};
    }
    .nav-text:hover, .sign-out:hover {
        background: ${({ theme }) => theme.light};
        color: ${({ theme }) => theme.textSecondary};
        border: 1px solid ${({ theme }) => theme.textSecondary};
    }
    .siderow {
        background: ${({ theme }) => theme.body};
    }
    .headers {
        color: ${({ theme }) => theme.dark};
    }
    .nav {
        color: ${({ theme }) => theme.textSecondary};
    }
    @media screen and (min-width: 992px) {
        .siderow {
            background: transparent;
        }
    }
`;
