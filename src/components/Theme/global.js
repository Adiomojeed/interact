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
    .nav {
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
    .avatar, .profile--avatar, .post--avatar {
        background: ${({ theme }) => theme.textLight};
        border: 1px solid ${({ theme }) => theme.bodySecondary};
    }
    .nav-text, .sign-out { 
        color: ${({ theme }) => theme.textSecondary};
        border: 1px solid ${({ theme }) => theme.textSecondary};
    }
    .siderow {
        background: ${({ theme }) => theme.body};
    }
    .headers {
        color: ${({ theme }) => theme.dark};
    }
    .nav, .profile--hero {
        color: ${({ theme }) => theme.textSecondary};
    }
    .test, .sign-out, .btn-edit {
        background: ${({ theme }) => theme.bodyLight};
        color: ${({ theme }) => theme.textPrimary};
        transition: .3s;
        cursor: pointer;
    }
    .btn-edit, .profile--card {
        border-color: ${({ theme }) => theme.textSecondary};
    }
    .details {
        border-bottom: 1px solid ${({ theme }) => theme.textSecondary};
    }
    .sign-out:hover, .test:hover, .btn-edit:hover {
        background: ${({ theme }) => theme.textSecondary};
        color: ${({ theme }) => theme.textLight};
        cursor: pointer;
        transition: .3s;
    }
    .card {
        background: ${({ theme }) => theme.bodySecondary};
    }
    .post--card {
        background: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.bodySecondary};
    }
    @media screen and (min-width: 992px) {
        .siderow {
            background: transparent;
        }
    }
`;
