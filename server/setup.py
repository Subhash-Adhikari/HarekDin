import os
import subprocess
import sys

def run_command(command):
    print(f"Running: {command}")
    process = subprocess.Popen(command, shell=True)
    process.wait()
    if process.returncode != 0:
        print(f"Command failed with exit code {process.returncode}")
        sys.exit(1)

def main():
    print("Setting up Django backend...")
    
    # Check if virtual environment exists
    if not os.path.exists("venv"):
        print("Creating virtual environment...")
        run_command("python -m venv venv")
    
    # Activate virtual environment and install dependencies
    if os.name == 'nt':  # Windows
        activate_cmd = "venv\\Scripts\\activate"
        pip_cmd = "venv\\Scripts\\pip"
    else:  # Unix/Linux/Mac
        activate_cmd = "source venv/bin/activate"
        pip_cmd = "venv/bin/pip"
    
    print("Installing dependencies...")
    run_command(f"{pip_cmd} install -r requirements.txt")
    
    # Run migrations
    print("Running migrations...")
    run_command(f"{pip_cmd} install django")
    run_command("python manage.py makemigrations")
    run_command("python manage.py migrate")
    
    print("\nSetup completed successfully!")
    print("\nTo start the server, run:")
    print("python manage.py runserver")
    print("\nTo create a superuser, run:")
    print("python manage.py createsuperuser")

if __name__ == "__main__":
    main()