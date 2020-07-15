/*
 *  Copyright 2018-2020 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


/********************
 * Global variables *
 ********************/

/*Architecture editor*/

/*Available architectures*/
var architecture_available = [];
/*New architectures*/
var load_architectures_available = [];
var load_architectures = [];
/*Architectures card background*/
var back_card = [];
/*Load architecture*/
var architecture = {components:[], instructions:[], directives:[], memory_layout:[]};
var architecture_hash = [];
/*Components form select*/
var componentsTypes = [
  { text: 'Integer', value: 'integer' },
  { text: 'Floating point', value: 'floating point' },
  { text: 'Control', value: 'control' },
];
/*Intructions form select*/
var instructionsTypes = [
  { text: 'Arithmetic integer', value: 'Arithmetic integer' },
  { text: 'Arithmetic floating point', value: 'Arithmetic floating point' },
  { text: 'Logic', value: 'Logic' },
  { text: 'Transfer between registers', value: 'Transfer between registers' },
  { text: 'Memory access', value: 'Memory access' },
  { text: 'Comparison', value: 'Comparison' },
  { text: 'I/O', value: 'I/O' },
  { text: 'Syscall', value: 'Syscall' },
  { text: 'Control', value: 'Control' },
  { text: 'Function call', value: 'Function call' },
  { text: 'Conditional bifurcation', value: 'Conditional bifurcation' },
  { text: 'Unconditional bifurcation', value: 'Unconditional bifurcation' },
  { text: 'Other', value: 'Other' },
];
/*Directives form select*/
var actionTypes = [
  { text: 'Data Segment', value: 'data_segment' },
  { text: 'Code Segment', value: 'code_segment' },
  { text: 'Global Symbol', value: 'global_symbol' },
  { text: 'Byte', value: 'byte' },
  { text: 'Half Word', value: 'half_word' },
  { text: 'Word', value: 'word' },
  { text: 'Double Word', value: 'double_word' },
  { text: 'Float', value: 'float' },
  { text: 'Double', value: 'double' },
  { text: 'Space', value: 'space' },
  { text: 'ASCII not finished in null', value: 'ascii_not_null_end' },
  { text: 'ASCII finished in null', value: 'ascii_null_end' },
  { text: 'Align', value: 'align' },
  { text: 'Baling', value: 'baling'},
];


/*Compilator*/

/*Codemirror*/
var textarea_assembly_editor;
/*Assembly code textarea*/
var code_assembly = '';
/*Compilation index*/
var tokenIndex = 0;
/*Instructions memory address*/
var address;
/*Data memory address*/
var data_address;
/*Stack memory address*/
var stack_address;
/*Backup memory address*/
var backup_stack_address;
var backup_data_address;
/*Pending instructions and pending tags*/
var pending_instructions = [];
var pending_tags = [];
/*Global functions*/
var extern = [];
/*Error code messages*/
var compileError = [
  { mess1: "Empty label", mess2: "" },
  { mess1: "Repeated tag: ", mess2: "" },
  { mess1: "Instruction '", mess2: "' not found" },
  { mess1: "Incorrect sintax --> ", mess2: "" },
  { mess1: "Register '", mess2: "' not found" },
  { mess1: "Immediate number '", mess2: "' is too big" },
  { mess1: "Immediate number '", mess2: "' is not valid" },
  { mess1: "Tag '", mess2: "' is not valid" },
  { mess1: "Address '", mess2: "' is too big" },
  { mess1: "Address '", mess2: "' is not valid" },
  { mess1: "This field '", mess2: "' must start with a '('" },
  { mess1: "This field '", mess2: "' must end with a ')'" },
  { mess1: "This field is too small to encode in binary '", mess2: "" },
  { mess1: "This field is too small to encode in binary '", mess2: "" },
  { mess1: "Incorrect pseudoinstruction definition ", mess2: "" },
  { mess1: "Invalid directive: ", mess2: "" },
  { mess1: "Invalid data: ", mess2: " The data must be a number" }, 
  { mess1: 'The string of characters must start with "', mess2: "" }, 
  { mess1: "Number '", mess2: "' is too big" },
  { mess1: "Number '", mess2: "' is empty" },
  { mess1: "The text segment should start with '", mess2: "'" },
  { mess1: "The data must be aligned", mess2: "" },
  { mess1: "The number should be positive '", mess2: "'" },
  { mess1: "Empty directive", mess2: "" },
  { mess1: "After the comma you should go a blank --> ", mess2: "" },
  { mess1: "Incorrect sintax", mess2: "" },
  { mess1: "Syntax error near line: ", mess2: "" },
];
/*Promise*/
let promise;


/*Simulator*/

/*Displayed notifications*/
var notifications = [];
/*Available examples*/
var example_available = [];
/*Execution*/
var executionIndex = 0;
var runExecution = false;
var runProgram = false;
var iter1 = 1;
var executionInit = 1;
/*Keyboard*/
var consoleMutex = false;
var mutexRead = false;
var newExecution = true;
/*Memory*/
var memory_hash = ["data_memory", "instructions_memory", "stack_memory"];
var memory = {data_memory: [], instructions_memory: [], stack_memory: []};
var unallocated_memory = [];
/*Instructions memory*/
var instructions = [];
var instructions_tag = [];
var instructions_binary = [];
/*Data memory*/
var data = [];
var data_tag = [];
/*Binary*/
var code_binary = '';
var update_binary = '';
/*Stats*/
var totalStats = 0;
var stats_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var stats = [
  { type: 'Arithmetic integer', number_instructions: 0, percentage: 0, abbreviation: "AI" },
  { type: 'Arithmetic floating point', number_instructions: 0, percentage: 0, abbreviation: "AFP" },
  { type: 'Logic', number_instructions: 0, percentage: 0, abbreviation: "Log" },
  { type: 'Transfer between registers', number_instructions: 0, percentage: 0, abbreviation: "Trans" },
  { type: 'Memory access', number_instructions: 0, percentage: 0, abbreviation: "Mem" },
  { type: 'Comparison', number_instructions: 0, percentage: 0, abbreviation: "Comp" },
  { type: 'I/O', number_instructions: 0, percentage: 0, abbreviation: "I/O" },
  { type: 'Syscall', number_instructions: 0, percentage: 0, abbreviation: "Sys" },
  { type: 'Control', number_instructions: 0, percentage: 0, abbreviation: "Ctrl" },
  { type: 'Function call', number_instructions: 0, percentage: 0, abbreviation: "FC" },
  { type: 'Conditional bifurcation', number_instructions: 0, percentage: 0, abbreviation: "CB" },
  { type: 'Unconditional bifurcation', number_instructions: 0, percentage: 0, abbreviation: "UB" },
  { type: 'Other', number_instructions: 0, percentage: 0, abbreviation: "Oth" },
];


//
// Load architecture
//

/*String to Bigint number*/
function bigInt_deserialize(object)
{
    var auxObject = object;

    for (var i=0; i<auxObject.components.length; i++)
    {
        var aux = null ;
        var auxBigInt = null ;

        if (auxObject.components[i].type != "floating point")
        {
            for (var j = 0; j < auxObject.components[i].elements.length; j++)
	    {
                 aux = auxObject.components[i].elements[j].value;
                 auxObject.components[i].elements[j].value = bi_intToBigInt(aux,10) ;

                 if (auxObject.components[i].double_precision != true)
	         {
                     aux = auxObject.components[i].elements[j].default_value;
                     auxObject.components[i].elements[j].default_value = bi_intToBigInt(aux,10) ;
                 }
            }
        }
    }

    return auxObject;
}

/*Bigint number to string*/
function bigInt_serialize(object)
{
    var auxObject = jQuery.extend(true, {}, object);

    for (var i=0; i<architecture.components.length; i++)
    {
        if (architecture.components[i].type != "floating point")
  	   {
               for (var j = 0; j < architecture.components[i].elements.length; j++)
	       {
                    var aux = architecture.components[i].elements[j].value;
                    auxObject.components[i].elements[j].value = aux.toString();

                    if (architecture.components[i].double_precision != true)
		    {
                        var aux = architecture.components[i].elements[j].default_value;
                        auxObject.components[i].elements[j].default_value = aux.toString();
                    }
               }
           }
    }

    return auxObject;
}

// Load architecture

function load_arch_select ( cfg )
{
	    var ret = {
                        errorcode: "",
                        token: "",
                        type: "",
                        update: "",
                        status: "ok"
                      } ;

	    var auxArchitecture = cfg;
	    architecture = bigInt_deserialize(auxArchitecture);

	    architecture_hash = [];
	    for (var i = 0; i < architecture.components.length; i++) {
	         architecture_hash.push({name: architecture.components[i].name, index: i});
	    }

	    backup_stack_address = architecture.memory_layout[4].value;
	    backup_data_address  = architecture.memory_layout[3].value;

	    ret.token = "The selected architecture has been loaded correctly";
	    ret.type  = "success";
	    return ret;
}


//
// Console.log
//

var creator_debug = false ;

function console_log ( msg )
{
	if (creator_debug) {
	    console.log(msg) ;
	}
}


//
// Compiler
//

/*Compile assembly code*/
function packCompileError( err_code, err_msg, err_ti, err_bgcolor )
{
  var ret = {} ;

  ret.status     = "error" ;
  ret.errorcode  = err_code ;
  ret.token      = err_msg;
  ret.type       = err_ti;
  ret.bgcolor    = err_bgcolor;
  ret.tokenIndex = tokenIndex ;

  return ret ;
}

/*Places the pointer in the first position*/
function first_token()
{
        // var assembly = textarea_assembly_editor.getValue(); // TODO: interface
        var assembly = code_assembly ;
        var index = tokenIndex;

        while(((assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r') || (assembly.charAt(index) == '#')) && (index < assembly.length)){
          while(((assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r')) && (index < assembly.length)){
            index++;
          }

          if(assembly.charAt(index) == '#'){
            while((assembly.charAt(index) != '\n') && (index < assembly.length)){
              index++;
            }

            while(((assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r')) && (index < assembly.length)){
              index++;
            }
          }
        }

        tokenIndex = index;
}

/*Read token*/
function get_token()
{
        // var assembly = textarea_assembly_editor.getValue(); // TODO: interface
        // TODO: contar el n'umero de '\n' para dar los mensaje de error con la línea (no preguntar a textarea)

        var assembly = code_assembly ;
        var index = tokenIndex;

        if (index >= assembly.length) {
            return null;
        }

        console_log(assembly.charAt(index));
        console_log(index);

        if(assembly.charAt(index) == "'") {
          index++;
          while(assembly.charAt(index) != "'" && index < assembly.length){
            console_log(assembly.charAt(index));
            console_log(index);
            index++;
          }
          index++;

          console_log(assembly.substring(tokenIndex, index));
          console_log(index);
          console_log(assembly.substring(tokenIndex, index));
          return assembly.substring(tokenIndex, index);
        }

        if(assembly.charAt(index) == '"'){
          index++;
          while(assembly.charAt(index) != '"' && index < assembly.length){
            console_log(assembly.charAt(index));
            console_log(index);
            index++;
          }
          index++;

          console_log(assembly.substring(tokenIndex, index));
          console_log(index);
          console_log(assembly.substring(tokenIndex, index));
          return assembly.substring(tokenIndex, index);
        }



        if((assembly.charAt(index) == '(') || (assembly.charAt(index) == '[') || (assembly.charAt(index) == '{')){
          index++;
        }

        while((assembly.charAt(index) != ',') && (assembly.charAt(index) != '(') && (assembly.charAt(index) != ')') && (assembly.charAt(index) != '[') && (assembly.charAt(index) != ']') && (assembly.charAt(index) != '{') && (assembly.charAt(index) != '}') && (assembly.charAt(index) != ':') && (assembly.charAt(index) != '#') && (assembly.charAt(index) != '\t') && (assembly.charAt(index) != '\n') && (assembly.charAt(index) != ' ') && (assembly.charAt(index) != '\r') && (index < assembly.length)){
          index++;
        }

        var res;
        if((assembly.charAt(index) == ':') || (assembly.charAt(index) == ')') || (assembly.charAt(index) == ']') || (assembly.charAt(index) == '}')){
          res = assembly.substring(tokenIndex, index) + assembly.charAt(index);
        }
        else{
          res = assembly.substring(tokenIndex, index);
        }

        return res;
}

/*Places the pointer in the start of next token*/
function next_token()
{
        //var assembly = textarea_assembly_editor.getValue(); // TODO: interface
        var assembly = code_assembly ;
        var index = tokenIndex;

        console_log(assembly.charAt(index));
        if(assembly.charAt(index) == "'"){
          index++;
          while(assembly.charAt(index) != "'" && index < assembly.length){
            console_log(assembly.charAt(index));
            index++;
          }
          index++;
        }

        if(assembly.charAt(index) == '"'){
          index++;
          while(assembly.charAt(index) != '"' && index < assembly.length){
            console_log(assembly.charAt(index));
            index++;
          }
          index++;
        }

        if((assembly.charAt(index) == '(') || (assembly.charAt(index) == '[') || (assembly.charAt(index) == '{')){
          index++;
        }

        while((assembly.charAt(index) != ',') && (assembly.charAt(index) != '(') && (assembly.charAt(index) != ')') && (assembly.charAt(index) != '[') && (assembly.charAt(index) != ']') && (assembly.charAt(index) != '{') && (assembly.charAt(index) != '}') && (assembly.charAt(index) != ':') && (assembly.charAt(index) != '#') && (assembly.charAt(index) != '\t') && (assembly.charAt(index) != '\n') && (assembly.charAt(index) != ' ') && (assembly.charAt(index) != '\r') && (index < assembly.length)){
          index++;
        }

        while(((assembly.charAt(index) == ',') || (assembly.charAt(index) == '(') || (assembly.charAt(index) ==')') || (assembly.charAt(index) == '[') || (assembly.charAt(index) == ']') || (assembly.charAt(index) == '{') || (assembly.charAt(index) == '}') || (assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r') || (assembly.charAt(index) == '#')) && (index < assembly.length)){

          while(((assembly.charAt(index) ==',') || (assembly.charAt(index) ==')') || (assembly.charAt(index) == ']') || (assembly.charAt(index) == '}') || (assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r')) && (index < assembly.length)){
            index++;
          }

          if((assembly.charAt(index) =='(') || (assembly.charAt(index) == '[') || (assembly.charAt(index) == '{')){
            break;
          }

          if(assembly.charAt(index) == '#'){
            while((assembly.charAt(index) != '\n') && (index < assembly.length)){
              index++;
            }

            while(((assembly.charAt(index) == '(') || (assembly.charAt(index) ==')') || (assembly.charAt(index) == '[') || (assembly.charAt(index) == ']') || (assembly.charAt(index) == '{') || (assembly.charAt(index) == '}') || (assembly.charAt(index) == ':') || (assembly.charAt(index) == '\t') || (assembly.charAt(index) == '\n') || (assembly.charAt(index) == ' ') || (assembly.charAt(index) == '\r')) && (index < assembly.length)){
              index++;
            }
          }
        }
        tokenIndex = index;
}

/*Compile assembly code*/
function assembly_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;
	
            instructions = [];
            instructions_tag = [];
            pending_instructions = [];
            pending_tags = [];
            memory[memory_hash[0]] = [];
            data_tag = [];
            instructions_binary =[];
            memory[memory_hash[1]] = [];
            extern = [];
            memory[memory_hash[2]] = [];
            data = [];
            executionInit = 1;
            mutexRead = false;

            if(update_binary.instructions_binary != null){
              for(var i = 0; i < update_binary.instructions_binary.length; i++){
                instructions.push(update_binary.instructions_binary[i]);
                if(i == 0){
                  instructions[instructions.length-1].hide = false;
                  if(update_binary.instructions_binary[i].globl == false){
                    instructions[instructions.length-1].Label = "";
                  }
                }
                else if(update_binary.instructions_binary[i].globl == false){
                  instructions[instructions.length-1].Label = "";
                  instructions[instructions.length-1].hide = true;
                }
                else if(update_binary.instructions_binary[i].globl == null){
                  instructions[instructions.length-1].hide = true;
                }
                else{
                  instructions[instructions.length-1].hide = false;
                }

                address = parseInt(instructions[instructions.length-1].Address, 16) + 4;
              }
            }
            else{
              address = parseInt(architecture.memory_layout[0].value);
            }

            var numBinaries = instructions.length;


            /*Allocation of memory addresses*/
            architecture.memory_layout[4].value = backup_stack_address;
            architecture.memory_layout[3].value = backup_data_address;
            data_address = parseInt(architecture.memory_layout[2].value);
            stack_address = parseInt(architecture.memory_layout[4].value);

            architecture.components[1].elements[29].value = bi_intToBigInt(stack_address,10) ;
            architecture.components[0].elements[0].value  = bi_intToBigInt(address,10) ;
            architecture.components[1].elements[29].default_value = bi_intToBigInt(stack_address,10) ;
            architecture.components[0].elements[0].default_value  = bi_intToBigInt(address,10) ;

            /*Reset stats*/
            totalStats = 0;
            for (var i = 0; i < stats.length; i++){
              stats[i].percentage = 0;
              stats[i].number_instructions = 0;
              stats_value[i] = 0;
            }

            align = 0;
            var empty = false;

            /*Start of compilation*/
            first_token();

            if (get_token() == null){
               hide_loading();
               return packCompileError(0, 'Please enter the assembly code before compiling', 'warning', 'danger') ;
            }

            token = get_token();
            console_log(token)

            while(!empty)
            {
              token = get_token();
              console_log(token)

              if(token == null){
                empty = true;
                break;
              }

              var change = false;

              for (var i = 0; i < architecture.directives.length; i++)
              {
                if (token == architecture.directives[i].name)
                {
                  switch(architecture.directives[i].action)
                  {
                    case "data_segment":
                      console_log("data_segment");
                      ret = data_segment_compiler();
                      if (ret.status == "ok") {
                          change = true;
                      }
                      if (ret.status != "ok")
                      {
                        instructions = [];
                        pending_instructions = [];
                        pending_tags = [];
                        memory[memory_hash[0]] = [];
                        data_tag = [];
                        instructions_binary = [];
                        memory[memory_hash[1]] = [];
                        memory[memory_hash[2]] = [];
                        data = [];
                        extern = [];

                        return ret;
                      }
                      break;

                    case "code_segment":
                      console_log("code_segment") ;
                      ret = code_segment_compiler();
                      if (ret.status == "ok") {
                          change = true;
                      }
                      if (ret.status != "ok")
                      {
                        instructions = [];
                        pending_instructions = [];
                        pending_tags = [];
                        memory[memory_hash[0]] = [];
                        data_tag = [];
                        instructions_binary = [];
                        memory[memory_hash[1]] = [];
                        extern = [];
                        memory[memory_hash[2]] = [];
                        data = [];

                        return ret;
                      }
                      break;

                    case "global_symbol":
                      var isGlobl = true;
                      next_token();

                      while(isGlobl){
                        token = get_token();

                        re = new RegExp(",", "g");
                        token = token.replace(re, "");

                        console_log(token)
                        extern.push(token);
                        change = true;

                        next_token();
                        token = get_token();

                        console_log(token);

                        for(var z = 0; z < architecture.directives.length; z++){
                          if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                            isGlobl = false;
                          }
                        }
                      }
                      break;

                    default:
                      console_log("default") ;
                      empty = true;
                      break;
                  }
                }

                else if (i== architecture.directives.length-1 && token != architecture.directives[i].name && change == false && token != null)
                {
                  empty = true;
                  //tokenIndex = 0;
                  return packCompileError(15, token, 'error', "danger");
                } 
              }
            }

            var found = false;

            if(update_binary.instructions_binary != null){
              for(var j = 0; j<instructions.length; j++){
                if(instructions[j].Label != ""){
                  for(var i = 0; i<update_binary.instructions_tag.length; i++){
                    if(instructions[j].Label == update_binary.instructions_tag[i].tag){
                      update_binary.instructions_tag[i].addr = instructions[j].Address;
                    }
                  }
                }
              }
            }

            /*Check pending instructions*/
            for(var i = 0; i < pending_instructions.length; i++){
              var exit = 0;
              var signatureParts = pending_instructions[i].signature;
              var signatureRawParts = pending_instructions[i].signatureRaw;
              var instructionParts = (pending_instructions[i].instruction).split(' ');
              console_log(instructionParts);
              for (var j = 0; j < signatureParts.length && exit == 0; j++){
                if(signatureParts[j] == "inm-signed" || signatureParts[j] == "inm-unsigned" || signatureParts[j] == "address"){
                  for (var z = 0; z < instructions.length && exit == 0; z++){
                    if(instructions[z].Label == instructionParts[j]){
                      var addr = instructions[z].Address;
                      var bin = parseInt(addr, 16).toString(2);
                      var startbit = pending_instructions[i].startBit;
                      var stopbit = pending_instructions[i].stopBit;

                      instructionParts[j] = addr;
                      var newInstruction = "";
                      for (var w = 0; w < instructionParts.length; w++) {
                        if(w == instructionParts.length-1){
                          newInstruction = newInstruction + instructionParts[w];
                        }
                        else{
                          newInstruction = newInstruction + instructionParts[w] + " ";
                        }
                      }
                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                        }
                      }

                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                          var fieldsLength = startbit - stopbit + 1;
                          console_log(w)
                          console_log(numBinaries)
                          console_log(w - numBinaries)
                          instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                          exit = 1;
                        }
                      }
                    }
                  }

                  for (var z = 0; z < memory[memory_hash[0]].length && exit == 0; z++){
                    for (var p = 0; p < memory[memory_hash[0]][z].Binary.length && exit == 0; p++){
                      if(instructionParts[j] == memory[memory_hash[0]][z].Binary[p].Tag){
                        var addr = (memory[memory_hash[0]][z].Binary[p].Addr);
                        var bin = parseInt(addr, 16).toString(2);
                        var startbit = pending_instructions[i].startBit;
                        var stopbit = pending_instructions[i].stopBit;

                        instructionParts[j] = "0x" + addr.toString(16);
                        var newInstruction = "";
                        for (var w = 0; w < instructionParts.length; w++) {
                          if(w == instructionParts.length-1){
                            newInstruction = newInstruction + instructionParts[w];
                          }
                          else{
                            newInstruction = newInstruction + instructionParts[w] + " ";
                          }
                        }
                        for (var w = 0; w < instructions.length && exit == 0; w++) {
                          var aux = "0x" + (pending_instructions[i].address).toString(16);
                          if(aux == instructions[w].Address){
                            instructions[w].loaded = newInstruction;
                          }
                        }

                        for (var w = 0; w < instructions.length && exit == 0; w++) {
                          var aux = "0x" + (pending_instructions[i].address).toString(16);
                          if(aux == instructions[w].Address){
                            instructions[w].loaded = newInstruction;
                            var fieldsLength = startbit - stopbit + 1;
                            instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                            exit = 1;
                          }
                        }

                      }
                    }
                  }

                  if(exit == 0 && isNaN(instructionParts[j]) == true){
                   //tokenIndex = 0;
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    memory[memory_hash[0]] = [];
                    data_tag = [];
                    instructions_binary = [];
                    memory[memory_hash[1]] = [];
                    memory[memory_hash[2]] = [];
                    data = [];
                    extern = [];
                    ret = packCompileError(7, instructionParts[j], pending_instructions[i].line, "danger");
                    return ret;
                  }
                }

                if(signatureParts[j] == "offset_words"){
                  for (var z = 0; z < instructions.length && exit == 0; z++){
                    if(instructions[z].Label == instructionParts[j]){
                      var addr = instructions[z].Address;
                      //var bin = parseInt(addr, 16).toString(2);
                      var startbit = pending_instructions[i].startBit;
                      var stopbit = pending_instructions[i].stopBit;

                      addr = ((addr - pending_instructions[i].address)/4)-1;
                      console_log(instructionParts);
                      console_log(addr);
                      var bin = parseInt(addr).toString(2);
                      console_log(bin);

                      instructionParts[j] = addr;
                      var newInstruction = "";
                      for (var w = 0; w < instructionParts.length; w++) {
                        if(w == instructionParts.length-1){
                          newInstruction = newInstruction + instructionParts[w];
                        }
                        else{
                          newInstruction = newInstruction + instructionParts[w] + " ";
                        }
                      }
                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                        }
                      }

                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                          var fieldsLength = startbit - stopbit + 1;
                          console_log(w);
                          console_log(numBinaries);
                          console_log(w - numBinaries);
                          console_log(bin.padStart(fieldsLength, "0"));
                          instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                          exit = 1;
                        }
                      }
                    }
                  }

                  if(exit == 0){
                    //tokenIndex = 0;
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    memory[memory_hash[0]] = [];
                    data_tag = [];
                    instructions_binary = [];
                    memory[memory_hash[1]] = [];
                    memory[memory_hash[2]] = [];
                    data = [];
                    extern = [];
                    ret = packCompileError(7, instructionParts[j], pending_instructions[i].line, "danger");
                    return ret;
                  }
                }

                if(signatureParts[j] == "offset_bytes"){
                  for (var z = 0; z < instructions.length && exit == 0; z++){
                    if(instructions[z].Label == instructionParts[j]){
                      var addr = instructions[z].Address;
                      var bin = parseInt(addr, 16).toString(2);
                      var startbit = pending_instructions[i].startBit;
                      var stopbit = pending_instructions[i].stopBit;

                      addr = ((addr - pending_instructions[i].address))-1;

                      instructionParts[j] = addr;
                      var newInstruction = "";
                      for (var w = 0; w < instructionParts.length; w++) {
                        if(w == instructionParts.length-1){
                          newInstruction = newInstruction + instructionParts[w];
                        }
                        else{
                          newInstruction = newInstruction + instructionParts[w] + " ";
                        }
                      }
                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                        }
                      }

                      for (var w = 0; w < instructions.length && exit == 0; w++) {
                        var aux = "0x" + (pending_instructions[i].address).toString(16);
                        if(aux == instructions[w].Address){
                          instructions[w].loaded = newInstruction;
                          var fieldsLength = startbit - stopbit + 1;
                          console_log(w)
                          console_log(numBinaries)
                          console_log(w - numBinaries)
                          instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                          exit = 1;
                        }
                      }
                    }
                  }

                  if(exit == 0){
                    //tokenIndex = 0;
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    memory[memory_hash[0]] = [];
                    data_tag = [];
                    instructions_binary = [];
                    memory[memory_hash[1]] = [];
                    memory[memory_hash[2]] = [];
                    data = [];
                    extern = [];
                    ret = packCompileError(7, instructionParts[j], pending_instructions[i].line, "danger");
                    return -1;
                  }
                }
              }
            }

            /*Enter the binary in the text segment*/
            if (update_binary.instructions_binary != null) 
            {
              for (var i = 0; i < update_binary.instructions_binary.length; i++) 
              {
                var hex = bin2hex(update_binary.instructions_binary[i].loaded);
                var auxAddr = parseInt(update_binary.instructions_binary[i].Address, 16);
                var label = update_binary.instructions_binary[i].Label;
                var hide;

                if(i == 0){
                  hide = false;
                  if(update_binary.instructions_binary[i].globl == false){
                    label = "";
                  }
                }
                else if(update_binary.instructions_binary[i].globl == false){
                  label = "";
                  hide = true;
                }
                else if(update_binary.instructions_binary[i].globl == null){
                  hide = true;
                }
                else{
                  hide = false;
                }

                for(var a = 0; a < hex.length/2; a++){
                  if(auxAddr % 4 == 0){
                    memory[memory_hash[1]].push({Address: auxAddr, Binary: [], Value: "********", hide: hide});
                    if(label == ""){
                      label=null;
                    }

                    if(a == 0){
                      (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: label},);
                    }
                    else{
                      (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: null},);
                    }

                    auxAddr++;
                  }
                  else{
                    if(a == 0){
                      console_log(label);
                      (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: label},);
                    }
                    else{
                      (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: null},);
                    }

                    auxAddr++;
                  }
                }

                if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length < 4){
                  var num_iter = 4 - memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length;
                  for(var b = 0; b < num_iter; b++){
                    (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr + (b + 1)), DefBin: "**", Bin: "**", Tag: null},);
                  }
                }

                if (typeof app != "undefined")
                    app._data.memory[memory_hash[1]] = memory[memory_hash[1]];
              }
            }

            /*Enter the compilated instructions in the text segment*/
            for (var i = 0; i < instructions_binary.length; i++)
            {
              var hex = bin2hex(instructions_binary[i].loaded);
              var auxAddr = parseInt(instructions_binary[i].Address, 16);
              var label = instructions_binary[i].Label;
              var binNum = 0;

              if (update_binary.instructions_binary != null) {
                  binNum = update_binary.instructions_binary.length
              }

              for (var a = 0; a < hex.length/2; a++) {
                if (auxAddr % 4 == 0) {
                  memory[memory_hash[1]].push({Address: auxAddr, Binary: [], Value: instructions[i + binNum].loaded, hide: false});
                  if(label == ""){
                    label=null;
                  }
                  if(a == 0){
                    (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: label},);
                  }
                  else{
                    (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: null},);
                  }

                  auxAddr++;
                }
                else{
                  if(a == 0){
                    console_log(label);
                    (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: label},);
                  }
                  else{
                    (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: null},);
                  }

                  auxAddr++;
                }
              }

              if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length < 4){
                var num_iter = 4 - memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length;
                for(var b = 0; b < num_iter; b++){
                  (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr + (b + 1)), DefBin: "00", Bin: "00", Tag: null},);
                }
              }
              if (typeof app != "undefined")
                  app._data.memory[memory_hash[1]] = memory[memory_hash[1]]; // TODO
            }


            /*Check for overlap*/
            if(memory[memory_hash[0]].length > 0){
              if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[3].Addr > architecture.memory_layout[3].value){
                //tokenIndex = 0;
                instructions = [];
                pending_instructions = [];
                pending_tags = [];
                memory[memory_hash[0]] = [];
                data_tag = [];
                instructions_binary = [];
                memory[memory_hash[1]] = [];
                extern = [];
                memory[memory_hash[2]] = [];
                data = [];

                return packCompileError(0, 'Data overflow', 'warning', "danger") ;
              }
            }

            if(memory[memory_hash[1]].length > 0){
              if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary[3].Addr > architecture.memory_layout[1].value){
                //tokenIndex = 0;
                instructions = [];
                pending_instructions = [];
                pending_tags = [];
                memory[memory_hash[0]] = [];
                data_tag = [];
                instructions_binary = [];
                memory[memory_hash[1]] = [];
                extern = [];
                memory[memory_hash[2]] = [];
                data = [];

                return packCompileError(0, 'Instruction overflow', 'warning', "danger");
              }
            }

            /*Save binary*/
            for(var i = 0; i < instructions_binary.length; i++){
              if(extern.length == 0 && instructions_binary[i].Label != ""){
                instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
                instructions_binary[i].globl = false;
              }
              else{
                for(var j = 0; j < extern.length; j++){
                  if(instructions_binary[i].Label != extern[j] && j == extern.length-1 && instructions_binary[i].Label != ""){
                    instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
                    instructions_binary[i].globl = false;
                    break;
                  }
                  else if(instructions_binary[i].Label == extern[j]){
                    instructions_binary[i].globl = true;
                    break;
                  }
                }
              } 
            }

            /*Save tags*/
            for(var i = 0; i < instructions_tag.length; i++){
              if(extern.length == 0 && instructions_tag[i].tag != ""){
                instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
                instructions_tag[i].globl = false;
                break;
              }
              else{
                for(var j = 0; j < extern.length; j++){
                  if(instructions_tag[i].tag != extern[j] && j == extern.length-1 && instructions_tag[i].tag != ""){
                    instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
                    instructions_tag[i].globl = false;
                    break;
                  }
                  else if(instructions_tag[i].tag == extern[j]){
                    instructions_tag[i].globl = true;
                    break;
                  }
                }
              } 
            }

            if (typeof app != "undefined")
                app._data.instructions = instructions;

            /*Initialize stack*/
            memory[memory_hash[2]].push({Address: stack_address, Binary: [], Value: null, DefValue: null, reset: false, unallocated: false});
            
            for(var i = 0; i<4; i++){
              (memory[memory_hash[2]][memory[memory_hash[2]].length-1].Binary).push({Addr: stack_address + i, DefBin: "00", Bin: "00", Tag: null},);
            }

            if (typeof app !== "undefined")
                app._data.memory[memory_hash[2]] = memory[memory_hash[2]]; // CHECK

            address = architecture.memory_layout[0].value;
            data_address = architecture.memory_layout[2].value;
            stack_address = architecture.memory_layout[4].value;

            return ret;
}

/*Compile data segment*/
function data_segment_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        var existsData = true;

        next_token();

        while(existsData){
          token = get_token();
          console_log(token);

          var label = "";

          if(token == null){
            break;
          }

          console_log(token)

          var found = false;

          if(token.search(/\:$/) != -1){
            if(token.length == 1)
            {
              /*app.compileError(0, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
              hide_loading();*/

              //TODO: Revisar el n'umero de l'inea para error
              return packCompileError(0, "", 'error', "danger");
            }

            for (var i = 0; i < data_tag.length; i++)
            {
              console_log(data_tag[i].tag);
              console_log(token.substring(0,token.length-1))
              if (data_tag[i].tag == token.substring(0,token.length-1)) {
                  return packCompileError(1, token.substring(0,token.length-1), 'error', "danger") ;
              }
            }

            for (var i = 0; i < instructions.length; i++) {
              if (instructions[i].Label == token.substring(0,token.length-1)) {
                  return packCompileError(1, token.substring(0,token.length-1), 'error', "danger") ;
              } 
            }

            label = token.substring(0,token.length-1);
            next_token();
            token = get_token();
          }

          for(var j = 0; j < architecture.directives.length; j++){
            if(token == architecture.directives[j].name){
              switch(architecture.directives[j].action){
                case "byte":
                  var isByte = true;

                  next_token();

                  while(isByte){
                    token = get_token();

                    if (token == null) {
                        return packCompileError(23, "", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log("byte")
                    console_log(token)

                    var auxToken;
                    var auxTokenString;

                    if (token.match(/^\'(.*?)\'$/)) {
                        var re = /^\'(.*?)\'$/;
                        console_log(re);
                        var match = re.exec(token);
                        console_log(match);
                        var asciiCode;

                        console_log(match[1]);

                        if(token.search(/^\'\\n\'$/) != -1){
                          asciiCode = 10;
                        }
                        else if(token.search(/^\'\\t\'$/) != -1){
                          asciiCode = 9;
                        }
                        else{
                          asciiCode = match[1].charCodeAt(0);
                        }

                        console_log(asciiCode);
                        auxTokenString = asciiCode.toString(16);
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError(19, token, 'error', "danger") ;
                      }

                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if (token.search(re) == -1) {
                          return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                         return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    console_log(auxTokenString)

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "byte")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("byte Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for (var z = 0; z < architecture.directives.length; z++) {
                         if (token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                             isByte = false;
                         }
                    }
                  }

                  j=0;

                  break;
                case "half_word":
                  console_log("half_word")
                  var ishalf = true;

                  next_token();
                  while(ishalf)
                  {
                    token = get_token();
                    if (token == null) {
                        return packCompileError(23,"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log("half_word");
                    console_log(token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if (value[1].search(re) == -1) {
                         return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");

                      if (value[1].length == 0) {
                          return packCompileError(19, token, 'error', "danger") ;
                      }
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if (token.search(re) == -1) {
                          return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if (auxTokenString.length > 2*architecture.directives[j].size) {
                          return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    console_log(auxTokenString)

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "half")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("half Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        ishalf = false;
                      }
                    }
                  }

                  j=0;
                  break;

                case "word":
                  var isWord = true;
                  next_token();

                  while(isWord){
                    console_log("word")

                    token = get_token();
                    if (token == null) {
                        return packCompileError(23,"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if (token.search(re) != -1) {
                        return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log(token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        return packCompileError(19, token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    console_log(auxTokenString);

                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16)) >> 0, "word")
                    if (ret.status != 'ok') {
                        return ret ;
                    }
                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("word Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){

                        isWord = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "double_word":
                  var isDoubleWord = true;

                  next_token();

                  while(isDoubleWord){
                    console_log("word");

                    token = get_token();

                    if(token == null){
                      /*app.compileError(23,"", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(23,"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if(token.search(re) != -1){
                      /*app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log(token);

                    var auxToken;
                    var auxTokenString;
                    if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        /*app.compileError(19, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(19, token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    else{
                      var re = new RegExp("[0-9-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseInt(token) >>> 0;
                      auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    ret = data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16) >> 0), "double_word")
                    if (ret.status != 'ok') {
                        return ret ;
                    }

                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("double word Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isDoubleWord = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "float":
                  var isFloat = true;

                  next_token();

                  while(isFloat){
                    console_log("float");

                    token = get_token();

                    if(token == null){
                      /*app.compileError(23,"", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(23,"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if(token.search(re) != -1){
                      /*app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    console_log(token);

                    var auxToken;
                    var auxTokenString;
                    if(token == "-Inf" || token == "-inf" || token == "-Infinity" || token == "-infinity"){
                      token = "-Infinity";
                      auxTokenString = "FF800000";
                    }
                    else if(token == "Inf" || token == "+Inf" || token == "inf" || token == "+inf" || token == "Infinity" || token == "+Infinity" || token == "infinity" || token == "+infinity"){
                      token = "+Infinity";
                      auxTokenString = "7F800000";
                    }
                    else if(token == "NaN" || token == "nan"){
                      token = "NaN";
                      auxTokenString = "7FC00000";
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        /*app.compileError(19, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(19, token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                      token = hex2float(token);
                    }
                    else{
                      var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseFloat(token, 10);
                      auxTokenString = (bin2hex(float2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    console_log(auxTokenString);

                    data_compiler(auxTokenString, architecture.directives[j].size, label, token, "float")
                    if (ret.status != 'ok') {
                      return ret ;
                    }

                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("float Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isFloat = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "double":
                  var isDouble = true;

                  next_token();

                  while(isDouble){
                    console_log("double");

                    token = get_token();

                    if(token == null){
                      /*app.compileError(23,"", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(23,"", 'error', "danger") ;
                    }

                    re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
                    if(token.search(re) != -1){
                      /*app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();*/
                      return packCompileError(24, token, 'error', "danger") ;
                    }

                    re = new RegExp(",", "g")
                    token = token.replace(re, "");

                    console_log(token);

                    var auxToken;
                    var auxTokenString;
                    if(token == "-Inf" || token == "-inf" || token == "-Infinity" || token == "-infinity"){
                      token = "-Infinity";
                      auxTokenString = "FFF0000000000000";
                    }
                    else if(token == "Inf" || token == "+Inf" || token == "inf" || token == "+inf" || token == "Infinity" || token == "+Infinity" || token == "infinity" || token == "+infinity"){
                      token = "+Infinity";
                      auxTokenString = "7FF0000000000000";
                    }
                    else if(token == "NaN" || token == "nan"){
                      token = "NaN";
                      auxTokenString = "7FF8000000000000";
                    }
                    else if(token.match(/^0x/)){
                      var value = token.split('x');

                      re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                      if(value[1].search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }

                      auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                      if(value[1].length == 0){
                        /*app.compileError(19, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(19, token, 'error', "danger") ;
                      }
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                      token = hex2double(token);
                    }
                    else{
                      var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                      if(token.search(re) == -1){
                        /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(16, token, 'error', "danger") ;
                      }
                      auxToken = parseFloat(token, 10);console_log(auxTokenString);
                      auxTokenString = (bin2hex(double2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                      if(auxTokenString.length > 2*architecture.directives[j].size){
                        /*app.compileError(18, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();*/
                        return packCompileError(18, token, 'error', "danger") ;
                      }
                      auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
                    }
                    
                    console_log(auxTokenString);

                    data_compiler(auxTokenString, architecture.directives[j].size, label, token, "float")
                    if (ret.status != 'ok') {
                      return ret ;
                    }


                    label = null;

                    console_log(memory[memory_hash[0]]);
                    console_log("double Terminado");

                    next_token();
                    token = get_token();

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isDouble = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "ascii_not_null_end":
                  console_log("ascii_not_null_end");

                  var isAscii = true;
                  var nextToken = 1;

                  next_token();

                  while(isAscii){
                    console_log("ascii_not_null_end");

                    token = get_token();
                    console_log(token);

                    string = token;

                    re = new RegExp('^"');
                    string = string.replace(re, "");
                    console_log(string);
                    re = new RegExp('"$');
                    string = string.replace(re, "");
                    console_log(string);

                    if(token == null){
                      break;
                    }

                    /*re = new RegExp('(.)","(.)');
                    if(token.search(re) != -1){
                      app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();
                      return -1;
                    }

                    console_log(token);

                    re = new RegExp(",", "g");
                    token = token.replace(re, "");

                    re = new RegExp('^"');
                    console_log(re);
                    if(token.search(re) == -1){
                      app.compileError(17, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();
                      return -1;
                    }

                    var string = "";
                    var final = false;

                    re = new RegExp('"$');
                    console_log(re);
                    console_log(token);
                    if(token.search(re) == -1){
                      string = token.substring(1, token.length);
                    }
                    else{
                      string = token.substring(1, token.length-1);
                      final = true;
                    }
                    
                    while(final == false){
                      next_token();
                      token = get_token();
                      console_log(token);

                      if(token == null){
                        break;
                      }

                      re = new RegExp('(.)","(.)');
                      console_log(re);
                      if(token.search(re) != -1){
                        app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();
                        return -1;
                      }

                      console_log(token);

                      re = new RegExp(",", "g")
                      token = token.replace(re, "");

                      re = new RegExp('^"');
                      console_log(re);
                      if(token.search(re) != -1 && final == false){
                        string = string + " ";
                        final = true;
                      }

                      re = new RegExp('"$');
                      console_log(re);
                      if(token.search(re) != -1 && final == false){
                        final = true;
                        string = string + " " + token.substring(0, token.length-1);
                      }

                      if(final == false){
                        string = string + " " + token;
                        final = false;
                      }
                    }*/

                    console_log(string);

                    for(var i = 0; i < string.length; i++){
                      console_log(string.length);
                      if((data_address % align) != 0 && i == 0 && align != 0){
                        while((data_address % align) != 0){
                          if(data_address % 4 == 0){
                            memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: "ascii"});
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                            data_address++;
                          }
                          else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                            data_address++;
                          }
                          else{
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                            data_address++;
                          }
                        }
                      }

                      if(data_address % 4 == 0){
                        memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string.charAt(i), DefValue: string.charAt(i), reset: false, type: "ascii"});

                        if(i == 0){
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                          if(label != null){
                            data_tag.push({tag: label, addr: data_address});
                          }
                          label = null;
                        }
                        else{
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                        }

                        data_address++;
                      
                      }
                      else{
                        if(i == 0){
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                          memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                          memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                          if(label != null){
                            data_tag.push({tag: label, addr: data_address});
                          }
                          label = null;
                        }
                        else{
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                          memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                          memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                        }
                        data_address++;
                      }
                    }
                    console_log(memory[memory_hash[0]]);

                    if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
                      var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
                      for(var i = 0; i < num_iter; i++){
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
                      }
                    }

                    console_log("ascii_not_null_end Terminado");

                    if(nextToken == 1){
                      next_token();
                      token = get_token();
                    }

                    nextToken = 1;

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isAscii = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "ascii_null_end":
                  console_log("ascii_null_end");
                  
                  var isAscii = true;
                  var nextToken = 1;

                  next_token();

                  while(isAscii){
                    console_log("ascii_null_end")

                    token = get_token();
                    console_log(token);

                    if(token == null){
                      break;
                    }

                    string = token;

                    re = new RegExp('^"');
                    string = string.replace(re, "");
                    console_log(string);
                    re = new RegExp('"$');
                    string = string.replace(re, "");
                    console_log(string);

                    /*re = new RegExp('(.)","(.)');
                    if(token.search(re) != -1){
                      app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();
                      return -1;
                    }

                    re = new RegExp(",", "g")
                    token = token.replace(re, "");

                    re = new RegExp('^"');
                    console_log(re)
                    if(token.search(re) == -1){
                      app.compileError(17, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      hide_loading();
                      return -1;
                    }

                    var string = "";
                    var final = false;
                    
                    re = new RegExp('"$');
                    console_log(re);
                    console_log(token);
                    if(token.search(re) == -1){
                      string = token.substring(1, token.length);
                    }
                    else{
                      string = token.substring(1, token.length-1);
                      final = true;
                    }
                    
                    while(final == false){
                      next_token();
                      token = get_token();
                      console_log(token);
                      if(token == null){
                        break;
                      }

                      re = new RegExp('(.)","(.)');
                      console_log(re);
                      if(token.search(re) != -1){
                        app.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        hide_loading();
                        return -1;
                      }

                      re = new RegExp(",", "g")
                      token = token.replace(re, "");

                      re = new RegExp('^"');
                      console_log(re);
                      if(token.search(re) != -1 && final == false){
                        string = string + " ";
                        final = true;
                      }

                      re = new RegExp('"$');
                      console_log(re);
                      if(token.search(re) != -1 && final == false){
                        final = true;
                        string = string + " " + token.substring(0, token.length-1);
                      }

                      if(final == false){
                        string = string + " " + token;
                        final = false;
                      }
                    }

                    string = string;*/

                    console_log(string);

                    for(var i = 0; i < string.length + 1; i++){
                      console_log(string.length);
                      if((data_address % align) != 0 && i == 0 && align != 0){
                        while((data_address % align) != 0){
                          if(data_address % 4 == 0){
                            memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: "ascii"});
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                            data_address++;
                          }
                          else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                            data_address++;
                          }
                          else{
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                            data_address++;
                          }
                        }
                      }

                      if(data_address % 4 == 0){
                        memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string.charAt(i), DefValue: string.charAt(i), reset: false, type: "ascii"});

                        if(i < string.length){
                          if(i == 0){
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                            if(label != null){
                              data_tag.push({tag: label, addr: data_address});
                            }
                            label = null;
                          }
                          else{
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                          }
                        }
                        else{
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                        }

                        data_address++;
                      }
                      else{
                        if(i < string.length){
                          if(i == 0){
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                            memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                            memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                            if(label != null){
                              data_tag.push({tag: label, addr: data_address});
                            }
                            label = null;
                          }
                          else{
                            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                            memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                            memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                          }
                        }
                        else{
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                        }

                        data_address++;
                      }
                    }

                    console_log(memory[memory_hash[0]]);

                    if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
                      var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
                      for(var i = 0; i < num_iter; i++){
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
                      }
                    }

                    console_log("ascii_null_end Terminado");

                    if(nextToken == 1){
                      next_token();
                      token = get_token();
                    }

                    nextToken = 1;

                    console_log(token);

                    for(var z = 0; z < architecture.directives.length; z++){
                      if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                        isAscii = false;
                      }
                    }
                    console_log(memory[memory_hash[0]]);
                  }

                  j=0;
                  break;

                case "space":
                  console_log("space");

                  var string = "";

                  next_token();
                  token = get_token();
                  console_log(token);
                  console_log(label);

                  if(token == null){
                    return packCompileError(23, "", 'error', "danger") ;
                  }

                  var re = new RegExp("[0-9-]{"+token.length+"}","g");
                  if(token.search(re) == -1){
                    return packCompileError(16, token, 'error', "danger") ;
                  }

                  if(parseInt(token) < 0){
                    return packCompileError(22, token, 'error', "danger") ;
                  }

                  var auxToken = parseInt(token) * architecture.directives[j].size;

                  for(var i = 0; i < auxToken; i++){
                    if((data_address % align) != 0 && i == 0 && align != 0){
                      while((data_address % align) != 0){
                        if(data_address % 4 == 0){
                          memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: "space"});
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                          data_address++;
                        }
                        else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                          data_address++;
                        }
                        else{
                          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                          data_address++;
                        }
                      }
                    }

                    if(data_address % 4 == 0){
                      memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string, DefValue: "", reset: false, type: "space"});

                      if(i == 0){
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: label},);
                        if(label != null){
                          data_tag.push({tag: label, addr: data_address});
                        }
                        label = null;
                      }
                      else{
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                      }

                      data_address++;
                    }
                    else{
                      if(i == 0){
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: label},);
                        if(label != null){
                          data_tag.push({tag: label, addr: data_address});
                        }
                        label = null;
                      }
                      else{
                        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                      }

                      data_address++;
                    }
                  }

                  console_log(memory[memory_hash[0]]);

                  if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
                    var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
                    for(var i = 0; i < num_iter; i++){
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
                    }
                  }

                  next_token();
                  token = get_token();

                  console_log("space Terminado");
                  break;

                case "align":
                case "balign":
                  console_log("[b]align");
                  let pow_mode = token == "align";

                  next_token();
                  token = get_token();
                  console_log(token);
                  if(token == null){
                    return packCompileError(23, "", 'error', "danger") ;
                  }

                  var re = new RegExp("[0-9-]{"+token.length+"}","g");
                  if(token.search(re) == -1){
                    /*app.compileError(16, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    hide_loading();*/
                    return packCompileError(16, token, 'error', "danger") ;
                  }

                  if(parseInt(token) < 0){
                    /*app.compileError(22, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    hide_loading();*/
                    return packCompileError(22, token, 'error', "danger") ;
                  }

                  console_log(align);
                  align = pow_mode ? Math.pow(2, parseInt(token)) : token;
                  console_log(align);

                  next_token();
                  token = get_token();

                  console_log("align Terminado");
                  break;

                default:
                  console_log("Default");
                  existsData = false;
                  break;
              }
            }

            else if(j== architecture.directives.length-1 && token != architecture.directives[j].name && token != null && token.search(/\:$/) == -1){
              if (typeof app !== "undefined")
                  app._data.memory[memory_hash[0]] = memory[memory_hash[0]]; //CHECK
              return ret;
            }
          
          }
        }

        if (typeof app !== "undefined")
            app._data.memory[memory_hash[0]] = memory[memory_hash[0]]; //CHECK

        return ret;
}

/* Stores a data in data memory */
function data_compiler(value, size, dataLabel, DefValue, type)
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;


        for(var i = 0; i < (value.length/2); i++)
	{
          if ((data_address % align) != 0 && i == 0 && align != 0)
	  {
            while((data_address % align) != 0){
              if(data_address % 4 == 0){
                memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false, type: type});
                (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                data_address++;
              }
              else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                data_address++;
              }
              else{
                (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                data_address++;
              }
            }
          }

          if(data_address % size != 0 && i == 0){
            return packCompileError(21, "", 'error', "danger") ;
          }

          if(data_address % 4 == 0){
            console_log(DefValue);
            memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: DefValue, DefValue: DefValue, reset: false, type: type});

            if(i == 0){
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
              if(dataLabel != null){
                data_tag.push({tag: dataLabel, addr: data_address});
              }
              dataLabel = null;
            }
            else{
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
            }

            data_address++;
          }
          else{
            if(value.length <= 4 && i == 0){
              console_log(DefValue);
              memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
              memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
            }

            if(i == 0){
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
              if(dataLabel != null){
                data_tag.push({tag: dataLabel, addr: data_address});
              }
              dataLabel = null;
            }
            else{
              (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
              console_log(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[data_address%4]);
            }
            data_address++;
          }
        }
        console_log(memory[memory_hash[0]])

        if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
          var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
          for(var i = 0; i < num_iter; i++){
            (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + i), DefBin: "00", Bin: "00", Tag: null},);
          }
        }

        return ret;
}

/*Compile text segment*/
function code_segment_compiler()
{
	var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;

        var existsInstruction = true;

        next_token();
        var instInit = tokenIndex;

        while(existsInstruction){
          token = get_token();

          for(var i = 0; i < architecture.directives.length; i++){
            if(token == architecture.directives[i].name && architecture.directives[i].action == "global_symbol"){
              next_token(); // .globl *main* 
              next_token(); 
              token = get_token();
            }
            else if(token == architecture.directives[i].name){

              if (typeof app !== "undefined")
                  app._data.instructions = instructions;

              console_log(token);
              for(var i = 0; i < instructions.length; i++){
                if(instructions[i].Label != ""){
                  instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
                }
              }

              return ret;
            }
          }

          var label = "";
          var validTagPC = true;

          if(token == null){
            break;
          }

          console_log(token);

          var found = false;
          var end = false;

          if(token.search(/\:$/) != -1){
            if(token.length == 1){
              return packCompileError(0, "", 'error', "danger") ;
            }

            for(var i = 0; i < memory[memory_hash[0]].length; i++){
              for(var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++){
                if(memory[memory_hash[0]][i].Binary[j].Tag == token.substring(0,token.length-1)){
                  return packCompileError(1, token.substring(0,token.length-1), 'error', "danger") ;
                }
              }
            }

            for(var i = 0; i < instructions.length; i++){
              if(instructions[i].Label == token.substring(0,token.length-1)){
                return packCompileError(1, token.substring(0,token.length-1), 'error', "danger") ;
              } 
            }

            label = token.substring(0,token.length-1);
            next_token();
            instInit = tokenIndex;
            token = get_token();

            if(token != null){
              var re = new RegExp(",+$");
              token = token.replace(re, "");
            }
            else{
              var instIndex;
              for (var i = 0; i < architecture.instructions.length; i++) {
                if(architecture.instructions[i].name == "nop"){
                  instIndex = i;
                }
              }
              instruction_compiler("nop", "nop", label, tokenIndex, false, 0, instInit, instIndex, false);
              end = true;
              found = true;
            }
          }

          var re = new RegExp(",+$");

          if(token != null){
            token = token.replace(re, "");
            console_log(token)
            var stopFor = false;
          }
          

          for(var i = 0; i < architecture.instructions.length && stopFor == false && end == false; i++){
            if(architecture.instructions[i].name != token){
              continue;
            }

            else{
              var instruction = "";
              var userInstruction = "";

              var numFields = 0;
              found = true;

              for (var j = 0; j < architecture.instructions[i].fields.length; j++){
                if(architecture.instructions[i].fields[j].type != "cop"){
                  numFields++;
                }
              }
              console_log(numFields);

              instruction = instruction + token;
              userInstruction = userInstruction + token;

              //var new_ins = 0;

              for (var j = 0; j < numFields - 1; j++){
                next_token();
                token = get_token();
                console_log(token);

                if(token != null){
                  var re = new RegExp(",+$");
                  token = token.replace(re, "");
                  instruction = instruction + " " + token;
                  userInstruction = userInstruction + " " + token;
                }  
              }

              console_log(instruction);
              console_log(label);

              ret = instruction_compiler(instruction, userInstruction, label, tokenIndex, false, 0, instInit, i, false);
              if (ret.status != 'ok'){
                  return ret ;
              }

              next_token();
              instInit = tokenIndex; //PRUEBA
              stopFor = true;
            }
          }

          if(!found){
            var resultPseudo = -3;
            var instruction = "";
            var numToken = 0;
            var exists = false;
            var inst = token;

            console_log(token)

            for (var i = 0; i < architecture.pseudoinstructions.length && exists == false; i++){
              if(architecture.pseudoinstructions[i].name == token){
                numToken = architecture.pseudoinstructions[i].fields.length;
                console_log(numToken)
                exists = true;
                instruction = instruction + token;

                for (var i = 0; i < numToken; i++){
                  next_token();
                  token = get_token();

                  if(token != null){
                    var re = new RegExp(",+$");
                    token = token.replace(re, "");
                  }

                  instruction = instruction + " " + token;
                }
                resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex); //TODO: line->ti?
                console_log(resultPseudo);
              }
            }

            if(resultPseudo == -3){
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  var re = new RegExp(architecture.components[i].elements[j].name);
                  if(token.search(re) != -1){
                    existsInstruction = false;
                    //tokenIndex = 0;
                    instructions = [];
                    pending_instructions = [];
                    pending_tags = [];
                    memory[memory_hash[0]] = [];
                    data_tag = [];
                    instructions_binary = [];
                    memory[memory_hash[1]] = [];
                    extern = [];
                    memory[memory_hash[2]] = [];
                    data = [];
                    ret = packCompileError(26, (textarea_assembly_editor.posFromIndex(tokenIndex).line) + 1, 'error', "danger") ;

                    return ret;
                  }
                }          
              }



              existsInstruction = false;
              //tokenIndex = 0;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              memory[memory_hash[0]] = [];
              data_tag = [];
              instructions_binary = [];
              memory[memory_hash[1]] = [];
              extern = [];
              memory[memory_hash[2]] = [];
              data = [];

              ret = packCompileError(2, token, 'error', "danger");
              return ret;
            }

            if(resultPseudo == -2){
    

              existsInstruction = false;
              //tokenIndex = 0;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              memory[memory_hash[0]] = [];
              data_tag = [];
              instructions_binary = [];
              memory[memory_hash[1]] = [];
              extern = [];
              memory[memory_hash[2]] = [];
              data = [];

              //PRUEBA para dar error con mas detalle
              ret = packCompileError(2, token, 'error', "danger");

              return ret;
            }

            if(resultPseudo == -1){
              existsInstruction = false;
              //tokenIndex = 0;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              memory[memory_hash[0]] = [];
              data_tag = [];
              instructions_binary = [];
              memory[memory_hash[1]] = [];
              extern = [];
              memory[memory_hash[2]] = [];
              data = [];
              ret = packCompileError(25, "", 'error', "danger") ;
              return ret;
            }

            next_token();
            instInit = tokenIndex; //PRUEBA

          }
        }

        token = get_token();
        console_log(token);

   
        if (typeof app !== "undefined")
            app._data.instructions = instructions;

        for(var i = 0; i < instructions.length; i++){
          if(instructions[i].Label != ""){
            instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
          }
        }

        return ret;
}


/*Compile instruction*/
function instruction_compiler ( instruction, userInstruction, label, line, 
				pending, pendingAddress, instInit, instIndex, isPseudo )
{
  var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;


  if(instIndex == null){
    instIndex = 0;
  }
  console_log(instruction);
  console_log(instIndex);
  var re = new RegExp("^ +");
  var oriInstruction = instruction.replace(re, "");

  re = new RegExp(" +", "g");
  oriInstruction = oriInstruction.replace(re, " ");

  var instructionParts = oriInstruction.split(' ');
  var validTagPC = true;
  var startBit;
  var stopBit;
  var resultPseudo = -3;

  console_log(label);
  console_log(line);

  var stopFor = false;

  for(var i = instIndex; i < architecture.instructions.length && stopFor == false; i++){
    if(architecture.instructions[i].name != instructionParts[0]){
      continue;
    }
    else{
      var auxSignature = architecture.instructions[i].signatureRaw;

      var tag = "";

      var binary = "";
      binary = binary.padStart(architecture.instructions[i].nwords * 32, "0");

      var instruction = architecture.instructions[i].signature_definition;
      var userInstruction = userInstruction;

      var signatureDef = architecture.instructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");

      re = new RegExp(",", "g");
      var signature = architecture.instructions[i].signature.replace(re, " ");

      re = new RegExp(signatureDef+"$");
      var match = re.exec(signature);
      var signatureParts = [];
      for(var j = 1; j < match.length; j++){
        signatureParts.push(match[j]);
      }

      match = re.exec(architecture.instructions[i].signatureRaw);
      var signatureRawParts = [];
      for(var j = 1; j < match.length; j++){
        signatureRawParts.push(match[j]);
      }

      console_log(signatureParts);
      console_log(signatureRawParts);

      re = new RegExp(signatureDef+"$");
      if(oriInstruction.search(re) == -1){

        if(isPseudo == false){
          console_log(get_token())

          tokenIndex =  instInit;
          token = get_token();

          console_log(token);
        }
        else{
          token = instructionParts[0];
        }

        var resultPseudo = null;
        var instruction = "";
        var numToken = 0;

        console_log(token)

        for(var i = i + 1; i < architecture.instructions.length; i++){
          if(architecture.instructions[i].name == token){

            var index = i;
            numToken = architecture.instructions[i].fields.length;
            instruction = instruction + token;

            for (var a = 1; a < numToken; a++){
              if(architecture.instructions[i].fields[a].type != "cop"){
                if(isPseudo == false){
                  next_token();
                  token = get_token();

                  if(token != null){
                    var re = new RegExp(",+$");
                    token = token.replace(re, "");
                  }
                }
                else{
                  token = instructionParts[a];
                }

                instruction = instruction + " " + token;
                console_log(instruction);
              }
            }
            if(isPseudo == false){
              instruction_compiler(instruction, instruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            else{
              instruction_compiler(instruction, userInstruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            return ret;
          }
        }
        



        for (var i = 0; i < architecture.pseudoinstructions.length; i++){
          if(architecture.pseudoinstructions[i].name == token){
            numToken = architecture.pseudoinstructions[i].fields.length;

            instruction = instruction + token;

            for (var i = 0; i < numToken; i++){
              next_token();
              token = get_token();

              if(token != null){
                var re = new RegExp(",+$");
                token = token.replace(re, "");
              }

              instruction = instruction + " " + token;
            }
            console_log(instruction);
            //resultPseudo = pseudoinstruction_compiler(instruction, label, textarea_assembly_editor.posFromIndex(tokenIndex).line); //TODO: revisar linea
            resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex); //TODO: line->ti?
          
            console_log(resultPseudo)

            if (resultPseudo.status == 'ok') {
                return resultPseudo ;
            }

            //TODO: revisar que solo se puede salir con ok y -1

            if(resultPseudo == -1){
              /*this.compileError(3, auxSignature, textarea_assembly_editor.posFromIndex(tokenIndex).line);
              return -1;*/
              return packCompileError(3, auxSignature, 'error', "danger") ;
            }
          }
        }

        //var resultPseudo = pseudoinstruction_compiler(oriInstruction, label, textarea_assembly_editor.posFromIndex(tokenIndex).line);

        /*console_log(resultPseudo)

        if(resultPseudo == 0){
          return;
        }

        if(resultPseudo == -1){
          this.compileError(3, architecture.instructions[i].signatureRaw, textarea_assembly_editor.posFromIndex(tokenIndex).line);
          return -1;
        }*/
      }

      if(resultPseudo == null){
        /*this.compileError(3, auxSignature, textarea_assembly_editor.posFromIndex(tokenIndex).line);
        return -1;*/
        return packCompileError(3, auxSignature, 'error', "danger") ;
      }
      console_log(oriInstruction);
      match = re.exec(oriInstruction);
      instructionParts = [];
      if(match != null){
        for(var j = 1; j < match.length; j++){
          instructionParts.push(match[j]);
        }
      }
      else{
        //TODO: posible fallo

        //return -2;
        return packCompileError(14, "Error instruction", 'error', "danger") ;
      }
      
      console_log(instructionParts);

      //PRUEBA
      re = new RegExp("[fF][0-9]+");
      while(instruction.search(re) != -1){
        re = new RegExp("[fF]([0-9]+)");
        var match = re.exec(instruction);
        re = new RegExp("[fF][0-9]+");
        instruction = instruction.replace(re, "Field"+match[1]);
      }


      for(var j = 0; j < signatureParts.length; j++){
        console_log(signatureParts[j]);
        switch(signatureParts[j]) {
          case "INT-Reg":
            token = instructionParts[j];

            console_log(token);

            var id = -1;
            re = new RegExp("[0-9]+");
            if(token.search(re) != -1){
              re = new RegExp("(.*?)$");
              match = re.exec(token);
              id = match[1];
            }

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "integer"){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = w;

                      if(reg.toString(2).length > fieldsLength){
                        /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        return -1;*/

                        return packCompileError(12, token, 'error', "danger") ;
                      }

                      console_log(reg)
                      console_log((reg.toString(2)).padStart(fieldsLength, "0"))
                      console_log(binary)
                      console_log(binary.length)
                      console_log(architecture.instructions[i].fields[a].startbit + 1)
                      console_log(binary.length - (architecture.instructions[i].fields[a].startbit + 1))

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      
                      console_log(binary);

                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(id == regNum){
                      validReg = true;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        return -1;*/
                        return packCompileError(12, token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      /*this.compileError(4, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;*/

                      return packCompileError(4, token, 'error', "danger") ;
                    }
                    regNum++;
                  }
                }
              }
            }

            break;

          case "SFP-Reg":
            token = instructionParts[j];

            console_log(token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        return -1;*/

                        return packCompileError(12, token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      console_log(instruction);
                      instruction = instruction.replace(re, token);
                      console_log(instruction);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      /*this.compileError(4, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;*/

                      return packCompileError(4, token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "DFP-Reg":
            token = instructionParts[j];

            console_log(token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        return -1;*/

                        return packCompileError(12, token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      /*this.compileError(4, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;*/

                      return packCompileError(4, token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "Ctrl-Reg":
            token = instructionParts[j];

            console_log(token)

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "control"){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                        return -1;*/

                        return packCompileError(12, token, 'error', "danger") ;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      /*this.compileError(4, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;*/

                      return packCompileError(4, token, 'error', "danger") ;
                    }
                    if(architecture.components[z].type == "control"){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "inm-signed":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
//aqui
fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);
/*
                if (!architecture.instructions[i].separated || !architecture.instructions[i].separated[a])
                  fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                else 
                  fieldsLength = architecture.instructions[i].fields[a].startbit
                    .map((b, iii) => b - architecture.instructions[i].fields[a].stopbit[iii]+1)
                    .reduce((old, newV) => old+newV);
*/
                
                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/
                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseFloat(token)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(token.match(/^\'(.*?)\'$/)){
                  var re = /^\'(.*?)\'$/;
                  console_log(re);
                  var match = re.exec(token);
                  console_log(match);
                  var asciiCode = match[1].charCodeAt(0);
                  console_log(asciiCode);

                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, asciiCode);

                  inm = (asciiCode >>> 0).toString(2);
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);

                  /*var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }
                  }*/

                  if(parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  console_log(inm.length);
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(12, token, 'error', "danger") ;
                  }

binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
/*
                  if (!architecture.instructions[i].separated || !architecture.instructions[i].separated[a])
                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  else {                            
                      // check if the value fit on the first segment
                      let myInm = inm; //it is created to evit edit the global variable
                      for (let index = architecture.instructions[i].fields[a].startbit.length-1; index >= 0;  index--) {
                          let sb = architecture.instructions[i].fields[a].startbit[index],
                              stb = architecture.instructions[i].fields[a].stopbit[index],
                              diff = sb - stb+1;
                          if (myInm.length <= diff) {
                              binary = binary.substring(0, binary.length - (sb+1)) +
                                  myInm.padStart(diff, "0") +
                                  binary.substring((binary.length - stb), binary.length);
                              break;
                          } else {
                              let tmpinm = inm.substring(myInm.length - diff, myInm.length);
                              binary = binary.substring(0, binary.length - (sb+1)) + tmpinm.padStart(diff, "0") + binary.substring(binary.length - stb, binary.length);
                              myInm = myInm.substring(0,(myInm.length-diff));
                          } 
                      }
                  }
*/
                }
                
                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                instruction = instruction.replace(re, token);
              }
            }

            break;

          case "inm-unsigned":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){

                if (!architecture.instructions[i].separated || !architecture.instructions[i].separated[a])
                  fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                else {
                  fieldsLength = architecture.instructions[i].fields[a].startbit
                    .map((b, iii) => b - architecture.instructions[i].fields[a].stopbit[iii]+1)
                    .reduce((old, newV) => old+newV);
                }

                //fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);
            
                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseFloat(token)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(token.match(/^\'(.*?)\'$/)){
                  var re = /^\'(.*?)\'$/;
                  console_log(re);
                  var match = re.exec(token);
                  console_log(match);
                  var asciiCode = match[1].charCodeAt(0);
                  console_log(asciiCode);

                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, asciiCode);

                  inm = (asciiCode >>> 0).toString(2);
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength);

                  console_log(comNumPos);

                  if(parseInt(token, 10) > comNumPos){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  console_log(inm.length);
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(12, token, 'error', "danger") ;
                  }

                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);

binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
/*
                  if (!architecture.instructions[i].separated[a])
                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  else {
                      // check if the value fit on the first segment
                      let myInm = inm; //it is created to evit edit the global variable
                      for (let index = architecture.instructions[i].fields[a].startbit.length-1; index >= 0;  index--) {
                          let sb = architecture.instructions[i].fields[a].startbit[index],
                              stb = architecture.instructions[i].fields[a].stopbit[index],
                              diff = sb - stb+1;
                          if (myInm.length <= diff) {
                              binary = binary.substring(0, binary.length - (sb+1)) +
                                  myInm.padStart(diff, "0") +
                                  binary.substring((binary.length - stb), binary.length);
                              break;
                          } else {
                              let tmpinm = inm.substring(myInm.length - diff, myInm.length);
                              binary = binary.substring(0, binary.length - (sb+1)) + tmpinm.padStart(diff, "0") + binary.substring(binary.length - stb, binary.length);
                              myInm = myInm.substring(0,(myInm.length-diff));
                          } 
                      }
                  }
*/
                }
            
                
                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                instruction = instruction.replace(re, token);
              }
            }

            break;

          case "address":
            token = instructionParts[j];

            console_log(token)

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
//aqui
fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);

                if(token.match(/^0x/)){
                  var value = token.split("x");

                  if(value[1].length*4 > fieldsLength){
                    /*this.compileError(8, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(8, token, 'error', "danger") ;
                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    /*this.compileError(9, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(9, token, 'error', "danger") ;
                  }

                  addr = (parseInt(token, 16)).toString(2);
                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + addr.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                  //re = RegExp("[fF][0-9]+");
                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, token);
                }
                else{
                  var validTag = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
              }
            }

            break;

          case "offset_bytes":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                  fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);
            
                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseFloat(token)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);






                  /*var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);*/

                  if(parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);
                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(12, token, 'error', "danger") ;
                  }

                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }
                
                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          case "offset_words":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);
            
                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }

                  }

                  if(isNaN(parseFloat(token)) == true){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else{

                  var comNumPos = Math.pow(2, fieldsLength-1);
                  var comNumNeg = comNumPos * (-1);
                  comNumPos = comNumPos -1;

                  console_log(comNumPos);
                  console_log(comNumNeg);


                  /*var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }
                  }*/

                  if(parseInt(token, 10) > comNumPos || parseInt(token, 10) < comNumNeg){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    /*if(resultPseudo == -1){
                      this.compileError(5, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }

                    if(resultPseudo == -2){
                      this.compileError(14, "", textarea_assembly_editor.posFromIndex(tokenIndex).line);
                      return -1;
                    }*/

                    if (resultPseudo.status != 'ok'){
                        return resultPseudo ;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    /*this.compileError(6, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(6, token, 'error', "danger") ;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                  inm = inm.substring(inm.length - fieldsLength ,inm.length);

                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    /*this.compileError(12, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                    return -1;*/

                    return packCompileError(12, token, 'error', "danger") ;
                  }

                  //binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm,fieldsLength, a);
                }
                
                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          default:
            token = instructionParts[j];

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              console_log(architecture.instructions[i].fields[a].name);
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                // Si el co es un array hay que separarlo
                /**/
                if (typeof(architecture.instructions[i].fields[a].startbit) == 'object') {
                    fieldsLength = architecture.instructions[i].fields[a].startbit.reduce((t, cv, ind) => {
                      t = !ind ? 0 : t;
                      t+(cv-architecture.instructions[i].fields[a].stopbit[ind]+1)
                    }); 
                    console_log(architecture.instructions[i].co.join("").padStart(fieldsLength, "0"));
                    // aqui_ahora
                } else {
                  fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
console_log((architecture.instructions[i].co).padStart(fieldsLength, "0"));
                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].co).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit), binary.length);
                }
                /*
                fieldsLength = getFieldLength(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit, architecture.instructions[i].fields[a].stopbit, a);
                let co =typeof(architecture.instructions[i].fields[a].startbit) == 'object' ?
                  architecture.instructions[i].co.join("").padStart(fieldsLength, "0") :
                  (architecture.instructions[i].co).padStart(fieldsLength, "0");
                binary = generateBinary(architecture.instructions[i].separated, architecture.instructions[i].fields[a].startbit,architecture.instructions[i].fields[a].stopbit,binary, inm, fieldsLength, a);
                */

                
                console_log(binary);

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
              if(architecture.instructions[i].fields[a].type == "cop"){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].fields[a].valueField).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
              }
            }

          break;
        }
      }

      if(validTagPC == false && resultPseudo == -3){
        console_log("pendiente");

        var padding = "";
        padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");
        binary = binary + padding;

        var hex = bin2hex(binary);
        var auxAddr = address;

        console_log(binary);
        console_log(bin2hex(binary));

      //pending_instructions.push({address: address, instruction: instruction, signature: signatureParts, signatureRaw: signatureRawParts, Label: label, binary: binary, startBit: startBit, stopBit: stopBit, visible: true, line: textarea_assembly_editor.posFromIndex(tokenIndex).line}); //TODO: revisar linea
        pending_instructions.push({address: address, instruction: instruction, signature: signatureParts, signatureRaw: signatureRawParts, Label: label, binary: binary, startBit: startBit, stopBit: stopBit, visible: true, line: line}); //TODO: line->ti?

        if(pending == false){
          instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
          instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

          address = address + (4*architecture.instructions[i].nwords);
        }
        else{
          for(var pos = 0; pos < instructions.length; pos++){
            if(parseInt(instructions[pos].Address, 16) > pendingAddress){
              instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
              instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

              auxAddr = pendingAddress;
              break;
            }
          }
        }

        console_log(address.toString(16));
        console_log(instructions);

        stopFor = true;
        break;
      }

      else{
        if(resultPseudo == -3){
          console_log("no pendiente")

          var padding = "";
          padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");

          binary = binary + padding;
          var hex = bin2hex(binary);
          var auxAddr = address;

          console_log(binary);
          console_log(bin2hex(binary));

          if(pending == false){
            instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
            instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

            address = address + (4*architecture.instructions[i].nwords);
          }
          else{
            for(var pos = 0; pos < instructions.length; pos++){
              if(parseInt(instructions[pos].Address, 16) > pendingAddress){
                instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
                instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

                auxAddr = pendingAddress;
                break;
              }
            }
          }

          stopFor = true;

          console_log(address.toString(16));
          console_log(instructions);
        }
      }
    }
  }

  return ret;
}

/*Compile pseudoinstructions*/
function pseudoinstruction_compiler ( instruction, label, line )
{
  var ret = {
          errorcode: "",
          token: "",
          type: "",
          update: "",
          status: "ok"
        } ;


  var re = /\' \'/;
  instruction = instruction.replace(re, "'\0'");
  var re = /\'\\n\'/;
  instruction = instruction.replace(re, "10");
  console_log(instruction);
  var re = /\'\\t\'/;
  instruction = instruction.replace(re, "9");
  console_log(instruction);

  var instructionParts = instruction.split(' ');
  var found = false;

  var re = /\'\0\'/;
  instruction = instruction.replace(re, "' '");
  console_log(instruction);


  for (var i = 0; i < instructionParts.length; i++) {
    instructionParts[i] = instructionParts[i].replace(re, "' '");
  }

  console_log(instructionParts);

  for (var i = 0; i < architecture.pseudoinstructions.length; i++){
    console_log(architecture.pseudoinstructions[i].name);
    if(architecture.pseudoinstructions[i].name != instructionParts[0]){
      continue;
    }

    else{
      found = true;

      var signatureDef = architecture.pseudoinstructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");


      var signatureParts = architecture.pseudoinstructions[i].signature.split(',');
      var signatureRawParts = architecture.pseudoinstructions[i].signatureRaw.split(' ');
      var definition = architecture.pseudoinstructions[i].definition;

      console_log(signatureDef);
      console_log(instruction);
      console_log(instructionParts);

      if(instructionParts.length < (architecture.pseudoinstructions[i].fields.length + 1)){
        for (var j = 0; j < ((architecture.pseudoinstructions[i].fields.length + 1)-instructionParts.length ); j++){
          next_token();
          token = get_token();

          console_log(token);

          if(token != null){
            var re = new RegExp(",+$");
            token = token.replace(re, "");
          }

          instruction = instruction + " " + token;
        }

        instructionParts = instruction.split(' ');
      }

      console_log(instruction);

      re = new RegExp(signatureDef+"$");
      console_log(re)
      if(instruction.search(re) == -1 && i == architecture.pseudoinstructions.length-1){
        //return -1;

        return packCompileError(5, token, 'error', "danger") ;
      }

      if(instruction.search(re) == -1 && i < architecture.pseudoinstructions.length-1){
        found = false;
      }

      if(found == true){
        re = /aliasDouble\((.*)\)/;
        for(var a = 0; a < architecture.pseudoinstructions[i].fields.length && definition.search(re) != -1; a++){
          re = new RegExp(architecture.pseudoinstructions[i].fields[a].name,"g");
          console_log(instructionParts[a+1]);
          instructionParts[a+1] = instructionParts[a+1].replace("$","");
          definition = definition.replace(re, instructionParts[a+1]);
        }

        /*Replace DFP of SPF*/
        re = /aliasDouble\((.*)\)/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          var args = match[1].split(";");
          var aux = "";

          for(var b = 0; b < architecture.components[3].elements.length; b++){
            console_log(architecture.components[3].elements[b].name); 
            if(architecture.components[3].elements[b].name == args[0]){
              aux = architecture.components[3].elements[b].simple_reg[args[1]];
              console_log(aux);
              break;
            }
          }
          console_log(aux);

          definition = definition.replace(re, aux);
          console_log(definition);

        }

        for (var j = 1; j < signatureRawParts.length; j++){
          var aux = signatureRawParts[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          re = new RegExp(aux,"g");
          definition = definition.replace(re, instructionParts[j]);
        }

        re = new RegExp("\n","g");
        definition = definition.replace(re, "");

        console_log(definition);
        console_log(signatureParts);

        re = /Field.(\d).\((.*?)\).(.*?)[=<>;\s]/;
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')";
          }

          var value;
          try{
            //eval("value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')");
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              //return -1;
              return packCompileError(5, token, 'error', "danger") ;
            }
          }

          if(value == -1){
            //return -1;
            return packCompileError(5, token, 'error', "danger") ;
          }

          definition = definition.replace("Field." + match[1] + ".(" + match[2]+ ")." + match[3], value);
          
          re = /Field.(\d).\((.*?)\).(.*?)[;\s]/;
        }


        re = /Field.(\d).SIZE[=<>;\s]/g;
        if (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', 'SIZE', null)");
            code = "value = field('" + asciiCode +"', 'SIZE', null)";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', 'SIZE', null)");
            code = "value = field('" + instructionParts[match[1]] +"', 'SIZE', null)";
          }

          var value;
          try{
            //eval("value = field('" + instructionParts[match[1]] +"', 'SIZE', null)");
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              return packCompileError(5, token, 'error', "danger") ;
            }
          }

          if(value == -1){
            return packCompileError(5, token, 'error', "danger") ;
          }

          console_log(value);
          console_log("Field." + match[1] + ".SIZE");

          definition = definition.replace("Field." + match[1] + ".SIZE", value);
        }

        console_log(definition);

        re = /op\((.*)\)/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          var result;

          console_log(match[1]);

          eval("result=" + match[1]);

          definition = definition.replace(re, result);
          console_log(definition);
        }

        while(definition.match(/\'(.*?)\'/)){
          var re = /\'(.*?)\'/;
          console_log(re);
          var match2 = re.exec(instructionParts[match[1]]);
          console_log(match2);
          var asciiCode = match2[1].charCodeAt(0);
          console_log(asciiCode);
          definition = definition.replace(re, asciiCode)
        }

        console_log(definition);

        console_log(instruction);
        var re = new RegExp("'","g");
        instruction = instruction.replace(re, '"');
        console_log(instruction);

        var re = /{([^}]*)}/g;
        var code = re.exec(definition);

        if(code != null){
          while(code != null){
            var instructions = code[1].split(";");
            console_log(instructions);

            for (var j = 0; j < instructions.length-1; j++){
              var aux;
              if(j == 0){
                aux = "if(instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true) == -1){error = true}";
              }
              else{
                aux = "if(instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true) == -1){error = true}";
              }
              definition = definition.replace(instructions[j]+";", aux+";\n");
            }
            code = re.exec(definition);
          }
        }
        else{
          var instructions = definition.split(";");

          for (var j = 0; j < instructions.length-1; j++){
            var aux;
            if(j == 0){
              aux = "if(instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true) == -1){error = true}";
            }
            else{
              aux = "if(instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true) == -1){error = true}";
            }
            definition = definition.replace(instructions[j]+";", aux+";\n");
          }
        }

        try{
          var error = false;
          console_log(definition);
          eval(definition);
          if(error == true){
            console_log("Error pseudo");
            //return -2;
            return packCompileError(14, "Error pseudoinstruction", 'error', "danger") ;
          }
          console_log("Fin pseudo");
          return ret;
        }
        catch(e){
          if (e instanceof SyntaxError) {
            //return -2;
            return packCompileError(14, "Error pseudoinstruction", 'error', "danger") ;
          }
        }
      }

    }
  }

  if(!found){
    //return -1;
    return packCompileError(5, token, 'error', "danger") ;
  }

  return ret;
}


/*Get pseudoinstruction fields*/
function field(field, action, type)
{
  console_log(field);
  console_log(action);
  console_log(type);
  
  if(action == "SIZE"){
    console_log("SIZE");

    if(field.match(/^0x/)){
      var value = field.split("x");
      return value[1].length*4;
    }
    else if (field.match(/^(\d)+\.(\d)+/)){
      return float2bin(parseFloat(field)).length;
    }
    else {
      var numAux = parseInt(field, 10);
      return (numAux.toString(2)).length;
    }
  }

  re = /\((.*?)\)/;
  if (action.search(re) != -1){
    var match = re.exec(action);
    var bits = match[1].split(",");
    var startBit = parseInt(bits[0]);
    var endBit = parseInt(bits[1]);

    if(field.match(/^0x/) && (type == "int" || type == "float")){
      var binNum = (parseInt(field, 16).toString(2));
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if(field.match(/^0x/) && (type == "double")){
      var binNum = double2bin(hex2double(field));
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if(type == "int"){
      var binNum = (parseInt(field, 10) >>> 0).toString(2);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "float"){
      var binNum = float2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "double"){
      var binNum = double2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }

  }
  return -1;
}


//TODO: funciones duplicadas en el app.js

/*Convert hexadecimal number to floating point number*/
function hex2float ( hexvalue )
{
  /*var sign     = (hexvalue & 0x80000000) ? -1 : 1;
  var exponent = ((hexvalue >> 23) & 0xff) - 127;
  var mantissa = 1 + ((hexvalue & 0x7fffff) / 0x800000);

  var valuef = sign * mantissa * Math.pow(2, exponent);
  if (-127 == exponent)
    if (1 == mantissa)
      valuef = (sign == 1) ? "+0" : "-0";
    else valuef = sign * ((hexvalue & 0x7fffff) / 0x7fffff) * Math.pow(2, -126);
  if (128 == exponent)
    if (1 == mantissa)
      valuef = (sign == 1) ? "+Inf" : "-Inf";
    else valuef = NaN;

  return valuef ;*/
  var value = hexvalue.split('x');
  var value_bit = '';

  for (var i = 0; i < value[1].length; i++){
    var aux = value[1].charAt(i);
    aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
    value_bit = value_bit + aux;
  }

  var buffer = new ArrayBuffer(4);
  new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map( binaryStringToInt ) );
  return new DataView( buffer ).getFloat32(0, false);
}

/*Convert hexadecimal number to double floating point number*/
function hex2double ( hexvalue )
{
  var value = hexvalue.split('x');
  var value_bit = '';

  for (var i = 0; i < value[1].length; i++){
    var aux = value[1].charAt(i);
    aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
    value_bit = value_bit + aux;
  }

  var buffer = new ArrayBuffer(8);
  new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map(binaryStringToInt ));
  return new DataView( buffer ).getFloat64(0, false);
}

/*Convert hexadecimal number to char*/
function hex2char8 ( hexvalue )
{
  var num_char = ((hexvalue.toString().length))/2;
  var exponent = 0;
  var pos = 0;

  var valuec = new Array();

  for (var i = 0; i < num_char; i++) {
    var auxHex = hexvalue.substring(pos, pos+2);
    valuec[i] = String.fromCharCode(parseInt(auxHex, 16));
    pos = pos + 2;
  }

  var characters = '';

  for (var i = 0; i < valuec.length; i++){
    characters = characters + valuec[i] + ' ';
  }

  return  characters;
}

/*Convert floating point number to binary*/
function float2bin (number)
{
  var i, result = "";
  var dv = new DataView(new ArrayBuffer(4));

  dv.setFloat32(0, number, false);

  for (i = 0; i < 4; i++) {
      var bits = dv.getUint8(i).toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      result += bits;
  }
  return result;
}

/*Convert double floating point number to binary*/
function double2bin(number) 
{
  var i, result = "";
  var dv = new DataView(new ArrayBuffer(8));

  dv.setFloat64(0, number, false);

  for (i = 0; i < 8; i++) {
      var bits = dv.getUint8(i).toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      result += bits;
  }
  return result;
}

/*Convert binary number to hexadecimal number*/
function bin2hex(s) 
{
  var i, k, part, accum, ret = '';
  for (i = s.length-1; i >= 3; i -= 4){

    part = s.substr(i+1-4, 4);
    accum = 0;
    for (k = 0; k < 4; k += 1){
      if (part[k] !== '0' && part[k] !== '1'){     
          return { valid: false };
      }
      accum = accum * 2 + parseInt(part[k], 10);
    }
    if (accum >= 10){
      ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
    } 
    else {
      ret = String(accum) + ret;
    }
  }

  if (i >= 0){
    accum = 0;
    for (k = 0; k <= i; k += 1){
      if (s[k] !== '0' && s[k] !== '1') {
          return { valid: false };
      }
      accum = accum * 2 + parseInt(s[k], 10);
    }
    ret = String(accum) + ret;
  }
  return ret;
}


/**
 * method in charge of return the length of the value. The most use are whene the field are fragment
 * this funciton is create with the intention of reduce errors on the code in case of add new fragments field
 * @return {int} the size of the field
*/
function getFieldLength(separated, startbit, stopbit,a) 
{
	let fieldsLength;
	if (!separated || !separated[a])
		fieldsLength = startbit - stopbit + 1;
	else 
		fieldsLength = startbit
		  .map((b, i) => b - stopbit[i]+1)
		  .reduce((old, newV) => old+newV);
	return fieldsLength;
}

/**
 * method in charge of return the binary instruction after add the inmediate value of the instruction
 * @return {string} the new binary update
*/
function generateBinary(separated, startbit, stopbit, binary, inm,fieldsLenght, a) 
{
	if (!separated ||!separated[a])
	    binary = binary.substring(0, binary.length - (startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (stopbit ), binary.length);
	else {                            
	    // check if the value fit on the first segment
	    let myInm = inm;
	    for (let i = startbit.length-1; i >= 0;  i--) {
		let sb = startbit[i],
		    stb = stopbit[i],
		    diff = sb - stb+1;
		if (myInm.length <= diff) {
		    binary = binary.substring(0, binary.length - (sb+1)) +
			myInm.padStart(diff, "0") +
			binary.substring((binary.length - stb), binary.length);
		    break;
		} else {
		    let tmpinm = inm.substring(myInm.length - diff, myInm.length);
		    binary = binary.substring(0, binary.length - (sb+1)) + tmpinm.padStart(diff, "0") + binary.substring(binary.length - stb, binary.length);
		    myInm = myInm.substring(0,(myInm.length-diff));
		} 
	    }
	}
	return binary;
}


/**
 * method in chage of map a float number separated in parts and determinte what it.
 * @param s {Number} the sing of the number
 * @param e {Number} the exponent of the number.
 * @param m {Number} the mantinsa of the number
 * @return {number} 2^n with n as
 *      0 -> -infinite
 *      1 -> -normal number
 *      2 -> -subnormal number
 *      3 -> -0
 *      4 -> +0
 *      5 -> +normal number
 *      6 -> +subnormal number
 *      7 -> +inf
 *      8 -> -NaN
 *      9 -> +NaN
 */
function checkTypeIEEE(s, e, m) 
{
    let rd = 0;

    if (!m && !e)
        rd = s ? 1<<3 : 1<<4;
    else if (!e)
        rd = s ? 1<<2 : 1<<5;
    else if (!(e ^ 255))
        if (m)
            rd = s ? 1<<8 : 1<<9;
        else
            rd = s ? 1<<0 : 1<<7;
    else
        rd = s ? 1<<1 : 1<<6;
    return rd;
}

function binaryStringToInt( b ) {
    return parseInt(b, 2);
}

/*
 *  Copyright 2018-2020 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// todo: draw_info y draw_space añadirlo a ret...
function packExecute ( error, err_msg, err_type, draw )
{
    var ret = {} ;

    ret.error    = error ;
    ret.msg      = err_msg ;
    ret.type     = err_type ;
    ret.draw     = draw ;

    return ret ;
}

function executeInstruction ( )
{
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;

        console_log(mutexRead);
        newExecution = false;

        do {
          console_log(executionIndex);
          console_log(architecture.components[0].elements[0].value);

          if (instructions.length == 0) {
              return packExecute(true, 'No instructions in memory', 'danger', null);
          }
          if (executionIndex < -1) {
              return packExecute(true, 'The program has finished', 'danger', null);
          }
          if (executionIndex == -1) {
              return packExecute(true, 'The program has finished with errors', 'danger', null);
          }
          else if (mutexRead == true) {
                   return packExecute(false, '', 'info', null);
               }

          /*Search a main tag*/
          if (executionInit == 1) {
            for (var i = 0; i < instructions.length; i++) {
              if (instructions[i].Label == "main") {
                  draw.success.push(executionIndex) ;
                  architecture.components[0].elements[0].value = bi_intToBigInt(instructions[i].Address, 16);
                  executionInit = 0;
                  break;
              }
              else if(i == instructions.length-1){
                executionIndex = -1;
                return packExecute(true, 'Label "main" not found', 'danger', null);
              }
            }
          }

          var error = 0;
          var index;

          for (var i = 0; i < instructions.length; i++){
            if(parseInt(instructions[i].Address, 16) == architecture.components[0].elements[0].value){
              executionIndex = i;

              console_log(instructions[executionIndex].hide)
              console_log(executionIndex)
              console_log(instructions[i].Address)

              if (instructions[executionIndex].hide == false) {
                  draw.info.push(executionIndex);
              }
            }
            else{
              if (instructions[executionIndex].hide == false) {
                  draw.space.push(i);
              }
            }
          }

          var instructionExec = instructions[executionIndex].loaded;
          var instructionExecParts = instructionExec.split(' ');

          var signatureDef;
          var signatureParts;
          var signatureRawParts;
          var nwords;
          var auxDef;
          var binary;

          /*Search the instruction to execute*/
          for (var i = 0; i < architecture.instructions.length; i++) {
            var auxSig = architecture.instructions[i].signatureRaw.split(' ');
            var type;
            var auxIndex;

            var numCop = 0;
            var numCopCorrect = 0;

            if(architecture.instructions[i].co == instructionExecParts[0].substring(0,6)){
              if(architecture.instructions[i].cop != null && architecture.instructions[i].cop != ''){
                for (var j = 0; j < architecture.instructions[i].fields.length; j++){
                  if (architecture.instructions[i].fields[j].type == "cop") {
                    numCop++;
                    if(architecture.instructions[i].fields[j].valueField == instructionExecParts[0].substring(((architecture.instructions[i].nwords*31) - architecture.instructions[i].fields[j].startbit), ((architecture.instructions[i].nwords*32) - architecture.instructions[i].fields[j].stopbit))){
                      numCopCorrect++;
                    }
                  }
                }
                if(numCop == numCopCorrect){
                  auxDef = architecture.instructions[i].definition;
                  nwords = architecture.instructions[i].nwords;
                  binary = true;
                  auxIndex = i;
                  break;
                }
              }
              else{
                auxDef = architecture.instructions[i].definition;
                nwords = architecture.instructions[i].nwords;
                binary = true;
                type = architecture.instructions[i].type;
                auxIndex = i;
                break;
              }
            }

            if(architecture.instructions[i].name == instructionExecParts[0] && instructionExecParts.length == auxSig.length){
              type = architecture.instructions[i].type;
              signatureDef = architecture.instructions[i].signature_definition;
              signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

              re = new RegExp("[fF][0-9]+", "g");
              signatureDef = signatureDef.replace(re, "(.*?)");

              re = new RegExp(",", "g");
              var signature = architecture.instructions[i].signature.replace(re, " ");

              re = new RegExp(signatureDef+"$");
              var match = re.exec(signature);
              var signatureParts = [];
              for(var j = 1; j < match.length; j++){
                signatureParts.push(match[j]);
              }

              match = re.exec(architecture.instructions[i].signatureRaw);
              var signatureRawParts = [];
              for(var j = 1; j < match.length; j++){
                signatureRawParts.push(match[j]);
              }

              console_log(signatureParts);
              console_log(signatureRawParts);

              auxDef = architecture.instructions[i].definition;
              nwords = architecture.instructions[i].nwords;
              binary = false;
              break;
            }
          }

          /*Increase PC*/
          architecture.components[0].elements[0].value = architecture.components[0].elements[0].value + bi_intToBigInt(nwords * 4,10) ;

          console_log(auxDef);

          // preload
          if (typeof instructions[executionIndex].preload === "undefined"){

            if(binary == false){
              re = new RegExp(signatureDef+"$");
              var match = re.exec(instructionExec);
              instructionExecParts = [];

              for(var j = 1; j < match.length; j++){
                instructionExecParts.push(match[j]);
              }

              console_log(instructionExecParts);

              /*Replace the value with the name of the register*/
              for (var i = 1; i < signatureRawParts.length; i++){
                /*if(signatureParts[i] == "inm"){
                  var re = new RegExp(signatureRawParts[i],"g");
                  auxDef = auxDef.replace(re, "bi_intToBigInt(" + instructionExecParts[i] + ",10)");
                }
                else{
                  var re = new RegExp(signatureRawParts[i],"g");
                  auxDef = auxDef.replace(re, instructionExecParts[i]);
                }*/

                var re1 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');
                var re2 = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');
                var re3 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                var prevSearchIndex;

                console_log(re1);
                console_log(re2);
                console_log(re3);

                while(auxDef.search(re1) != -1 || auxDef.search(re2) != -1 || auxDef.search(re3) != -1 && (auxDef.search(re1) != prevSearchIndex || auxDef.search(re2) != prevSearchIndex || auxDef.search(re3) != prevSearchIndex)){
                  console_log(signatureRawParts[i])
                  if(signatureParts[i] == "INT-Reg" || signatureParts[i] == "SFP-Reg" || signatureParts[i] == "DFP-Reg" || signatureParts[i] == "Ctrl-Reg"){
                    re = new RegExp("[0-9]{" + instructionExecParts[i].length + "}");
                    if(instructionExecParts[i].search(re) != -1){
                      var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re, match[1] + "R" + instructionExecParts[i] + match[2]);
                      }

                      var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re,"R" + instructionExecParts[i] + match[1]);
                      }

                      var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re, match[1] + "R" + instructionExecParts[i]);
                      }
                    }
                    else{
                      var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re, match[1] + instructionExecParts[i] + match[2]);
                      }

                      var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re, instructionExecParts[i] + match[1]);
                      }

                      var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                      if (auxDef.search(re) != -1){
                        match = re.exec(auxDef);
                        console_log(match)
                        auxDef = auxDef.replace(re, match[1] + instructionExecParts[i]);
                      }
                    }
                  }
                  else{
                    var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

                    if (auxDef.search(re) != -1){
                      prevSearchIndex = auxDef.search(re);
                      match = re.exec(auxDef);
                      console_log(match)
                      auxDef = auxDef.replace(re, match[1] + instructionExecParts[i] + match[2]);
                    }

                    var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

                    if (auxDef.search(re) != -1){
                      prevSearchIndex = auxDef.search(re);
                      match = re.exec(auxDef);
                      console_log(match)
                      auxDef = auxDef.replace(re, instructionExecParts[i] + match[1]);
                    }

                    var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                    if (auxDef.search(re) != -1){
                      prevSearchIndex = auxDef.search(re);
                      match = re.exec(auxDef);
                      console_log(match)
                      auxDef = auxDef.replace(re, match[1] + instructionExecParts[i]);
                    }
                  }
                  var re1 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');
                  var re2 = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');
                  var re3 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');
                }
              }
            }

            if(binary == true){
              console_log("Binary");

              for (var j = 0; j < architecture.instructions[auxIndex].fields.length; j++){
                console_log(instructionExecParts[0]);
                console_log(architecture.instructions[auxIndex].fields.length);
                if(architecture.instructions[auxIndex].fields[j].type == "INT-Reg" || architecture.instructions[auxIndex].fields[j].type == "SFP-Reg" || architecture.instructions[auxIndex].fields[j].type == "DFP-Reg" || architecture.instructions[auxIndex].fields[j].type == "Ctrl-Reg") {
                  console_log(instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit)));

                  for (var z = 0; z < architecture.components.length; z++){
                    console_log(architecture.components[z].type)
                    if(architecture.components[z].type == "control" && architecture.instructions[auxIndex].fields[j].type == "Ctrl-Reg"){
                      for (var w = 0; w < architecture.components[z].elements.length; w++){
                        var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                        console_log(auxLength);
                        console_log((w.toString(2)).padStart(auxLength, "0"));
                        if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){

                        }
                      }
                    }
                    if(architecture.components[z].type == "integer" && architecture.instructions[auxIndex].fields[j].type == "INT-Reg"){
                      for (var w = 0; w < architecture.components[z].elements.length; w++){
                        var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                        console_log(auxLength);
                        console_log((w.toString(2)).padStart(auxLength, "0"));
                        if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                          var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                          auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                        }
                      }
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false && architecture.instructions[auxIndex].fields[j].type == "SFP-Reg"){
                      for (var w = 0; w < architecture.components[z].elements.length; w++){
                        var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                        console_log(auxLength);
                        console_log((w.toString(2)).padStart(auxLength, "0"));
                        if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                          var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                          auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                        }
                      }
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true && architecture.instructions[auxIndex].fields[j].type == "DFP-Reg"){
                      for (var w = 0; w < architecture.components[z].elements.length; w++){
                        var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                        console_log(auxLength);
                        console_log((w.toString(2)).padStart(auxLength, "0"));
                        if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                          var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                          auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                        }
                      }
                    }
                  }
                }
                /*if(architecture.instructions[auxIndex].fields[j].type == "inm-signed"){
                  var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                  var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }*/
                if(architecture.instructions[auxIndex].fields[j].type == "inm-signed"){
                	var value = "";
                	if(architecture.instructions[auxIndex].separated && architecture.instructions[auxIndex].separated[j] == true){
                		for (var sep_index = 0; sep_index < architecture.instructions[auxIndex].fields[j].startbit.length; sep_index++) {
                			value = value + instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit[sep_index]), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit[sep_index]))
                		}
                	}
                	else{
                		value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                	}
                	var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }
                /*if(architecture.instructions[auxIndex].fields[j].type == "inm-unsigned"){
                  var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                  newValue = parseInt(newValue, 2) ;
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }*/
                if(architecture.instructions[auxIndex].fields[j].type == "inm-unsigned"){
                	var value = "";
                	if(architecture.instructions[auxIndex].separated && architecture.instructions[auxIndex].separated[j] == true){
                		for (var sep_index = 0; sep_index < architecture.instructions[auxIndex].fields[j].startbit.length; sep_index++) {
                			value = value + instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit[sep_index]), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit[sep_index]))
                		}
                	}
                	else{
                		value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                	}
                  newValue = parseInt(newValue, 2) ;
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }
                /*if(architecture.instructions[auxIndex].fields[j].type == "address"){
                  var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, parseInt(value, 2));
                }*/
                if(architecture.instructions[auxIndex].fields[j].type == "address"){
									var value = "";
                	if(architecture.instructions[auxIndex].separated && architecture.instructions[auxIndex].separated[j] == true){
                		for (var sep_index = 0; sep_index < architecture.instructions[auxIndex].fields[j].startbit.length; sep_index++) {
                			value = value + instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit[sep_index]), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit[sep_index]))
                		}
                	}
                	else{
                		value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                	}
                	var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, parseInt(value, 2));
                }
                /*if(architecture.instructions[auxIndex].fields[j].type == "offset_words"){
                  var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                  var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
//danger
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }*/
								if(architecture.instructions[auxIndex].fields[j].type == "offset_words"){
									var value = "";
                	if(architecture.instructions[auxIndex].separated && architecture.instructions[auxIndex].separated[j] == true){
                		for (var sep_index = 0; sep_index < architecture.instructions[auxIndex].fields[j].startbit.length; sep_index++) {
                			value = value + instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit[sep_index]), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit[sep_index]))
                		}
                	}
                	else{
                		value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                	}
                	var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
//danger
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }
                /*if(architecture.instructions[auxIndex].fields[j].type == "offset_bytes"){
                  var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                  var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
//danger
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }*/
                if(architecture.instructions[auxIndex].fields[j].type == "offset_bytes"){
                  var value = "";
                	if(architecture.instructions[auxIndex].separated &&  architecture.instructions[auxIndex].separated[j] == true){
                		for (var sep_index = 0; sep_index < architecture.instructions[auxIndex].fields[j].startbit.length; sep_index++) {
                			value = value + instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit[sep_index]), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit[sep_index]))
                		}
                	}
                	else{
                		value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
                	}
                	var valueSign = value.charAt(0);
                  var newValue =  value.padStart(32, valueSign) ;
                  newValue = parseInt(newValue, 2) ;
//danger
                  var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                  auxDef = auxDef.replace(re, newValue >> 0);
                }
              }
            }

            console_log(auxDef);

            /*Syscall*/
            var compIndex;
            var elemIndex;
            var compIndex2;
            var elemIndex2;

            console_log(auxDef);

            re = /print_int\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('print_int',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /print_float\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('print_float',"+compIndex+" , "+elemIndex+", null, null)");
            }


            re = /print_double\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('print_double',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /print_string\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('print_string',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /read_int\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('read_int',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /read_float\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('read_float',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /read_double\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('read_double',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /read_string\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              re = new RegExp(" ", "g");
              match[1] = match[1].replace(re, "");


              var auxMatch = match[1].split(',');

              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(auxMatch[0] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }

              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(auxMatch[1] == architecture.components[i].elements[j].name){
                    compIndex2 = i;
                    elemIndex2 = j;
                  }
                }
              }
              re = /read_string\((.*?)\)/
              auxDef = auxDef.replace(re, "syscall('read_string',"+compIndex+" , "+elemIndex+","+compIndex2+" , "+elemIndex2+")");
            }

            re = /sbrk\((.*?)\)/
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('sbrk',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /exit\((.*?)\)/;
            auxDef = auxDef.replace(re, "syscall('exit', null, null, null, null)");

            re = /print_char\((.*?)\)/;
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('print_char',"+compIndex+" , "+elemIndex+", null, null)");
            }

            re = /read_char\((.*?)\)/
            if (auxDef.search(re) != -1){
              match = re.exec(auxDef);
              for (var i = 0; i < architecture.components.length; i++){
                for (var j = 0; j < architecture.components[i].elements.length; j++){
                  if(match[1] == architecture.components[i].elements[j].name){
                    compIndex = i;
                    elemIndex = j;
                  }
                }
              }
              auxDef = auxDef.replace(re, "syscall('read_char',"+compIndex+" , "+elemIndex+", null, null)");
            }

            console_log(auxDef);

            /*Divides a double into two parts*/
            re = /splitDouble\((.*)\)/;
            while (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              match[1] = match[1].replace(";", ",");
              auxDef = auxDef.replace(re, "divDouble(" + match [1] + ")");
            }

            console_log(auxDef);

            /*Replaces the name of the register with its variable*/
            var regIndex = 0;
            var regNum = 0;

            for (var i = 0; i < architecture.components.length; i++){
              if(architecture.components[i].type == "integer"){
                regNum = architecture.components[i].elements.length-1;
              }
              for (var j = architecture.components[i].elements.length-1; j >= 0; j--){
                var re;
                let myMatch, isMatch=false;
                /*Write in the register*/

                /*TODO: Conflicto RISC-V*/
                re = new RegExp( "(?:\\W|^)((" + architecture.components[i].elements[j].name+") *=[^=])", "g");
                while ((myMatch = re.exec(auxDef)) != null) {
                    auxDef = auxDef.replace(myMatch[2], "reg"+regIndex)
                    auxDef = "var reg"+ regIndex +"= null\n"+ auxDef+"\nwriteRegister(reg"+ regIndex+", "+i+", "+j+");";
                    myMatch.index=0;
			isMatch = true;
                }
		      if (isMatch) regIndex++;

		      /*
                re = new RegExp(architecture.components[i].elements[j].name+" *=[^=]");
                if (auxDef.search(re) != -1){
                  re = new RegExp(architecture.components[i].elements[j].name+" *=","g");

                  auxDef = auxDef.replace(re, "reg"+ regIndex+"=");
                  auxDef = "var reg" + regIndex + "=null;\n" + auxDef;
                  auxDef = auxDef + "\n writeRegister(reg"+regIndex+","+i+" ,"+j+");"
                  regIndex++;
                }
		*/


                if(architecture.components[i].type == "integer"){
                  re = new RegExp("R"+regNum+" *=[^=]");
                  if (auxDef.search(re) != -1){
                    re = new RegExp("R"+regNum+" *=","g");
                    auxDef = auxDef.replace(re, "var reg"+ regIndex+"=");
                    auxDef = "var reg" + regIndex + "=null\n" + auxDef;
                    auxDef = auxDef + "\n writeRegister(reg"+regIndex+","+i+" ,"+j+");"
                    regIndex++;
                  }
                }

                /*Read in the register*/
                re = new RegExp("([^a-zA-Z0-9])" + architecture.components[i].elements[j].name + "(?!\.name)");
                while(auxDef.search(re) != -1){
                  var match = re.exec(auxDef);
                  auxDef = auxDef.replace(re, match[1] + "readRegister("+i+" ,"+j+")");
                }

                if(architecture.components[i].type == "integer"){
                  re = new RegExp("R"+regNum+"[^0-9]|[\\s]","g");
                  if(auxDef.search(re) != -1){
                    re = new RegExp("R"+regNum,"g");
                    auxDef = auxDef.replace(re, "readRegister("+i+" ,"+j+")");
                  }
                }

                if(architecture.components[i].type == "integer"){
                  regNum--;
                }
              }
            }

            /*Leave the name of the register*/
            re = new RegExp("\.name","g");
            auxDef = auxDef.replace(re, "");

            console_log(auxDef);

            /*Check if stack limit was modify*/
            re = /check_stack_limit\((.*)\)/;
            if (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              var args = match[1].split(";");
              re = new RegExp(" +", "g");
              for (var i = 0; i < args.length; i++) {
                args[i] = args[i].replace(re, "");
              }
              re = /check_stack_limit\((.*)\)/;
              auxDef = auxDef.replace(re, "");
              auxDef = auxDef + "\n\nif('"+args[0]+"'=='"+args[1]+"'){\n\tif(("+args[2]+") != architecture.memory_layout[4].value){\n\t\twriteStackLimit("+args[2]+")\n\t}\n}";
            }

            console_log(auxDef);

            /*Check if stack limit was modify*/
            re = /assert\((.*)\)/;
            if (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              var args = match[1].split(";");
              auxDef = auxDef.replace(re, "");
              auxDef = "var exception = 0;\nif("+ args[0] +"){}else{exception=app.exception("+ args[1] +");}\nif(exception==0){" + auxDef + "}";
            }

            console_log(auxDef);

            /*Write in memory*/
            re = /MP.([whbd]).\[(.*?)\] *=/;
            while (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              var auxDir;
              //eval("auxDir="+match[2]);

              re = /MP.[whbd].\[(.*?)\] *=/;
              auxDef = auxDef.replace(re, "dir=");
              auxDef = "var dir=null\n" + auxDef;
              auxDef = auxDef + "\n writeMemory(dir"+","+match[2]+",'"+match[1]+"');"
              re = /MP.([whb]).\[(.*?)\] *=/;
            }

            re = new RegExp("MP.([whbd]).(.*?) *=");
            while (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              re = new RegExp("MP."+match[1]+"."+match[2]+" *=");
              auxDef = auxDef.replace(re, "dir=");
              auxDef = "var dir=null\n" + auxDef;
              auxDef = auxDef + "\n writeMemory(dir,"+match[2]+",'"+match[1]+"');"
              re = new RegExp("MP.([whbd]).(.*?) *=");
            }

            re = /MP.([whbd]).\[(.*?)\]/;
            while (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              var auxDir;
              //eval("auxDir="+match[2]);
              re = /MP.[whbd].\[(.*?)\]/;
              auxDef = auxDef.replace(re, "readMemory("+match[2]+", '"+match[1]+"')");
              re = /MP.([whbd]).\[(.*?)\]/;
            }

            re = new RegExp("MP.([whbd]).([0-9]*[a-z]*[0-9]*)");
            while (auxDef.search(re) != -1){
              var match = re.exec(auxDef);
              re = new RegExp("MP."+match[1]+"."+match[2]);
              auxDef = auxDef.replace(re, "readMemory("+match[2]+",'"+match[1]+"')");
              re = new RegExp("MP.([whb]).([0-9]*[a-z]*[0-9]*)");
            }

            console_log(auxDef);

            // preload instruction
	    eval("instructions[" + executionIndex + "].preload = function(elto) { " + 
      	        "try {\n" +
      	           auxDef.replace(/this./g,"elto.") + "\n" +
      	        "}\n" +
      	        "catch(e){\n" +
      	        "  return e;\n" +
              	"}\n" +
      	        " }; ") ;        
          }


          try{
            var result = instructions[executionIndex].preload(this);
            if (result.error) {
                return result;
            }
          }
          catch(e)
          {
              if (e instanceof SyntaxError) 
              {
                  console_log("Error");
                  error = 1;
                  draw.danger.push(executionIndex) ;
                  executionIndex = -1;
                  return packExecute(true, 'The definition of the instruction contains errors, please review it', 'danger', null);
              }
          }

          /*Refresh stats*/
          for (var i = 0; i < stats.length; i++){
            if(type == stats[i].type){
              stats[i].number_instructions++;
              stats_value[i] ++;
              totalStats++;
              if (typeof app !== "undefined")
                  app._data.totalStats++;
            }
          }
          for (var i = 0; i < stats.length; i++){
               stats[i].percentage = (stats[i].number_instructions/totalStats)*100;
          }

          /*Execution error*/
          if (executionIndex == -1){
             error = 1;
             return packExecute(false, '', 'info', null); //CHECK
             //return;
          }

          /*Next instruction to execute*/
          if (error != 1 && executionIndex < instructions.length)
          {
            for (var i = 0; i < instructions.length; i++){
              if (parseInt(instructions[i].Address, 16) == architecture.components[0].elements[0].value) {
                  executionIndex = i;
                  draw.success.push(executionIndex) ;
                  break;
              }
              else if (i == instructions.length-1 && mutexRead == true){
                       executionIndex = instructions.length+1;
              }
              else if (i == instructions.length-1){
                       draw.space.push(executionIndex) ;
                       executionIndex = instructions.length+1;
              }
            }
          }

          console_log(executionIndex);

          if (executionIndex >= instructions.length && mutexRead == true)
          {
              for (var i = 0; i < instructions.length; i++) {
	  	   draw.space.push(i);
              }
              return packExecute(false, 'The execution of the program has finished', 'success', draw); //CHECK
          }
          else if(executionIndex >= instructions.length && mutexRead == false)
          {
            for (var i = 0; i < instructions.length; i++){
                 draw.space.push(i) ;
            }

            executionIndex = -2;
            return packExecute(false, 'The execution of the program has finished', 'success', draw);
          }
          else{
            if(error != 1){
              draw.success.push(executionIndex);
            }
          }
          console_log(executionIndex) ;
        }
        while(instructions[executionIndex].hide == true) ;

        return packExecute(false, null, null, draw) ;
}

function executeProgramOneShot ( limit_n_instructions )
{
    var ret = null;

    // execute program
    for (var i=0; i<limit_n_instructions; i++)
    {
       ret = executeInstruction();

       if (ret.error == true){
           return ret;
       }
       if (executionIndex < -1) {
           return ret;
       }
    }

    return packExecute(true, '"ERROR:" number of instruction limit reached :-(', null, null) ;
}

/*Read register value*/
function readRegister ( indexComp, indexElem )
{
	    var draw = {
		  space: [] ,
		  info: [] ,
		  success: [] ,
		  danger: [],
		  flash: []
		} ;

      if ((architecture.components[indexComp].elements[indexElem].properties[0] != "read") && 
          (architecture.components[indexComp].elements[indexElem].properties[1] != "read"))
      {
	    for (var i = 0; i < instructions.length; i++) {
		 draw.space.push(i);
	    }

	    draw.danger.push(executionIndex);

            executionIndex = -1;

            throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be read', 'danger', draw);    
        }

        if ((architecture.components[indexComp].type == "control") || 
            (architecture.components[indexComp].type == "integer"))
        {
            console_log(parseInt((architecture.components[indexComp].elements[indexElem].value).toString()));
            return parseInt((architecture.components[indexComp].elements[indexElem].value).toString());
        }

        if (architecture.components[indexComp].type == "floating point")
        {
            return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString());
        }
}

/*Write value in register*/
function writeRegister ( value, indexComp, indexElem )
{
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;

        if (value == null) {
            return;
        }

        if ((architecture.components[indexComp].type == "integer") ||
            (architecture.components[indexComp].type == "control"))
        {
            if ((architecture.components[indexComp].elements[indexElem].properties[0] != "write") &&
                (architecture.components[indexComp].elements[indexElem].properties[1] != "write"))
            {
/*
                show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger') ;
                instructions[executionIndex]._rowVariant = 'danger';
                executionIndex = -1;
                return;
*/
	        for (var i = 0; i < instructions.length; i++) {
	  	     draw.space.push(i);
	        }
	        draw.danger.push(executionIndex);

	        executionIndex = -1;
	        throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', draw);
            }

            architecture.components[indexComp].elements[indexElem].value = bi_intToBigInt(value,10);

            var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name  + "Int";
            var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

            $(buttonDec).attr("class", "btn btn-outline-secondary btn-block btn-sm modRegister");
            $(buttonHex).attr("class", "btn btn-outline-secondary btn-block btn-sm modRegister");

            setTimeout(function() {
              $(buttonDec).attr("class", "btn btn-outline-secondary btn-block btn-sm registers");
              $(buttonHex).attr("class", "btn btn-outline-secondary btn-block btn-sm registers");
            }, 500);
        }

        else if (architecture.components[indexComp].type =="floating point")
        {
          if (architecture.components[indexComp].double_precision == false)
          {
            if (architecture.components[indexComp].elements[indexElem].properties[0] != "write" && architecture.components[indexComp].elements[indexElem].properties[1] != "write")
            {
                throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', null);
            }

            architecture.components[indexComp].elements[indexElem].value = parseFloat(value);

            this.updateDouble(indexComp, indexElem);

            var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name + "FP";
            var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

            $(buttonDec).attr("style", "background-color:#c2c2c2;");
            $(buttonHex).attr("style", "background-color:#c2c2c2;");

            setTimeout(function() {
              $(buttonDec).attr("style", "background-color:#f5f5f5;");
              $(buttonHex).attr("style", "background-color:#f5f5f5;");
            }, 500);
          }

          else if (architecture.components[indexComp].double_precision == true)
          {
            if (architecture.components[indexComp].elements[indexElem].properties[0] != "write" && architecture.components[indexComp].elements[indexElem].properties[1] != "write")
            {
/*
	        show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger') ;
                return;
*/
                throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', null);
            }

            architecture.components[indexComp].elements[indexElem].value = parseFloat(value);

            this.updateSimple(indexComp, indexElem);

      if (!window.document)
      {
            var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name + "DFP";
            var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

            $(buttonDec).attr("style", "background-color:#c2c2c2;");
            $(buttonHex).attr("style", "background-color:#c2c2c2;");

            setTimeout(function() {
              $(buttonDec).attr("style", "background-color:#f5f5f5;");
              $(buttonHex).attr("style", "background-color:#f5f5f5;");
            }, 500);
      } // if

          }
        }
}

/*Read memory value*/
function readMemory ( addr, type )
{
        var memValue = '';
        var index;
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;


	if (type == "d") {
	    debugger;

          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }
          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value) index = memory_hash[0];

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value) index = memory_hash[2];

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
		for (let k = 0; k<2; k++)
			for (var z = 0; z < memory[index][i].Binary.length; z++)
				  memValue = memory[index][k].Binary[z].Bin + memValue;
                //return bi_intToBigInt(memValue, 16) ;
		return parseInt(memValue, 16);
              }
            }
          }
	return 0;
	}

        if (type == "w"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                for (var z = 0; z < memory[index][i].Binary.length; z++){
                  memValue = memory[index][i].Binary[z].Bin + memValue;
                }
                //return bi_intToBigInt(memValue, 16) ;
                return parseInt(memValue,16);
              }
            }
          }
          //return bi_intToBigInt(0,10) ;
          return 0;
        }

        if (type == "h"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                if(j < 2){
                  for (var z = 0; z < memory[index][i].Binary.length -2; z++){
                    memValue = memory[index][i].Binary[z].Bin + memValue;
                  }
                  //return bi_intToBigInt(memValue, 16) ;
                  return parseInt(memValue,16);
                }
                else{
                  for (var z = 2; z < memory[index][i].Binary.length; z++){
                    memValue = memory[index][i].Binary[z].Bin + memValue;
                  }
                  //return bi_intToBigInt(memValue, 16) ;
                  return parseInt(memValue,16);
                }
              }
            }
          }
          //return bi_intToBigInt(0,10) ;
          return 0;
        }

        if (type == "b"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                memValue = memory[index][i].Binary[j].Bin + memValue;
                //return bi_intToBigInt(memValue, 16) ;
                return parseInt(memValue,16);
              }
            }
          }
          //return bi_intToBigInt(0,10) ;
          return 0;
        }
}

/*Write value in memory*/
function writeMemory ( value, addr, type )
{
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;

        if (value == null) {
            return;
        }

        var memValue = (value.toString(16)).padStart(8, "0");
        var index;

        if (type == "w"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                //memory[index][i].Value = parseInt(memValue, 16);
                if(memory[index][i].type == "float"){
                  memory[index][i].Value = this.hex2float("0x" + memValue);
                }
                else{
                  memory[index][i].Value = (parseInt(memValue, 16) >> 0);
                }

                var charIndex = memValue.length-1;
                for (var z = 0; z < memory[index][i].Binary.length; z++){
                  memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                  charIndex = charIndex - 2;
                }
                //memory[index][i].Value = parseInt(memValue, 16);

                if(memory[index][i].type == "float"){
                  memory[index][i].Value = this.hex2float("0x" + memValue);
                }
                else{
                  memory[index][i].Value = (parseInt(memValue, 16) >> 0);
                }

                if (typeof app !== "undefined")
                    app._data.memory[index] = memory[index];
                return;
              }
            }
          }

          for (var i = 0; i < memory[index].length; i++){
            if(memory[index][i].Address > parseInt(addr, 16)){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
                charIndex = charIndex - 2;
              }
              if (typeof app !== "undefined")
                  app._data.memory[index] = memory[index];
              return;
            }
            else if(i == memory[index].length-1){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
                charIndex = charIndex - 2;
              }
              if (typeof app !== "undefined")
                  app._data.memory[index] = memory[index];
              return;
            }
          }

          if(memory[index].length == 0){
            var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
            memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
            var charIndex = memValue.length-1;
            for (var z = 0; z < 4; z++){
              (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
              charIndex = charIndex - 2;
            }
            if (typeof app !== "undefined")
                app._data.memory[index] = memory[index];
            return;
          }
        }

        if (type == "h"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                 if(j < 2){
                  var charIndex = memValue.length-1;
                  for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
                    memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                    charIndex = charIndex - 2;
                  }

                  memory[index][i].Value = null;
                  for (var z = 3; z < 4; z=z-2){
                    memory[index][i].Value = memory[index][i].Value + (parseInt((memory[index][i].Binary[z].Bin + memory[index][i].Binary[z-1].Bin), 16) >> 0) + " ";
                  }
                  if (typeof app !== "undefined")
                      app._data.memory[index] = memory[index];
                  return;
                }
                else{
                  var charIndex = memValue.length-1;
                  for (var z = 2; z < memory[index][i].Binary.length; z++){
                    memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                    charIndex = charIndex - 2;
                  }
                  if (typeof app !== "undefined")
                      app._data.memory[index] = memory[index];
                  return;
                }
              }
            }
          }

          for (var i = 0; i < memory[index].length; i++){
            if(memory[index][i].Address > parseInt(addr, 16)){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
              }
              for (var j = 0; j < memory[index][i].Binary.length; j++){
                var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
                if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                   if(j < 2){
                    var charIndex = memValue.length-1;
                    for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
                      memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                      charIndex = charIndex - 2;
                    }
                    memory[index][i].Value = "0 " + (parseInt(memValue, 16) >> 0);
                    if (typeof app !== "undefined")
                        app._data.memory[index] = memory[index];
                    return;
                  }
                  else{
                    var charIndex = memValue.length-1;
                    for (var z = 2; z < memory[index][i].Binary.length; z++){
                      memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                      charIndex = charIndex - 2;
                    }
                    memory[index][i].Value = (parseInt(memValue, 16) >> 0) + " 0";
                    if (typeof app !== "undefined")
                        app._data.memory[index] = memory[index];
                    return;
                  }
                }
              }
              return;
            }
            else if(i == memory[index].length-1){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
              }
              for (var j = 0; j < memory[index][i+1].Binary.length; j++){
                var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
                if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
                   if(j < 2){
                    var charIndex = memValue.length-1;
                    for (var z = 0; z < memory[index][i+1].Binary.length - 2; z++){
                      memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                      charIndex = charIndex - 2;
                    }
                    memory[index][i+1].Value = "0 " + (parseInt(memValue, 16) >> 0);
                    if (typeof app !== "undefined")
                        app._data.memory[index] = memory[index];
                    return;
                  }
                  else{
                    var charIndex = memValue.length-1;
                    for (var z = 2; z < memory[index][i].Binary.length; z++){
                      memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                      charIndex = charIndex - 2;
                    }
                    memory[index][i+1].Value = parseInt(memValue, 16) + " 0";
                    if (typeof app !== "undefined")
                        app._data.memory[index] = memory[index];
                    return;
                  }
                }
              }
              return;
            }
          }

          if(memory[index].length == 0){
            var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
            memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
            var charIndex = memValue.length-1;
            for (var z = 0; z < 4; z++){
              (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
            }
            for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
              var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
                 if(j < 2){
                  var charIndex = memValue.length-1;
                  for (var z = 0; z < memory[index][memory[index].length-1].Binary.length - 2; z++){
                    memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                    charIndex = charIndex - 2;
                  }
                  memory[index][memory[index].length-1].Value = "0 " + (parseInt(memValue, 16) >> 0);
                  if (typeof app !== "undefined")
                      app._data.memory[index] = memory[index];
                  return;
                }
                else{
                  var charIndex = memValue.length-1;
                  for (var z = 2; z < memory[index][i].Binary.length; z++){
                    memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                    charIndex = charIndex - 2;
                  }
                  memory[index][memory[index].length-1].Value = (parseInt(memValue, 16) >> 0) + " 0";
                  if (typeof app !== "undefined")
                      app._data.memory[index] = memory[index];
                  return;
                }
              }
            }
            return;
          }
        }

        if (type == "b"){
          if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }

          if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
            index = memory_hash[0];
          }

          if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
            index = memory_hash[2];
          }

          for (var i = 0; i < memory[index].length; i++){
            for (var j = 0; j < memory[index][i].Binary.length; j++){
              var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                var charIndex = memValue.length-1;
                memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                memory[index][i].Value = null;
                for (var z = 3; z < 4; z--){
                  memory[index][i].Value = memory[index][i].Value + parseInt(memory[index][i].Binary[z].Bin, 16) + " ";
                }
                return;
              }
            }
          }

          for (var i = 0; i < memory[index].length; i++){
            if(memory[index][i].Address > parseInt(addr, 16)){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
              }
              for (var j = 0; j < memory[index][i].Binary.length; j++){
                var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
                if(aux == addr || memory[index][i].Binary[j].Tag == addr){
                  var charIndex = memValue.length-1;
                  memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                  for (var z = 3; z < 4; z--){
                    memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
                  }
                  return;
                }
              }
              return;
            }
            else if(i == memory[index].length-1){
              var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
              memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
              var charIndex = memValue.length-1;
              for (var z = 0; z < 4; z++){
                (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
              }
              for (var j = 0; j < memory[index][i+1].Binary.length; j++){
                var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
                if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
                  var charIndex = memValue.length-1;
                  memory[index][i+1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                  for (var z = 3; z < 4; z--){
                    memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
                  }
                  return;
                }
              }
              return;
            }
          }

          if(memory[index].length == 0){
            var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
            memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
            var charIndex = memValue.length-1;
            for (var z = 0; z < 4; z++){
              (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
            }
            for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
              var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
              if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
                var charIndex = memValue.length-1;
                memory[index][memory[index].length-1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                for (var z = 3; z < 4; z--){
                  memory[index][memory[index].length-1].Value = memory[index][memory[index].length-1].Value + parseInt(memory[index][memory[index].length-1].Binary[z].Bin, 16) + " ";
                }
                return;
              }
            }
            return;
          }
        }
}

/*Modify the stack limit*/
function writeStackLimit ( stackLimit )
{
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;

        if(stackLimit != null){
          if(stackLimit <= architecture.memory_layout[3].value && stackLimit >= architecture.memory_layout[2].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }
          else if(stackLimit <= architecture.memory_layout[1].value && stackLimit >= architecture.memory_layout[0].value){
	    draw.danger.push(executionIndex);
            executionIndex = -1;
            throw packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
          }
          else{
            if(stackLimit < architecture.memory_layout[4].value){
              var diff = architecture.memory_layout[4].value - stackLimit;
              var auxStackLimit = stackLimit;

              for (var i = 0; i < (diff/4); i++){
                if(unallocated_memory.length > 0){
                  memory[memory_hash[2]].splice(i, 0, unallocated_memory[unallocated_memory.length-1]);
                  memory[memory_hash[2]][0].unallocated = false;
                  unallocated_memory.splice(unallocated_memory.length-1, 1);
                }
                else{
                  memory[memory_hash[2]].splice(i, 0,{Address: auxStackLimit, Binary: [], Value: null, DefValue: null, reset: true, unallocated: false});
                  for (var z = 0; z < 4; z++){
                    (memory[memory_hash[2]][i].Binary).push({Addr: auxStackLimit, DefBin: "00", Bin: "00", Tag: null},);
                    auxStackLimit++;
                  }
                }
              }
            }
            else if(stackLimit > architecture.memory_layout[4].value){
              var diff = stackLimit - architecture.memory_layout[4].value;
              for (var i = 0; i < (diff/4); i++){
                unallocated_memory.push(memory[memory_hash[2]][0]);
                unallocated_memory[unallocated_memory.length-1].unallocated = true;
                if (typeof app !== "undefined")
                    app._data.unallocated_memory = unallocated_memory;
                memory[memory_hash[2]].splice(0, 1);
                if(unallocated_memory.length > 20){
                  unallocated_memory.splice(0, 15);
                }
              }
            }

            architecture.memory_layout[4].value = stackLimit;

          }
        }
}

/*Syscall*/
function syscall ( action, indexComp, indexElem, indexComp2, indexElem2 )
{
	  var draw = {
	    space: [] ,
	    info: [] ,
	    success: [] ,
	    danger: [],
	    flash: []
	  } ;

        switch(action)
        {
          case "print_int":
               var value   = architecture.components[indexComp].elements[indexElem].value;
               var val_int = parseInt(value.toString()) >> 0 ;

               if (typeof app !== "undefined")
                    app._data.display += val_int ;
               else console.log(val_int) ; //process.stdout.write(val_int) ;
               break;

          case "print_float":
               var value = architecture.components[indexComp].elements[indexElem].value;

               if (typeof app !== "undefined")
                    app._data.display += value;
               else console.log(value) ; //process.stdout.write(value) ;
               break;

          case "print_double":
               var value = architecture.components[indexComp].elements[indexElem].value;
               if (typeof app !== "undefined")
                    app._data.display += value;
               else console.log(value) ; //process.stdout.write(value) ;
               break;

          case "print_string":
               var addr = architecture.components[indexComp].elements[indexElem].value;
               var index;

               if((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value){
                 executionIndex = -1;
                 this.keyboard = "";
                 return packExecute(true, 'Segmentation fault. You tried to write in the text segment', 'danger', null);
               }

               if((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
                 index = memory_hash[0];
               }

               if((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
                 index = memory_hash[2];
               }

            for (var i = 0; i < memory[index].length; i++){
              for (var j = 0; j < memory[index][i].Binary.length; j++){
                var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
                if(aux == addr){
                  for (var i; i < memory[index].length; i++){
                    for (var k = j; k < memory[index][i].Binary.length; k++)
                    {
                      console_log(parseInt(memory[index][i].Binary[k].Bin, 16));
                      console_log(String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16)));

                      if (typeof app !== "undefined")
                           app._data.display += String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16));
                      else process.stdout.write(String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16)));

                      if(memory[index][i].Binary[k].Bin == 0){
                        //return
                        return packExecute(false, 'printed', 'info', null);
                      }
                      else if(i == memory[index].length-1 && k == memory[index][i].Binary.length-1){
                        //return;
                        return packExecute(false, 'printed', 'info', null);
                      }
                      j=0;
                    }
                  }
                }
              }
            }

               break;

          case "read_int":

                // CL
                if (typeof app === "undefined") 
                {
		    var readlineSync = require('readline-sync') ;
		    var keystroke    = readlineSync.question(' read integer> ') ;
                    var value        = parseInt(keystroke) ;

                    writeRegister(value, indexComp, indexElem);
                    return packExecute(false, 'The data has been uploaded', 'danger', null);
                }

                // UI
                mutexRead = true;
                app._data.enter = false;
    
                console_log(mutexRead);
                if (newExecution == true) {
                    this.keyboard = "";
                    consoleMutex  = false;
                    mutexRead     = false;
                    app._data.enter = null;
    
    	            show_notification('The data has been uploaded', 'info') ;
    
                    if (runExecution == false) {
                        app.executeProgram();
                    }
    
                    return packExecute(false, 'The data has been uploaded', 'danger', null);
                }
    
                if (consoleMutex == false) {
                    setTimeout(syscall, 1000, "read_int", indexComp, indexElem, indexComp2, indexElem2);
                }
                else {
                  var value = parseInt(this.keyboard);
                  console_log(value);
                  writeRegister(value, indexComp, indexElem);
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if (executionIndex >= instructions.length)
                  {
                     for (var i = 0; i < instructions.length; i++) {
                          draw.space.push(i) ;
                     }
                     executionIndex = -2;
                     return packExecute(true, 'The execution of the program has finished', 'success', null);
                  }
                  else if (runExecution == false) {
                           app.executeProgram();
                  }
                }
    
                break;

          case "read_float":

                // CL
                if (typeof app === "undefined") 
                {
		    var readlineSync = require('readline-sync') ;
		    var keystroke    = readlineSync.question(' read integer> ') ;
                    var value        = parseFloat(keystroke) ;

                    writeRegister(value, indexComp, indexElem);
                    return packExecute(false, 'The data has been uploaded', 'danger', null);
                }

                mutexRead = true;
                app._data.enter = false;
                console_log(mutexRead);
                if(newExecution == true){
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if (runExecution == false){
                      app.executeProgram();
                  }
    
                  return;
                }
    
                if (consoleMutex == false) {
                    setTimeout(this.syscall, 1000, "read_float", indexComp, indexElem, indexComp2, indexElem2);
                }
                else{
                  var value = parseFloat(this.keyboard, 10);
                  console_log(value);
                  writeRegister(value, indexComp, indexElem);
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if(executionIndex >= instructions.length){
                    for (var i = 0; i < instructions.length; i++) {
                         draw.space.push(i) ;
                    }
    
                    executionIndex = -2;
                    return packExecute(true, 'The execution of the program has finished', 'success', null);
                  }
                  else if (runExecution == false){
                           app.executeProgram();
                  }
                }
    
                break;

          case "read_double":

                // CL
                if (typeof app === "undefined") 
                {
		    var readlineSync = require('readline-sync') ;
		    var keystroke    = readlineSync.question(' read integer> ') ;
                    var value        = parseFloat(keystroke) ;

                    writeRegister(value, indexComp, indexElem);
                    return packExecute(false, 'The data has been uploaded', 'danger', null);
                }

                mutexRead = true;
                app._data.enter = false;
                console_log(mutexRead);
                if(newExecution == true){
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if (runExecution == false){
                      app.executeProgram();
                  }
    
                  return;
                }
    
                if (consoleMutex == false) {
                    setTimeout(this.syscall, 1000, "read_double", indexComp, indexElem, indexComp2, indexElem2);
                }
                else{
                  var value = parseFloat(this.keyboard, 10);
                  console_log(value);
                  writeRegister(value, indexComp, indexElem);
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if(executionIndex >= instructions.length){
                    for (var i = 0; i < instructions.length; i++) {
                         draw.space.push(i) ;
                    }
    
                    executionIndex = -2;
                    return packExecute(true, 'The execution of the program has finished', 'success', null);
                  }
                  else if (runExecution == false){
                           app.executeProgram();
                  }
    
                  break;
                }
    
                break;

          case "read_string":

               // TODO: review for command line

               mutexRead = true;
               if (typeof app !== "undefined")
                   app._data.enter = false;
               console_log(mutexRead);
                if (newExecution == true){
                   this.keyboard = "";
                   consoleMutex = false;
                   mutexRead = false;
                   if (typeof app !== "undefined")
                       app._data.enter = null;
    
                   if (window.document)
    	 	   show_notification('The data has been uploaded', 'info') ;
    
                   if (runExecution == false){
                       if (typeof app !== "undefined")
                           app.executeProgram();
                   }
    
                   return;
                }
    
                if (consoleMutex == false){
                    setTimeout(this.syscall, 1000, "read_string", indexComp, indexElem, indexComp2, indexElem2);
                }
                else{
                  var addr = architecture.components[indexComp].elements[indexElem].value;
                  var value = "";
                  var valueIndex = 0;
    
                  for (var i = 0; i < architecture.components[indexComp2].elements[indexElem2].value && i < this.keyboard.length; i++) {
                    value = value + this.keyboard.charAt(i);
                  }
    
                  console_log(value);
    
                  var auxAddr = data_address;
                  var index;
    
                  if((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value){
                    executionIndex = -1;
                    this.keyboard = "";
                    return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
                  }
    
                  if((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
                    index = memory_hash[0];
                  }
    
                  if((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
                    index = memory_hash[2];
                  }
    
                  for (var i = 0; i < memory[index].length && this.keyboard.length > 0; i++){
                    for (var j = 0; j < memory[index][i].Binary.length; j++){
                      var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
                      if(aux == addr){
                        for (var j = j; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
                          memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
                          auxAddr = memory[index][i].Binary[j].Addr;
                          valueIndex++;
                          addr++;
                        }
    
                        memory[index][i].Value = "";
                        for (var j = 0; j < memory[index][i].Binary.length; j++){
                          memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
                        }
    
                        if((i+1) < memory[index].length && valueIndex < value.length){
                          i++;
                          for (var j = 0; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
                            memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
                            auxAddr = memory[index][i].Binary[j].Addr;
                            valueIndex++;
                            addr++;
                          }
    
                          memory[index][i].Value = "";
                          for (var j = 0; j < memory[index][i].Binary.length; j++){
                            memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
                          }
    
                        }
                        else if(valueIndex < value.length){
                          data_address = auxAddr;
                          memory[index].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
                          i++;
                          for (var z = 0; z < 4; z++){
                            if(valueIndex < value.length){
                              (memory[index][i].Binary).push({Addr: data_address, DefBin: (value.charCodeAt(valueIndex)).toString(16), Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
                              valueIndex++;
                              data_address++;
                            }
                            else{
                              (memory[index][i].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                              data_address++;
                            }
                          }
    
                          memory[index][i].Value = "";
                          for (var j = 0; j < memory[index][i].Binary.length; j++){
                            memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
                          }
                        }
                      }
                    }
                  }
    
                  if (valueIndex == value.length){
                     this.keyboard = "";
                     consoleMutex = false;
                     mutexRead = false;
                     if (typeof app !== "undefined")
                         app._data.enter = null;
    
                    if (window.document)
    		    show_notification('The data has been uploaded', 'info') ;
    
                    if(executionIndex >= instructions.length){
                      for (var i = 0; i < instructions.length; i++) {
                           draw.space.push(i) ;
                      }
    
                      executionIndex = -2;
                      return packExecute(true, 'The execution of the program has finished', 'success', null);
                    }
                    else if (runExecution == false){
                             if (typeof app !== "undefined")
                                 app.executeProgram();
                    }
    
                    return;
                  }
    
                  var auxAddr = parseInt(addr);
    
                  while(valueIndex < value.length){
                    memory[index].push({Address: auxAddr, Binary: [], Value: "", DefValue: "", reset: false});
                    for (var z = 0; z < 4; z++){
                      if(valueIndex > value.length-1){
                        (memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: "00", Tag: null},);
                      }
                      else{
                        (memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
                        memory[index][i].Value = value.charAt(valueIndex) + " " + memory[index][i].Value;
                      }
                      auxAddr++;
                      valueIndex++;
                    }
                    i++;
                  }
    
                  if (typeof app !== "undefined")
                      app._data.memory[index] = memory[index];
    
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  if (typeof app !== "undefined")
                      app._data.enter = null;
    
                    if (window.document)
    		    show_notification('The data has been uploaded', 'info') ;
    
                  if(executionIndex >= instructions.length){
                    for (var i = 0; i < instructions.length; i++) {
                         draw.space.push(i) ;
                    }
    
                    executionIndex = -2;
                    return packExecute(true, 'The execution of the program has finished', 'success', null);
                  }
                  else if (runExecution == false){
                           if (typeof app !== "undefined")
                               app.executeProgram();
                  }
    
                  break;
                }
    
                break;

          case "sbrk":

               // TODO: review for command line

                var aux_addr = architecture.memory_layout[3].value;
    
                if ((architecture.memory_layout[3].value+parseInt(architecture.components[indexComp].elements[indexElem].value)) >= architecture.memory_layout[4].value) {
                    executionIndex = -1;
                    return packExecute(true, 'Not enough memory for data segment', 'danger', null);
                }
    
                for (var i = 0; i < ((parseInt(architecture.components[indexComp].elements[indexElem].value))/4); i++){
                  memory[memory_hash[0]].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: true});
                  for (var z = 0; z < 4; z++){
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: aux_addr, DefBin: "00", Bin: "00", Tag: null},);
                    aux_addr++;
                  }
                }
    
                if (typeof app !== "undefined")
                    app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
                architecture.memory_layout[3].value = aux_addr-1;
                this.architecture.memory_layout[3].value = aux_addr-1;
                break;

          case "exit":
                executionIndex = instructions.length + 1;
                break;

          case "print_char":
                var aux = architecture.components[indexComp].elements[indexElem].value;
                var aux2 = aux.toString(16);
                var length = aux2.length;
    
                var value = aux2.substring(length-2, length);
                if (typeof app !== "undefined")
                     app._data.display += String.fromCharCode(parseInt(value, 16));
                else process.stdout.write(value) ;
                break;

          case "read_char":

                // CL
                if (typeof app === "undefined") 
                {
		    var readlineSync = require('readline-sync') ;
		    var keystroke    = readlineSync.question(' read char> ') ;
                    var value        = keystroke.charCodeAt(0);

                    writeRegister(value, indexComp, indexElem);
                    return packExecute(false, 'The data has been uploaded', 'danger', null);
                }

               mutexRead = true;
               app._data.enter = false;
               console_log(mutexRead);
                if(newExecution == true){
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  if (runExecution == false){
                      app.executeProgram();
                  }
    
                  return;
                }

                if(consoleMutex == false){
                  setTimeout(this.syscall, 1000, "read_char", indexComp, indexElem, indexComp2, indexElem2);
                }
                else{
                  var value = (this.keyboard).charCodeAt(0);
                  writeRegister(value, indexComp, indexElem);
                  this.keyboard = "";
                  consoleMutex = false;
                  mutexRead = false;
                  app._data.enter = null;
    
    		  show_notification('The data has been uploaded', 'info') ;
    
                  console_log(mutexRead);
    
                  if(executionIndex >= instructions.length){
                    for (var i = 0; i < instructions.length; i++){
                         draw.space.push(i) ;
                    }
    
                    executionIndex = -2;
                    return packExecute(true, 'The execution of the program has finished', 'success', null);
                  }
                  else if (runExecution == false) {
                           app.executeProgram();
                  }
                }

                break;
        }
}

/*Divides a double into two parts*/
function divDouble(reg, index)
{
  var value = bin2hex(double2bin(reg));
  console_log(value);
  if(index == 0){
    return "0x" + value.substring(0,8);
  }
  if(index == 1) {
    return "0x" + value.substring(8,16);
  }
}

/*Reset execution*/
function reset ()
{
          executionIndex = 0;
          executionInit = 1;

          /*Reset stats*/
          totalStats = 0 ;
          if (typeof app !== "undefined")
              app._data.totalStats = 0 ;
          for (var i = 0; i < stats.length; i++){
            stats[i].percentage = 0;
            stats[i].number_instructions = 0;
            stats_value[i] = 0;
          }

          /*Reset console*/
          mutexRead = false;
          newExecution = true;

          for (var i = 0; i < architecture_hash.length; i++) {
            for (var j = 0; j < architecture.components[i].elements.length; j++) {
              if(architecture.components[i].double_precision == false){
                architecture.components[i].elements[j].value = architecture.components[i].elements[j].default_value;
              }

              else{
                var aux_value;
                var aux_sim1;
                var aux_sim2;

                for (var a = 0; a < architecture_hash.length; a++) {
                  for (var b = 0; b < architecture.components[a].elements.length; b++) {
                    if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[0]){
                      aux_sim1 = app.bin2hex(app.float2bin(architecture.components[a].elements[b].default_value));
                    }
                    if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[1]){
                      aux_sim2 = app.bin2hex(app.float2bin(architecture.components[a].elements[b].default_value));
                    }
                  }
                }

                aux_value = aux_sim1 + aux_sim2;
                architecture.components[i].elements[j].value = app.hex2double("0x" + aux_value);
              }
            }
          }

          architecture.memory_layout[4].value = backup_stack_address;
          architecture.memory_layout[3].value = backup_data_address;

          for (var i = 0; i < memory[memory_hash[0]].length; i++) {
            if(memory[memory_hash[0]][i].reset == true){
              memory[memory_hash[0]].splice(i, 1);
              i--;
            }
            else{
              memory[memory_hash[0]][i].Value = memory[memory_hash[0]][i].DefValue;
              for (var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++) {
                memory[memory_hash[0]][i].Binary[j].Bin = memory[memory_hash[0]][i].Binary[j].DefBin;
              }
            }
          }

          for (var i = 0; i < memory[memory_hash[2]].length; i++) {
            if(memory[memory_hash[2]][i].reset == true){
              memory[memory_hash[2]].splice(i, 1);
              i--;
            }
            else{
              memory[memory_hash[2]][i].Value = memory[memory_hash[2]][i].DefValue;
              for (var j = 0; j < memory[memory_hash[2]][i].Binary.length; j++) {
                memory[memory_hash[2]][i].Binary[j].Bin = memory[memory_hash[2]][i].Binary[j].DefBin;
              }
            }
          }

          unallocated_memory = [];
          if (typeof app !== "undefined")
              app._data.unallocated_memory = unallocated_memory;

          return true ;
}

/*
 *  Copyright 2018-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


  function bi_intToBigInt ( int_value, int_base )
  {
       var auxBigInt = null ;

       if (typeof bigInt !== "undefined")
            auxBigInt = bigInt(parseInt(int_value) >>> 0, int_base).value ;
       else auxBigInt = BigInt(parseInt(int_value) >>> 0, int_base) ;

       return auxBigInt ;
  }


function load_architecture ( arch_str )
{
    var ret = {} ;

    arch_obj = JSON.parse(arch_str) ;
    ret = load_arch_select(arch_obj) ;

    return ret ;
}

function assembly_compile ( code )
{
    var ret = {} ;

    code_assembly = code ;
    ret = assembly_compiler() ;
    if (ret.status == "error")
    {
        var mess = compileError[ret.errorcode] ;
        ret.msg = mess.mess1 + ret.token + mess.mess2 ;
    }
    if (ret.status == "ok")
    {
        ret.msg = 'Compilation completed successfully' ;
    }

    return ret ;
}


function execute_program ( limit_n_instructions )
{
    var ret = {} ;

    ret = executeProgramOneShot(limit_n_instructions) ;
    if (ret.error === true) 
    {
        ret.status = "ko" ;
        return ret ;
    }

    ret.status = "ok" ;
    return ret ;
}

function print_state ( )
{
    var elto_value  = null ;
    var elto_dvalue = null ;
    var elto_string = null ;

    var ret = {} ;
    ret.msg = "" ;
    ret.status = "ok" ;

    // dump registers
    for (var i=0; i<architecture.components.length; i++) 
    {
        for (var j=0; j<architecture.components[i].elements.length; j++) 
        {
            // get value + default value
            elto_value  = architecture.components[i].elements[j].value ;
            elto_dvalue = architecture.components[i].elements[j].default_value ;

            // skip default results
            if (typeof elto_dvalue == "undefined") {
                continue ;
            }
            if (elto_value == elto_dvalue) {
                continue ;
            }

            // value != default value => dumpt it
            elto_string = "0x" + elto_value.toString(16) ;
            if (architecture.components[i].type == "floating point") {
                elto_string = elto_value.toString() ;
            }
            ret.msg = ret.msg + architecture.components[i].elements[j].name + ":" + elto_string + "; ";
        }
    }

    // dump memory
    for (var i in memory) 
    {
        if ("instructions_memory" == i) {
             continue ; // instruction memory area stores high-level instructions
        }

        for (var j=0; j<memory[i].length; j++) 
        {
            elto_value  = memory[i][j].Value ;
            elto_dvalue = memory[i][j].DefValue ;

            if (elto_value != elto_dvalue) 
            {
                elto_string = "0x" + elto_value.toString(16) ;
                ret.msg = ret.msg + "memory[0x" + j.toString(16) + "]" + ":" + elto_string + "; ";
            }
        }
    }

    return ret ;
}


//
// Module interface
//

module.exports.load_architecture = load_architecture ;
module.exports.assembly_compile  = assembly_compile ;
module.exports.execute_program   = execute_program ;
module.exports.print_state       = print_state ;
