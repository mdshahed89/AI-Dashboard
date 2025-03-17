# Project Name

SuperCar Virtual Sales Assistant

## Prerequisites

- Docker and Docker Compose installed (for Docker setup)
- Node.js and npm installed (for non-Docker setup)

## Running the Project

### Using Docker (Recommended)

1. **Build and start the Docker container**:
   ```bash
   docker-compose -f docker-compose-dev.yml up --build

Open your browser and navigate to:

http://localhost:3000
To stop the container, press Ctrl+C or run:

docker-compose -f docker-compose-dev.yml down



Without Docker
If you are unable to use Docker, you can run the project locally using Node.js.

Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the development server:
npm run dev
Open your browser and navigate to:

http://localhost:3000


