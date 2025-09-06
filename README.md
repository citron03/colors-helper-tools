# Colors Helper Tools Monorepo

This is the official monorepo for the **Colors Helper Tools** project, managed with pnpm workspaces.

## 🎨 About

This project provides a set of tools to make working with colors easier for developers and designers. It includes a powerful JavaScript library and a handy command-line interface (CLI).

## 📦 Packages

This monorepo contains the following packages:

-   `packages/colors-helper-tools`: The core library and CLI tool for color manipulation, conversion, and generation.
-   `packages/docs`: The documentation website for the project, built with Next.js.

## 🚀 Getting Started

To get started with developing in this monorepo, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/citron03/colors-helper-tools.git
    cd colors-helper-tools
    ```

2.  **Install dependencies:**
    This project uses [pnpm](https://pnpm.io/) as the package manager.
    ```bash
    pnpm install
    ```

3.  **Build the packages:**
    To build the `colors-helper-tools` package:
    ```bash
    pnpm --filter colors-helper-tools build
    ```

4.  **Run tests:**
    ```bash
    pnpm test
    ```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file in the `colors-helper-tools` package for more details.
