# Simple Weather Forecast web app. Test task for Reyo Media Cyprus.

This repository contains the **Simple Weather Forecast** test project.  
It is configured to be **easily set up and run** on any local environment using **Docker** and **Docker Compose**.

## **How to Initialize the Project** (First-time setup)

To get the project up and running on your local machine, follow these steps:

### **1. Clone the Repository**
Clone this repository to your local machine:
```sh
git clone https://github.com/makaronnik/weather.git <path_to_cloned_repository>
```

### **2. Navigate to the Project Directory**
Change into the root directory of the project:
```sh
cd <path_to_cloned_repository>
```

### **3. Run the Setup Script**
The **`setup.sh`** script initializes the project by:
- Checking for **Docker** and **Docker Compose** dependencies.
- Checking for **port conflicts** (80, 5173, 24678, 3306, 6379).
- Copying `.env.local → .env` (if `.env.local` exists).
- Building and starting **Docker containers**.
- Installing **backend dependencies** via `composer install`.
- Running **database migrations**.
- Installing and building **frontend assets** via `npm install` and `npm run build`.

Run:
```sh
./setup.sh
```

### **4. Verify the Setup**
Once the script completes, open your web browser and navigate to:  
🔗 **[http://localhost](http://localhost)** (Laravel backend)

---

## **How to Start the Project Again** (If it's already set up)

Once the project is **fully initialized**, you can use the **`run.sh`** script for **quick startup**.  
This script:
- Checks dependencies (Docker, Docker Compose).
- Verifies port availability.
- Starts the project without rebuilding or reinstalling dependencies.

Run:
```sh
./run.sh
```
After execution, you can open the project at:  
🔗 **[http://localhost](http://localhost)**

---

## **How to Start Development Mode** (With Hot Reloading)

For development mode, use the **`dev.sh`** script.  
This script:
- Starts all necessary services in **Docker**.
- Runs `npm run dev` to enable **Vite's hot module replacement (HMR)**.
- Opens an interactive **shell inside the PHP container**, so you can run Artisan commands.

Run:
```sh
./dev.sh
```

### **What you get in Development Mode**
- **Laravel Backend** → 🔗 **[http://localhost](http://localhost)**
- **Vite HMR (Frontend Hot Reloading)** → 🔗 **[http://localhost:5173](http://localhost:5173)**
- **Vite WebSocket for HMR** → `http://localhost:24678`
- **Interactive Shell inside PHP container** (for Artisan commands)

---

## **Stopping and Removing Containers**
If you need to **stop** the project and remove all containers:
```sh
docker compose down
```
or
```sh
docker-compose down
```
Or, to remove **containers + volumes + networks**:
```sh
docker compose down -v --remove-orphans
```
or
```sh
docker-compose down -v --remove-orphans
```

---

## **Troubleshooting**
1️⃣ **Port already in use?**  
Run:
```sh
sudo lsof -i :80   # Check what is using port 80
sudo kill -9 <PID> # Replace <PID> with the process ID
```

2️⃣ **Containers not starting?**  
Check logs:
```sh
docker compose logs -f
```
or
```sh
docker-compose logs -f
```

3️⃣ **Need to run an Artisan command?**  
Enter the PHP container:
```sh
docker compose exec php bash
```
or
```sh
docker-compose exec php bash
```
Then, for example:
```sh
php artisan migrate
```
