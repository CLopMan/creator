import json
import sys
import os
import subprocess

arch_path = "./architecture/"
test_dir = "./test/riscv-vext/correct/"  # Cambia esto si los archivos están en otro directorio
RISCV_VEXTENSSION = "RISC_V_RV32IMFD_VExtenssion.json"

tests = [
    {"vlen": 128, "lmulExp": 1, "elen": 64, "sew": 16, "ma": 0, "ta": 0, "vl": 14},# 0 - basic
    {"vlen": 128, "lmulExp": -3, "elen": 64, "sew": 8, "ma": 0, "ta": 0, "vl": 2}, # 1 - lmul frac
    {"vlen": 128, "lmulExp": 0, "elen": 64, "sew": 16, "ma": 0, "ta": 0, "vl": 7}, # 2 - lmul = 0
    {"vlen": 128, "lmulExp": 1, "elen": 64, "sew": 16, "ma": 1, "ta": 0, "vl": 14},# 3 - ma
    {"vlen": 128, "lmulExp": 1, "elen": 64, "sew": 16, "ma": 0, "ta": 1, "vl": 14},# 4 - ta
]

def modify_architecture(params: dict):
    arch = None
    with open(f"{arch_path}{RISCV_VEXTENSSION}", "r") as fd:
        arch = json.load(fd);
    
    arch["vlen"] = params["vlen"];
    arch["lmulExp"] = params["lmulExp"];
    arch["elen"] = params["elen"];
    arch["sew"] = params["sew"];
    arch["ma"] = params["ma"];
    arch["ta"] = params["ta"];
    arch["components"][1]["elements"][4]["value"] = params["vl"];
    
    with open(f"{arch_path}{RISCV_VEXTENSSION}", "w") as fd:
        json.dump(arch, fd, indent=2)
        



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
    # if len(sys.argv) > 1:
    #     run_tests(sys.argv[1])  # Ejecutar un test específico
    # else:
    #     run_tests()  # Ejecutar todos los tests
    modify_architecture(tests[1])