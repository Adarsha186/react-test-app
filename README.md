# React Testing Mini Project

## At a high level
This project is a small React application created to explore basic form validation, unit testing using React Testing Library and Jest, and a simple CI/CD pipeline using GitHub Actions.  
It includes test cases written in JIRA format, a test execution report, and an automated workflow that runs tests and builds the project on every push.

---

## Features

### Form Validation
- Required field validation  
- Name length validation  
- Alphabet-only name check  
- Email format validation  
- Password length validation  
- Success and failure API flows  

### Testing
The project uses *Jest* and *React Testing Library* to test:
- Missing fields  
- Invalid name  
- Invalid characters  
- Invalid email  
- Weak password  
- Successful API response  
- Loading state  

The test cases follow a structured format (TC-01, TC-02, etc.) and are also documented in [JIRA](https://yemparalaadarsha.atlassian.net/browse/TDTLM-1).

### CI/CD Pipeline
A GitHub Actions workflow is included to:
- Install dependencies  
- Run tests  
- Generate coverage  
- Build the React application  
- Upload build artifacts
