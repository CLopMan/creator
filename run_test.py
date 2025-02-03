import json
import sys
import os
import subprocess

arch_path = "./architecture/"
test_dir = "./test/riscv-vext/correct/"  # Cambia esto si los archivos están en otro directorio

# def execute_test(test_name, architecture="RISC_V_RV32IMFD_VExtenssion.json"):
#     command = ["./creator.sh", "-a", architecture, "-s", test_name]
#     result = subprocess.run(command, capture_output=True, text=True)
#     return result.stdout if result.returncode == 0 else result.stderr

def execute_test(test_name, architecture="RISC_V_RV32IMFD_VExtenssion.json", log_dir="vecLogs"):
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, f"{test_name}.log")

    with open(log_file, "w") as log:
        command = ["./creator.sh", "-a", f"{arch_path}{architecture}", "-s", f"{test_dir}{test_name}"]
        subprocess.run(command, stdout=log, stderr=log, text=True)
    
    return log_file




def run_tests(test_number=None):
    test_prefix = "test_example_"
    test_extension = ".s"

    if test_number is None:
        # Ejecutar todos los tests
        for i in range(1, 11):
            execute_test(f"{test_prefix}{i:03}{test_extension}")
    else:
        # Ejecutar solo un test específico
        test_file = f"{test_prefix}{int(test_number):03}{test_extension}"
        if os.path.exists(os.path.join(test_dir, test_file)):
            execute_test(f"{test_file}")
        else:
            print(f"Error: El archivo {test_file} no existe.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_tests(sys.argv[1])  # Ejecutar un test específico
    else:
        run_tests()  # Ejecutar todos los tests
