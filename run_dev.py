import os
import subprocess
import sys
import threading
import time

def run_command(command, cwd=None):
    process = subprocess.Popen(command, shell=True, cwd=cwd)
    return process

def run_backend():
    os.chdir('server')
    print("Starting Django backend server...")
    return run_command("python manage.py runserver")

def run_frontend():
    os.chdir('client')
    print("Starting React frontend server...")
    return run_command("npm run dev")

def main():
    # Store the original directory
    original_dir = os.getcwd()
    
    try:
        # Start backend server
        os.chdir(original_dir)
        backend_process = run_backend()
        
        # Wait a bit for backend to start
        time.sleep(2)
        
        # Start frontend server
        os.chdir(original_dir)
        frontend_process = run_frontend()
        
        print("\nDevelopment servers are running!")
        print("Backend: http://localhost:8000")
        print("Frontend: http://localhost:5173")
        print("\nPress Ctrl+C to stop both servers...")
        
        # Keep the script running until Ctrl+C
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nStopping servers...")
            backend_process.terminate()
            frontend_process.terminate()
            print("Servers stopped.")
    
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
    
    finally:
        # Return to the original directory
        os.chdir(original_dir)

if __name__ == "__main__":
    main()