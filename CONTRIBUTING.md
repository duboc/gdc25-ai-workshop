# Contributing to AI-Powered App Review Analysis Workshop

Thank you for your interest in contributing to the AI-Powered App Review Analysis Workshop! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
  - [Python Code Style](#python-code-style)
  - [JavaScript/React Code Style](#javascriptreact-code-style)
  - [Commit Messages](#commit-messages)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment as described in the [Development Setup](#development-setup) section
4. Create a new branch for your contribution
5. Make your changes
6. Test your changes
7. Submit a pull request

## How to Contribute

### Reporting Bugs

If you find a bug, please report it by creating an issue on GitHub. When filing an issue, make sure to answer these questions:

- What version of the project are you using?
- What operating system and processor architecture are you using?
- What did you do?
- What did you expect to see?
- What did you see instead?

### Suggesting Enhancements

If you have an idea for a new feature or an enhancement to an existing feature, please create an issue on GitHub. Provide as much detail as possible about your suggestion, including:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Any relevant examples or mockups
- An explanation of why this enhancement would be useful

### Pull Requests

1. Update the README.md with details of changes to the interface, if applicable
2. Update the documentation with details of any changes, if applicable
3. The PR should work for Python 3.8+ and Node.js 14+
4. Ensure all tests pass
5. Make sure your code follows the style guidelines

## Development Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+
- Git

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/duboc/gdc25-ai-workshop.git
   cd gdc25-ai-workshop
   ```

2. Set up the API service:
   ```bash
   cd api-play
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the UI application:
   ```bash
   cd ../ui-play
   npm install
   ```

4. Start both services:
   ```bash
   cd ..
   ./start_apps.sh
   ```

## Style Guidelines

### Python Code Style

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use docstrings for all functions, classes, and modules
- Use type hints where appropriate
- Use meaningful variable and function names

### JavaScript/React Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features where appropriate
- Use JSDoc comments for functions and components
- Use meaningful variable and function names
- Use functional components with hooks for React components

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Project Structure

The project is organized into two main components:

1. **API Service (`api-play/`)**: A Python Flask API that fetches reviews from the Google Play Store
   - `app.py`: Main application file
   - `requirements.txt`: Python dependencies
   - `docs/`: API documentation
   - `deploy.sh`: Deployment script for Google Cloud Run

2. **UI Application (`ui-play/`)**: A React-based web interface
   - `src/`: Source code
     - `components/`: React components
     - `contexts/`: React context providers
     - `config/`: Configuration files
     - `data/`: Data files
     - `styles/`: CSS stylesheets
   - `public/`: Static assets
   - `package.json`: Node.js dependencies
   - `deploy-to-cloud-run.sh`: Deployment script for Google Cloud Run

## Testing

- Write tests for all new features and bug fixes
- Run tests before submitting a pull request
- Ensure all tests pass

### Running Tests

For the API service:
```bash
cd api-play
pytest
```

For the UI application:
```bash
cd ui-play
npm test
```

## Documentation

- Update documentation for all new features and changes
- Use clear and concise language
- Include examples where appropriate
- Keep the README.md up to date

## Community

- Join the discussion on [GitHub Discussions](https://github.com/duboc/gdc25-ai-workshop/discussions)
- Follow the project on Twitter: [@GDC25AIWorkshop](https://twitter.com/GDC25AIWorkshop)
- Attend community meetings (schedule TBD)

Thank you for contributing to the AI-Powered App Review Analysis Workshop!
