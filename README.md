# 🎭 Playwright Framework Template

Welcome to the **Playwright Framework Template** — a comprehensive test automation framework built using **Microsoft Playwright** with TypeScript that provides structure, reusable utilities, optimized Page Object Model (POM) practices, and advanced test reporting.

This framework serves as a foundation for end-to-end automation across web applications and can be easily adapted to your own projects.

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Test Framework](https://img.shields.io/badge/Test%20Framework-Playwright-purple)

![GitHub repo size](https://img.shields.io/github/repo-size/MdTajwarAliRumman/Playwright-Framework-Template)
![GitHub stars](https://img.shields.io/github/stars/MdTajwarAliRumman/Playwright-Framework-Template?style=social)

---

## 🚀 Overview

This repository contains a robust and extensible Playwright test automation framework template. It includes:

- A **scalable folder structure** with Page Object Model (POM) design.
- **Reusable utilities and helpers** for efficient test implementation.
- Built-in support for **detailed test reporting**, screenshots, logs, traces, and more.
- A clear, structured approach for writing, executing, and analyzing test cases.
- Maintainable code and configurations for different environments.

---

## 📁 Key Features

✨ **Core Framework Capabilities**
- Cross-browser automation (Chromium, Firefox, WebKit, etc.)
- Page Object Model (POM) design for clean tests
- Support for test fixtures, custom helpers, and utilities
- Detailed reports with screenshots and traces after test execution
- Structured test case management to follow best practices
- Environment configuration via `.env` file

📊 **Reporting & Results**
- HTML reports with rich information about test runs
- Screenshots captured on failure for faster debugging
- Playwright trace support to analyze test execution step-by-step
- JSON test results that can be used for CI reporting

🧰 **Tech & Tools Used**
- **Playwright** – automated cross-browser testing
- **TypeScript** – static typing and safer code
- **Allure / HTML Reporter** – test execution reporting
- Configuration and CLI support for flexible test execution
- Dotenv support for environment variables


---

## 📊 Playwright & Allure Test Reports
![Allure Report](https://img.shields.io/badge/Report-Allure-orange)
<img width="1915" height="839" alt="Image" src="https://github.com/user-attachments/assets/8db76644-0814-4d1a-8998-a11075604f72" />
<img width="1517" height="943" alt="Image" src="https://github.com/user-attachments/assets/05b29df4-ed1c-427a-a86b-2e6c98882911" />
<img width="1906" height="923" alt="Image" src="https://github.com/user-attachments/assets/d1079484-d367-4498-8385-703485be5937" />
<img width="1899" height="934" alt="Image" src="https://github.com/user-attachments/assets/c6ef6ac6-c96d-4588-bbd7-f46d9bbdb116" />
<img width="1911" height="941" alt="Image" src="https://github.com/user-attachments/assets/c9a7d74a-8bd6-43d8-a911-4b754cdc1a33" />
<img width="1915" height="923" alt="Image" src="https://github.com/user-attachments/assets/860ea291-9a08-4ff4-8694-75ce4796d047" />

<details>
  <summary>Click to view Playwright Report</summary>
<img width="999" height="888" alt="Image" src="https://github.com/user-attachments/assets/a794e754-1e51-4fb9-b46c-75ee380fc21d" />
<img width="998" height="840" alt="Image" src="https://github.com/user-attachments/assets/4e4d2453-9e1d-45ce-9308-8bdfd8784532" />
<img width="995" height="929" alt="Image" src="https://github.com/user-attachments/assets/0263f2d5-b6cf-48ee-97f8-210dc1b78083" />
<img width="1000" height="866" alt="Image" src="https://github.com/user-attachments/assets/c972e9c8-7b4c-43cb-aa3c-68c4aa37cfc5" />

  
![CI](https://github.com/MdTajwarAliRumman/Playwright-Framework-Template/actions/workflows/playwright.yml/badge.svg)

<img width="994" height="883" alt="Image" src="https://github.com/user-attachments/assets/871e0216-c801-4eb4-a9d0-ecb6642d4cc6" />
<img width="993" height="903" alt="Image" src="https://github.com/user-attachments/assets/22033199-5866-45d9-99ef-9b3d1f326197" />
<img width="1003" height="932" alt="Image" src="https://github.com/user-attachments/assets/d939b966-a51e-44ee-aa57-ae4387c58f2c" />
<img width="1009" height="907" alt="Image" src="https://github.com/user-attachments/assets/a02213fa-3012-423f-aa0b-0465553e25cc" />
  
</details>

---

## 🏗️ Repository Structure

```plaintext
Playwright-Framework-Template/
├── .github/workflows/         # GitHub CI/CD pipelines
├── allure-report/             # Generated test reports
├── allure-results/            # Raw results for Allure
├── screenshots/               # Screenshots captured during tests
├── src/
│   ├── pages/                 # Page Objects for UI elements
│   ├── utils/                 # Helpers and utilities
│   └── tests/                 # Test files
├── test-data/                 # JSON test data files
├── .env                       # Environment variables
├── package.json               # Node dependencies and scripts
├── playwright.config.ts       # Playwright config
└── README.md                  # This README
```

---

## 📈 Quick Start

### 🔧 Install Dependencies

#### 1. Clone the repository
```bash
git clone https://github.com/MdTajwarAliRumman/Playwright-Framework-Template.git
cd Playwright-Framework-Template

```
#### 2. Install dependencies
```bash
npm install

```
#### 3. Install browsers for Playwright
```bash
npx playwright install

```

### ▶️ Running Tests

#### 1. Run All Tests
```bash
npx playwright test

```
#### 2. View HTML Reports
After running tests, generate or serve the report:
```bash
npx playwright show-report

```
---

## 📋 Allure Report

### 🔧 Install Dependencies

```bash
1️⃣ Install allure-playwright (THIS IS REQUIRED) 
 -> npm install --save-dev allure-playwright

2️⃣ Ensure Allure CLI is installed (Optional but recommended)
 -> npm install -g allure-commandline
    allure --version (for checking)

3️⃣ Check your playwright.config.ts 
 -> import { defineConfig } from '@playwright/test';
    export default defineConfig({
    reporter: [
        ['list'],
        ['allure-playwright']
    ],
    });

4️⃣ Run tests again 
 -> npx playwright test ....(Write the Path)

5️⃣ Generate & open Allure report ->
 -> allure generate allure-results --clean
    allure open


```
---
## 👨‍💻 Contributor
**SQA Engineer:** Md. Tajwar Ali
