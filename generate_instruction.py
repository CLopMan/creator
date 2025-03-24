import sys
file_name = "vluxsegeg"
ext = "ins"
opcode = "0000111"

nf = [_ for _ in range(1, 9, 1)]
eew = [2**i for i in range(3, 7)]

enum_fields = {
    "nf" : nf,
    "eew": eew
}

field = """
    {{
      "name": "{}",
      "type": "{}",
      "startbit": {},
      "stopbit": {}
    }}"""

instruction = """
{{
  "name": "{}",
  "type": "{}",
  "signature_definition": "{}",
  "signature": "{}",
  "signatureRaw": "{}",
  "co": "{}",
  "cop": "000",
  "nwords": 1,
  "clk_cycles": 1,
  "fields": [{}],
  "definition": "{}",
  "separated": [false,false,false,false,false,false],
  "help": ""
}},"""


#################### AUX FUNCTIONS ####################
def count_lines_in_file(filename):
    """
    Counts the number of lines in a given file.
    
    Args:
    - filename (str): The path to the file.
    
    Returns:
    - int: The number of lines in the file.
    """
    try:
        with open(filename, 'r') as file:
            # Count the number of lines
            line_count = sum(1 for line in file)
        return line_count
    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None


def unify_lines(text):
    """
    Unifies lines of a given string by joining them with a single space.
    Blank lines are ignored.
    """
    lines = text.strip().splitlines()
    unified_text = '\\n'.join(line.strip() for line in lines if line.strip())
    return unified_text

#################### ############# ####################

#################### content funct ####################

def add_fields(name, m):
    fields = f"""
        {field.format(name,"co", 6, 0 )},
        {field.format("vs3", "VEC-Reg", 11, 7)},
        {field.format("rs1", "INT-Reg", 19, 15)},
        {field.format("vs2", "VEC-Reg", 24, 20)}{f',\n{field.format("vm", "VEC-Reg", 25, 25)}' if len(m) > 0 else ''}

    """
    return fields

def add_code(nfi, eew, m):
    code_unmask = f"""
        let nf = {nfi};
        let base_reg = crex_findReg(vs3_name);
        for (let i = 0; i < nf; ++i) {{
            let curr_reg = readRegister(base_reg.indexComp, base_reg.indexElem + i);
            vectorIndexLoad(vs3, vs2, rs1 + i*{eew//8}, {eew}, vl);
        }}
    """

    code_masked = f"""
        let nf = {nfi};
        let base_reg = crex_findReg(vs3_name);
        let mask = extractMaskFromV0(checkVl());
        for (let i = 0; i < nf; ++i) {{
            let curr_reg = readRegister(base_reg.indexComp, base_reg.indexElem + i);
            vectorIndexLoad(vs3, vs2, rs1 + i*{eew//8}, {eew}, vl, mask);

        }}
    """ 

    if len(m) > 0:
        return unify_lines(code_masked)
    else:
        return unify_lines(code_unmask)

#################### ############# ####################

#################### PROGRAM ##### ####################
structure = "vluxseg{}ei{}.v vs3 (rs1) vs2{}"
ins_counter = 0
with open(f"{file_name}.{ext}", "w") as fd:
    for m in [" v0.t", ""]:
        for nfi in nf:
            for eewi in eew:
                    sigRaw = structure.format(nfi, eewi, m) 
                    sig_list = sigRaw.split()
                    name = sig_list[0]
                    fields = add_fields(name, m)
                    fd.write(
                        instruction.format(
                            name,
                            f"Memory Instruction{" Masked" if len(m) > 0 else ""}",
                            f"{f" ".join([(f"F{i}" if sig_list[i][0] != '(' else f"(F{i})") for i in range(len(sig_list) - (1 if len(m) else 0))])}{m}",
                            f"{name},VEC-Reg,(INT-Reg),VEC-Reg{',' if len(m) >0 else ''}{m[1:]}",
                            f"{sigRaw}",
                            opcode,
                            fields,
                            add_code(nfi, eewi, m)
                        )
                    )
                    ins_counter += 1
#################### ##### ####################

#################### INFO ##### ####################
print(f"Generated {ins_counter} instructions")
print(f"writed {count_lines_in_file(f"{file_name}.{ext}")} lines in {file_name}.{ext}")






#args_str = """
#    - xi : int register
#    - fi : float register
#    - vi : vec register
#    - [args] : optional field
#"""
#
#
#
#
#def generate_instruction(ins: list):
#    print("generating", ins)
#
#    # name 
#    name = ""
#    field = ""
#    _ = 0
#    while _ < (len(ins[0])):
#        c = name[_]
#        if c == '<':
#            while c != '>':
#                field += c
#                _ += 1
#
#
#def main():
#    if (len(sys.argv)) < 2:
#        print("This is a python script for generating basic creator vector instruction schematic. It aims to facilitate architecture description.")
#        print("ussage: python generate_instruction.py ^ <ins_name> args $")
#        print("args can be:", args_str)
#        exit()
#    structure = sys.argv
#
#    i,j = 1, len(structure) - 1
#    i_ack, j_ack = False, False
#    while not(i > len(structure) or j < 0):
#        if structure[i] == '^':
#            i_ack = True
#        else:
#            i += 1
#
#        if structure[j] == '$':
#            j_ack = True
#        else:
#            j -= 1
#        
#        if i_ack and j_ack:
#            break
#    if not(i_ack and j_ack):
#        print("structure not good")
#        exit()
#    
#
#    
#    generate_instruction(structure[i+1:j])
#
#    