
/*
 *  Copyright 2018-2024 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
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


/*
 *  Register operations
 */


// TODO: substitude n to be the width of an element (sew) and extract vector size as vl / sew
/**
 * This function transform an array to an hex number result of concatenation of every digit.
 * [3, 24, -1, 7] -> 0x00030018FFFF0007
 * @param {*} vec : array
 * @param {*} n  : number of elements
 * @returns hexadecimal string with every digit
 */
function parseVector( vec, sew, vl ) {
  let result = "";
  let n = vl / sew; // vector size
  let hexDigits = sew / 4; // number of digits for hex representation
  let mask = Math.pow(2, sew) - 1; 
  console.log(">>> look here ",n, ">> ", mask, " >> ", hexDigits);
  for (let i = 0; i < n; ++i) {
    let hexNumber; 
    if (vec[i] < 0) {
      hexNumber = (mask + 1 + vec[i]).toString(16);
    } else {
      hexNumber = vec[i].toString(16);
    }
    if (hexNumber.length < hexDigits) {
      hexNumber = hexNumber.padStart(hexDigits, '0')
    }
    //console.log(">>>", hexNumber)
    result +=hexNumber;
  }

  return "0x"+result;
}
/**
 * 
 * @param {*} value BigInt readed from architecture
 * 
 * @returns value transformed into array
 */
function readVector (value) {
    const bitMask = BigInt(Math.pow(2, architecture.sew) - 1);
    let ret = crex_findReg("vl");
    const vl = readRegister(ret.indexComp, ret.indexElem); 
    result = [];
    for (let i = 0; i < vl/architecture.sew; ++i) {
      result.unshift(Number(value & bitMask));
      value >>= BigInt(16);
    }
    //console.log(">>> ", result);
    return result;
}

/**
 * searchs a register by name and returns its indexes
 * not needed
 * @param {*} regName 
 * @param {*} regBank 
 * @returns -1 if not found. [CompIndex, elemIndex] when found
 */
function search_register (regName, regBank) {
  for (let i = 0; i < architecture.components.length; ++i) {
    if (architecture.components[i].name == regBank) {
      let bank = architecture.components[i].elements;
      for (let j = 0; j < bank.length; ++j) {
        if (bank[j].name.indexOf(regName) !== -1) return [i, j];
      }
    }
  }

  return -1;

}

function crex_findReg ( value1 )
{
  var ret = {} ;

  ret.match = 0;
  ret.indexComp = null;
  ret.indexElem = null;

  if (value1 == "") {
    return ret;
  }

  for (var i = 0; i < architecture.components.length; i++)
  {
     for (var j = 0; j < architecture.components[i].elements.length; j++)
     {
        if (architecture.components[i].elements[j].name.includes(value1) !== false)
        {
          ret.match = 1;
          ret.indexComp = i;
          ret.indexElem = j;
          break ;
        }
     }
  }

  return ret ;
}

function crex_findReg_bytag ( value1 )
{
  var ret = {} ;

  ret.match = 0;
  ret.indexComp = null;
  ret.indexElem = null;

  if (value1 == "") {
    return ret;
  }

  for (var i = 0; i < architecture.components.length; i++)
  {
     for (var j = 0; j < architecture.components[i].elements.length; j++)
     {
        if (architecture.components[i].elements[j].properties.includes(value1) !== false)
        {
          ret.match = 1;
          ret.indexComp = i;
          ret.indexElem = j;
          break ;
        }
     }
  }

  return ret ;
}

function readRegister ( indexComp, indexElem, register_type )
{
  var draw = {
    space: [] ,
    info: [] ,
    success: [] ,
    danger: [],
    flash: []
  } ;

  if ((architecture.components[indexComp].elements[indexElem].properties.includes("read") !== true))
  {
    for (var i = 0; i < instructions.length; i++) {
      draw.space.push(i);
    }
    draw.danger.push(execution_index);

    throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name.join(' | ') +' cannot be read', 'danger', null);
  }

  if ((architecture.components[indexComp].type == "ctrl_registers") ||
      (architecture.components[indexComp].type == "int_registers") )
  {
    console_log(parseInt(architecture.components[indexComp].elements[indexElem].value));
    let value = architecture.components[indexComp].elements[indexElem].value;
    return parseInt(architecture.components[indexComp].elements[indexElem].value);
  }
  // read vector register extract to function
  if (architecture.components[indexComp].type == "vec_registers") {
    let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
    return readVector(value);
  }

  if (architecture.components[indexComp].type == "fp_registers")
  {
    if(architecture.components[indexComp].double_precision === false){
      //return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString()); //TODO: big_int2hex -> hex2float //TODO
      console_log(bi_BigIntTofloat(architecture.components[indexComp].elements[indexElem].value));
      return bi_BigIntTofloat(architecture.components[indexComp].elements[indexElem].value);
    }
    else{
      
      if (architecture.components[indexComp].double_precision_type == "linked") 
      {
        //return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString()); //TODO: big_int2hex -> hex2float //TODO
        console_log(bi_BigIntTodouble(architecture.components[indexComp].elements[indexElem].value));
        return bi_BigIntTodouble(architecture.components[indexComp].elements[indexElem].value);
      }
      else
      {
        if (typeof register_type === 'undefined'){
          register_type = "DFP-Reg";
        }
        if (register_type === 'SFP-Reg'){
          //return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString()); //TODO: big_int2hex -> hex2float //TODO
          console_log(bi_BigIntTofloat(architecture.components[indexComp].elements[indexElem].value));
          return bi_BigIntTofloat(architecture.components[indexComp].elements[indexElem].value);
        }
        if (register_type === 'DFP-Reg'){
          //return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString()); //TODO: big_int2hex -> hex2float //TODO
          console_log(bi_BigIntTodouble(architecture.components[indexComp].elements[indexElem].value));
          return bi_BigIntTodouble(architecture.components[indexComp].elements[indexElem].value);
        }
      }

    }

  }
}

function writeRegister ( value, indexComp, indexElem, register_type )
{
  console.log(">>> trying to write (value, indexComp, indexElem):", value, indexComp, indexElem, architecture.components[indexComp].elements[indexElem].name);
  
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

  if ((architecture.components[indexComp].type == "int_registers") ||
      (architecture.components[indexComp].type == "ctrl_registers"))
  {
    /***/
      if ((architecture.components[indexComp].elements[indexElem].properties.includes('write') !== true))
      {
        if ((architecture.components[indexComp].elements[indexElem].properties.includes('ignore_write') !== false)){
          return;
        }

        for (var i = 0; i < instructions.length; i++) {
           draw.space.push(i);
        }
        draw.danger.push(execution_index);

        throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name.join(' | ') +' cannot be written', 'danger', null);
      }
      architecture.components[indexComp].elements[indexElem].value = bi_intToBigInt(value,10);
      creator_callstack_writeRegister(indexComp, indexElem);

      if ((architecture.components[indexComp].elements[indexElem].properties.includes('stack_pointer') !== false) &&
          (value != parseInt(architecture.memory_layout[4].value))) {
            writeStackLimit(parseInt(bi_intToBigInt(value,10)));
      }

      if (typeof window !== "undefined") {
        btn_glow(architecture.components[indexComp].elements[indexElem].name, "Int") ;
      }
    /***/
  }
  if (architecture.components[indexComp].type == "vec_registers") {
    if ((architecture.components[indexComp].elements[indexElem].properties.includes('write') !== true))
      {
        if ((architecture.components[indexComp].elements[indexElem].properties.includes('ignore_write') !== false)){
          return;
        }

        for (var i = 0; i < instructions.length; i++) {
           draw.space.push(i);
        }
        draw.danger.push(execution_index);

        throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name.join(' | ') +' cannot be written', 'danger', null);
      }
      let vl = 128; // TODO: use search register to check the value before
      let parsedValue = parseVector(value, architecture.sew, vl); // concatenates every value in a 128 bit-length sequence
      //console.log(">>>", parsedValue, " - ", BigInt(parsedValue));

      architecture.components[indexComp].elements[indexElem].value = BigInt(parsedValue);

      creator_callstack_writeRegister(indexComp, indexElem);

      if ((architecture.components[indexComp].elements[indexElem].properties.includes('stack_pointer') !== false) &&
          (value != parseInt(architecture.memory_layout[4].value))) {
            writeStackLimit(parseInt(bi_intToBigInt(value,10)));
      }

      if (typeof window !== "undefined") {
        btn_glow(architecture.components[indexComp].elements[indexElem].name, "Int") ;
      }

  }

  else if (architecture.components[indexComp].type =="fp_registers")
  {
    if (architecture.components[indexComp].double_precision === false)
    {
      if ((architecture.components[indexComp].elements[indexElem].properties.includes('write') !== true))
      {
        if ((architecture.components[indexComp].elements[indexElem].properties.includes('ignore_write') !== false)){
          return;
        }
        draw.danger.push(execution_index);

        throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name.join(' | ') +' cannot be written', 'danger', null);
      }

      //architecture.components[indexComp].elements[indexElem].value = parseFloat(value); //TODO: float2bin -> bin2hex -> hex2big_int //TODO
      architecture.components[indexComp].elements[indexElem].value = bi_floatToBigInt(value);
      creator_callstack_writeRegister(indexComp, indexElem);

      if ((architecture.components[indexComp].elements[indexElem].properties.includes('stack_pointer') !== false) &&
          (value != parseInt(architecture.memory_layout[4].value))) {
            writeStackLimit(parseFloat(value));
      }

      updateDouble(indexComp, indexElem);

      if (typeof window !== "undefined") {
        btn_glow(architecture.components[indexComp].elements[indexElem].name, "FP") ;
      }
    }

    else if (architecture.components[indexComp].double_precision === true)
    {
      if ((architecture.components[indexComp].elements[indexElem].properties.includes('write') !== true))
      {
        if ((architecture.components[indexComp].elements[indexElem].properties.includes('ignore_write') !== false)){
          return;
        }
        draw.danger.push(execution_index);

        throw packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name.join(' | ') +' cannot be written', 'danger', null);
      }

      if (architecture.components[indexComp].double_precision_type == "linked") 
      {
        //architecture.components[indexComp].elements[indexElem].value = parseFloat(value); //TODO
        architecture.components[indexComp].elements[indexElem].value = bi_doubleToBigInt(value);
        updateSimple(indexComp, indexElem);
      }
      else
      {
        if (typeof register_type === 'undefined'){
          register_type = "DFP-Reg";
        }
        if (register_type === 'SFP-Reg'){
          architecture.components[indexComp].elements[indexElem].value = bi_floatToBigInt(value);
        }
        if (register_type === 'DFP-Reg'){
          architecture.components[indexComp].elements[indexElem].value = bi_doubleToBigInt(value);
        }
      }

      creator_callstack_writeRegister(indexComp, indexElem);

      if (typeof window !== "undefined") {
        btn_glow(architecture.components[indexComp].elements[indexElem].name, "DFP") ;
      }
    }
  }
}

/*Modifies double precision registers according to simple precision registers*/
function updateDouble(comp, elem)
{
  for (var i = 0; i < architecture.components.length; i++)
  {
    if (architecture.components[i].double_precision === true && architecture.components[i].double_precision_type == "linked")
    {
      for (var j = 0; j < architecture.components[i].elements.length; j++)
      {
        if (architecture.components[comp].elements[elem].name.includes(architecture.components[i].elements[j].simple_reg[0]) !== false){
          var simple = bin2hex(float2bin(readRegister(comp, elem)));
          var double = bin2hex(double2bin(readRegister(i, j))).substr(8, 15);
          var newDouble = simple + double;

          architecture.components[i].elements[j].value = bi_doubleToBigInt(hex2double("0x"+newDouble));
        }
        if (architecture.components[comp].elements[elem].name.includes(architecture.components[i].elements[j].simple_reg[1]) !== false){
          var simple = bin2hex(float2bin(readRegister(comp, elem)));
          var double = bin2hex(double2bin(readRegister(i, j))).substr(0, 8);
          var newDouble = double + simple;

          architecture.components[i].elements[j].value = bi_doubleToBigInt(hex2double("0x"+newDouble));
        }
      }
    }
  }
}

/*Modifies single precision registers according to double precision registers*/
function updateSimple ( comp, elem )
{
  if (architecture.components[comp].double_precision_type == "linked")
  {
    var part1 = bin2hex(double2bin(readRegister(comp, elem))).substr(0, 8);
    var part2 = bin2hex(double2bin(readRegister(comp, elem))).substr(8, 15);

    for (var i = 0; i < architecture.components.length; i++)
    {
      for (var j = 0; j < architecture.components[i].elements.length; j++)
      {
        if (architecture.components[i].elements[j].name.includes(architecture.components[comp].elements[elem].simple_reg[0]) !== false) {
          architecture.components[i].elements[j].value = bi_floatToBigInt(hex2float("0x"+part1));
        }
        if (architecture.components[i].elements[j].name.includes(architecture.components[comp].elements[elem].simple_reg[1]) !== false) {
          architecture.components[i].elements[j].value = bi_floatToBigInt(hex2float("0x"+part2));
        }
      }
    }
  }
}