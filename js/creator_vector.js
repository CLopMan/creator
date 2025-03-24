/**
 * Author: César López Mantecón
 * 
 * This file holds functionality to give for Risc V V-extenssion 
 */


// Control registers

/**
 * This function allows updating vtype register easily
 * @param {*} vma mask agnostic
 * @param {*} vta tail agnistic
 * @param {*} sew single element width
 * @param {*} lmulexp exponent of lmul (lmul = 2^lmulexp)
 * 
 * @returns new vtype value
 */
function updateVtype(vma, vta, sew, lmulexp) {
    let vill  = 0;
    switch (sew) {
        case 8:
            sew = 0;
            break;
        case 16:
            sew = 1;
            break;
        case 32:
            sew = 2;
            break;
        case 64:
            sew = 3;
            break;
        default:
            vill = 1;
            console.log("WARN! Not valid value for sew:", sew);
    }
    let lmulValues = [-3, -2, -1, 0, 1, 2, 3];
    if (vma !== 0 && vma !== 1) {
        vill = 1;
        console.log("WARN! Not valid value for vma:", vma)
    }
    if (vta !== 0 && vta !== 1) {
        vill = 1;
        console.log("WARN! Not valid value for vta:", vta)
    }
    if (lmulValues.includes(lmulexp) !== true) {
        vill = 1;
        console.log("WARN! Not valid value for lmulexp:", lmulexp);
    }
    if (lmulexp < 0) {lmulexp = Math.pow(2, 3) + lmulexp;} // CA2 negative
    let vtype_obj = crex_findReg("vtype");
    let vtype = architecture.components[vtype_obj.indexComp].elements[vtype_obj.indexElem];
    let vlmul = lmulexp.toString(2).padStart(3, "0");
    let vsew = sew.toString(2).padStart(3, "0");;
    let vill_str= vill.toString(); // 1 o 0
    let vma_str = vma.toString(); // 1 o 0
    let vta_str = vta.toString(); // 1 o 0

    let reserved = "0";
    reserved = reserved.padStart(vtype.nbits - 1 - 8, "0");
    
    let binValue = vill_str + reserved + vma_str + vta_str + vsew + vlmul;
    ////console.log(">>>", binValue);
    let value = parseInt(binValue, 2);
    writeRegister(value, vtype_obj.indexComp, vtype_obj.indexElem);
    return value;
}

// Read and write vectors; 

/**
 * Transform an array to an hex number result of concatenation of every digit.
 * [3, 24, -1, 7] -> 0x00030018FFFF0007
 * If more than one register is needed (lmul > 1) will split it
 * @param {*} vec : array
 * @param {*} sew : selected element width
 * @param {*} vlen: vector length in bits
 * @param {*} start: vector index (lmul > 1)
 * @returns hexadecimal string with every digit
 */
function transformVectorToHex( vec, sew, vlen, start, ta, vl=checkVl() ) {
  let result = [];
  let n = vlen / sew; // vector size
  let hexDigits = sew / 4; // number of digits for hex representation
  let mask = BigInt(Math.pow(2, sew)) - BigInt(1); 
  //console.log(">>> look here ",n, ">> ", mask, " >> ", hexDigits);
  let vecIndex = start * n;

  //const vl = checkVl();
  if (ta) { // TODO: change condition to if agnostic
    //console.log(">>> check ta")
    vec = updateTailAgnostic(vec, vl);
    //console.log(">>> finish check ta")
  }

  // lmul fraccionario
  while (vec.length < n) {
    vec.push(0n);
  }
  //console.log (">>> transform to hex: ", vec) ;
  for (let i = vecIndex; i < n + vecIndex; ++i) {
    // correct number lenght
    vec[i] = BigInt(vec[i]) & mask;
    //console.log(">>> index", i, vec[i]);
    let hexNumber; 
    if (vec[i] < 0) {
      hexNumber = (mask + BigInt(1) + BigInt(vec[i])).toString(16);
    } else {
      hexNumber = vec[i].toString(16);
    }
    if (hexNumber.length < hexDigits) {
      hexNumber = hexNumber.padStart(hexDigits, '0')
    }
    ////console.log(">>>", hexNumber)
    result.unshift(hexNumber);
  }
  //console.log(">>> hex vector:", result);
  //console.log(">>> result:", result);
  return "0x" + result.join('');
}

/**
 * Given a big int interprets it as a vector with sew witdth
 * @param {*} value BigInt readed from architecture
 * @param {*} sew : selected element width
 * @returns array from value
 */
function valueToArray (value, sew) {
    const bitMask = BigInt(Math.pow(2, sew)) - BigInt(1);
    //const vlen = architecture.vlen;
    result = [];
    //for (let i = 0; i < vlen/sew; ++i) {
    while(value > 0) {
      result.push(readTo2C(BigInt(value & bitMask), sew));
      value >>= BigInt(sew);
    }
    //console.log(">>> ", result);
    return result;
}

// end of read write vectors

/**
 * read binary number in CA2
 * @param {*} number 
 * @param {*} bitsize 
 * @returns 
 */
function readTo2C(number, bitsize) {
  //console.log(">>> number: ", number);
  let mask = 1n << BigInt(bitsize - 1);
  //console.log(">>> masked",BigInt(number) & mask);
  if ((BigInt(number) & mask) !== 0n) {
    // negative
    //console.log(">>> negative",number);
    return BigInt(number) - (1n << BigInt(bitsize));
  }
  //console.log("return");
  return BigInt(number);

}


// TOOD: substitude this returns to check vtype register
//       when config instructions are done
//       also check will bit to raise exception if needed
/**
 * search for the value of vl register
 * @returns vl value
 */
function checkVl() {
  let ret = crex_findReg("vl");
  const vl = readRegister(ret.indexComp, ret.indexElem); 
  return vl;
}
function checkVlen() {
  return architecture.vlen;
}
function checkLMULEXP() {
  return architecture.lmulExp;
}
function checkSEW() {
  return architecture.sew;
}
function checkTA() {
  return architecture.ta;
}
function checkMA() {
  return architecture.ma;
}

/**
 * Aplies the described agnostic behaivour described in the estandar. Tail elements = 1
 * @param {*} vec 
 */
function updateTailAgnostic( vec, vl) {
  let copy = [...vec];
  for (let i = vl; i < vec.length; ++i) {
    copy[i] = -1n;
  }
  return copy;
}

/**
 * Reads a vector taking lmul into account
 * @param {*} indexElem 
 * @param {*} indexComp 
 * @param {*} lmulExp 
 * @param {*} sew 
 * @returns array representation of vector
 */
function readVector(indexComp, indexElem, lmulExp, sew, vlen) {
  let lmul = Math.pow(2, lmulExp);
  let vector;
  const vectorLenth = vlen/sew;
  //console.log(">>> lmul:", lmul);
  if (lmul >= 1) {
    vector = [];
    for (let i = 0; i < lmul; ++i) {
      let value = BigInt(architecture.components[indexComp].elements[indexElem + i].value);
      //console.log(">>> value reded:", value);
      let aux = valueToArray(value, sew);
      //aux = fillVector(aux, vlen, sew); 
      //console.log(">>>", aux, "will be fixed");
      aux = fixVectorLength(aux, vectorLenth);
      //console.log(">>> fix 2", aux)
      //console.log(">>> ", i, ":", aux);
      //console.log(">>> ", i, ":", aux);
      vector = vector.concat(aux);
      //console.log(">>> here is the problem - 197");
    }
  } else {
    // **acortar** los arrays o ponerles una marca?
    ////console.log(">>>", length);
    let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
    vector = valueToArray(value, sew);
    // vector = fillVector(vector, );
    vector = fixVectorLength(vector, vectorLenth);
  }
  //console.log(">>> Readed:", vector, indexComp, indexElem, architecture.components[indexComp].elements[indexElem].name);
  return vector
}

/**
 * write vector to register taking lmul into account 
 * @param {*} indexComp 
 * @param {*} indexElem 
 * @param {*} value 
 * @param {*} lmulExp 
 * @param {*} sew 
 * @param {*} vlen 
 * @returns hexadecimal representation of value
 */
function writeVector(indexComp, indexElem, value, lmulExp, sew, vlen, ta) {
  //console.log(">>> trying to write (value, indexComp, indexElem):", value, indexComp, indexElem, architecture.components[indexComp].elements[indexElem].name);
  let lmul = Math.pow(2, lmulExp);
  //console.log(">>> lmul = ", lmul);
  let hexValue;
  for (let i = 0; i < lmul; ++i) {
    hexValue = transformVectorToHex(value, sew, vlen, i, ta);
    architecture.components[indexComp].elements[indexElem + i].value = BigInt(hexValue);
    //////console.log(">>>", hexValue, " - ", i);
  }
  return hexValue;

}

/* Mask */
/**
 * Shortcut for extracting the mask
 * @param {*} vl 
 * @param {*} vlen 
 * @returns 
 */
function extractMaskFromV0(vl) {
  let v0Reg = crex_findReg("v0");
  return extractMask(v0Reg.indexComp, v0Reg.indexElem, vl)
}

/**
 * Extract the vl least significant bits as a mask 
 * @param {*} indexComp 
 * @param {*} indexElem 
 * @param {*} vl 
 * @param {*} vlen 
 * @returns mask array
 */
function extractMask(indexComp, indexElem, vl) {
  let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
  //console.log(">>> VALUE:", value.toString(2));
  let filter = (BigInt(Math.pow(2, vl)) - BigInt(1));
  //console.log(">>> filter", filter.toString(2));
  let maskValue = (value & filter);
  //console.log(">>> maskvalue", maskValue.toString(2));
  let mask = [];
  for (let i = 0; i < vl; ++i) {
    mask.push((maskValue >> BigInt(i)) & 1n);
  }
  return mask;
}

//TODO: CHANGE NAME TO ALIGN WITH API DEFINITION (CAPI.MD)
/**
 * masked execution of operation. Operation must be a function with this header:
 * operation(vd, vs1, vs2) where vd[i] = vs1 op vs2;
 * @param {*} vl 
 * @param {*} vs1 
 * @param {*} vs2 
 * @param {*} vd 
 * @param {*} opType arithmetic | store | load
 * @param {*} operation 
 * @param {*} ma 
 * @param {*} mask 
 * @returns vd new value
 */
function maskedOperation (vl, vs1, vs2, vd, operation = null, ma=checkMA(), mask=extractMaskFromV0(vl)) {
  let vecBackup = [...vd]; // copy array
  //console.log(">>>MASK:", mask)
  if (operation !== null) {
    operation (vd, vs1, vs2)
  }

  return applyMask(mask, ma, vd, vecBackup, vl);
}

function applyMask(mask, ma, vd, backup, vl) {
  let copy = [...vd];
  //console.log(">>> mask:", mask);
  for (let i = 0; i < vl; ++i) {
    if (!mask[i]) {
      if (ma) {
        copy[i] = -1n;
      } else {
        copy[i] = backup[i];
      }
    }
  }
  // TODO: add tail agnostic behaivour
  return copy;
}

/*Memory */

/**
 * Reads vector from memory
 * @param {*} addr 
 * @param {*} vl  vector length
 * @param {*} eew effective element width
 * @param {*} vlen 
 * @param {*} lmulExp 
 * @param {*} SEW  real selected-element-width
 * @returns 
 */
function readVectorFromMemory(addr, vl, eew, vlen, lmulExp, SEW=checkSEW()) {
  //console.log(">>>", vl, sew, vlen, lmulExp);
  let ret = [];
  let value_str = main_memory_read_nbytes(addr, vl*eew/8);
  let value_reversed = reverseStringValues(value_str, eew/4);
  //console.log(">>>value str: ", value_str);
  let readedValue = BigInt('0x' + value_reversed);
  //console.log(">>> vector16 reading", readedValue, "\n>>> ", main_memory_read_nbytes(addr, size/8));
  ret = valueToArray(readedValue, eew); // valorar volcarlo directamente a registro
  //console.log(">>> vec extracted:", ret);
  const lenght = (vlen / SEW) * Math.pow(2, lmulExp);
  return fixVectorLength(ret, lenght);
}

function reverseStringValues(str, k) {
  output = "";
  aux_list = str.split("").reverse();
  let i = 0;
  while (i < str.length) {
    output += aux_list.slice(i, i + k).reverse().join('');
    i += k;
  }
  return output;

}

function writeVectorToMemory(addr, size, vec, vl) {
  //console.log(">>> vec -> mem", vec);
  for (let i = 0; i < vl; ++i) {
      ret = main_memory_write_nbytes(addr + i*size, vec[i], size);
  }
  return ret;
}

/**
 * performs operation aplying mask 
 * @param {int} vl 
 * @param {*} addr 
 * @param {*} data_type 
 * @param {*} rd_name 
 * @param {*} op_type  load | store
 * @param {function} operation function
 * @param {*} value value to be stored in addr. Can be null in load operations.
 * @param {*} ma 
 * @param {*} mask 
 */
function maskedMemoryOperation (vl, addr, data_type, rd_name, op_type, value = null, ma=checkMA(), mask=extractMaskFromV0(vl)) {
  //console.log(">>>masked operation", op_type, data_type);
  let operation;
  let backup;
  switch (op_type) {
    case "store":
      operation = capi_mem_write;
      backup = main_memory_read_bydatatype(addr, data_type, vl*resolveSizeFromDataType(data_type)/2);
      operation(addr, applyMask(mask, ma, value, backup, vl), data_type, rd_name); // does not modify value
      //console.log(">>> memory writed", addr, " - ", main_memory_read_bydatatype(addr, data_type, vl*resolveSizeFromDataType(data_type)/2));
      break;
    case "load":
      operation = capi_mem_read;
      value = operation(addr, data_type, rd_name);
      //console.log(">>> readed value from memory", value);
      let reg_obj = crex_findReg(rd_name);
      backup = readRegister(reg_obj.indexComp, reg_obj.indexElem);
      return applyMask(mask, ma, value, backup, vl);
    default:
      console.log("ERROR: operation not recognised.Types available: {'store', 'load'}");
      break;
  }
  return 0;
}
/**
 * 
 * @param {string} data_type : vector<size>
 * 
 * @return {int} 
 */
function resolveSizeFromDataType (data_type) {
  switch (data_type) {
    case 'vector8':
      return 8;
    case 'vector16':
      return 16;
    case 'vector32':
      return 32;
    case 'vector64':
      return 64;

    default:
      console.log("WARN!! data type", data_type, "not allowed!");
      return -1;
  }

}

/**
 * 
 * @param {*} vs3 source values 
 * @param {*} vs2  indexes
 * @param {*} rs1 addr_base
 * @param {*} eew efective width
 * @param {*} vl vector lenght
 * @param {*} mask masked 
 * @returns 
 */
function vectorIndexStore(vs3, vs2, rs1, eew, vl, mask=null, ma=checkMA()) {
  if (mask == null) mask = new Array(vl).fill(1n);

  for (let i = 0; i < vl; ++i) {
    let addr = BigInt(rs1) + vs2[i];
    let value = vs3[i];
    if (mask[i] == 0) {
      value = (ma == 0) ? main_memory_read_nbytes(addr, eew/8) : -1n;
    }
    main_memory_write_nbytes(addr, vs3[i], eew/8);
  }

  return 0;
}

function vectorIndexLoad(vd, vs2, rs1, eew, vl, mask=null,ma=checkMA()) {
  if (mask == null) mask = new Array(vl).fill(1n);
  vd_copy = [...vd];
  for (let i = 0; i < vl; ++i) {
    let addr = BigInt(rs1) + vs2[i];
    let value = main_memory_read_nbytes(addr, eew/8);
    if (mask[i] == 0) {
      value = (ma == 0) ? vd[i] : -1n;
    }

    vd_copy[i] = value;
  }

  return vd_copy;

}

function vectorStridedStore(vs3, rs1, rs2, eew, vl, mask=null,ma=checkMA()) {
  if (mask == null) mask = new Array(vl).fill(1n);
  for (let i = 0; i < vl; ++i) {
    let addr = BigInt(rs1) + BigInt(i*rs2);
    let value = vs3[i]
    if (mask[i] == 0) {
      value = (ma == 0) ? main_memory_read_nbytes(addr, eew/8) : -1n;
    }
    main_memory_write_nbytes(addr, vs3[i], eew/8);
  }

  return 0;
}

function vectorStridedLoad(vd, rs1, rs2, eew, vl, mask=null, ma=checkMA()) {
  if (mask == null) mask = new Array(vl).fill(1n);
  vd_copy = [...vd];
  for (let i = 0; i < vl; ++i) {
    let addr = BigInt(rs1 + rs2*i);
    let value = main_memory_read_nbytes(addr, eew/8);
    if (mask[i] == 0) {
      value = (ma == 0) ? vd[i] : -1n;
    }

    vd_copy[i] = value;
  }

  return vd_copy;

}

/* INT - VEC OPERATIONS */

//TODO: CHANGE NAME TO ALIGN WITH API DEFINITION (CAPI.MD)
function vecIntOperationWrapperFactory(operation, sew=checkSEW()) {
  return function (vd, vs1, vs2) {
    return vecIntOperation(vd, vs1, vs2, operation, sew);
  }
}

//TODO: CHANGE NAME TO ALIGN WITH API DEFINITION (CAPI.MD)
function vecIntOperation(vd, vs1, rs1, operation, sew=checkSEW()) {
  //console.log(">>> vec int", vd, vs1, rs1, sew);
  let rs1_corrected = BigInt(rs1); // allows sew = 64
  //console.log(">>> rs1:", rs1_corrected);
  let mask = BigInt(Math.pow(2, sew)) - BigInt(1);
  //console.log(">>> mask", mask);
  return operation (vd, vs1, rs1_corrected & mask);
  

}

/* Miscellaneous */

/**
 * Compare two arrays 
 * @param {*} vec1 
 * @param {*} vec2 
 * @returns False if any element of vec1 is diferent from vec2
 */
function vectorNotEq( vec1, vec2 ) {
  //console.log(">> vecnoteq", vec1, vec2);
  for (let i = 0; i < vec1.length; ++i) {
    if (vec1[i] !== vec2[i]) return true;
  }
  //console.log(">>> vec not eq false")
  return false;
}

/**
 * This functions adds 0's at the end of vector untill vlen/sew lenght
 * @param {array} vector vector to be filled
 * 
 * @return {array} the same vector updated
 */
function fillVector(vector, vlen, sew) {
  let lenght = vlen/sew - vector.length;
  if (lenght > 0) {
    vector = vector.concat(new Array(lenght).fill(0n));
  }
  return vector;
}

function expandVector(vector, length) {
  if (length > vector.length) {
    vector = vector.concat(new Array(length - vector.length).fill(0n))
  }
  return vector;
}

/**
 * Truncates or expands a vector to have given lenght. When expand, 0's ard used as padding. 
 * @param {array} vector 
 * @param {*} lenght wanted length
 */
function fixVectorLength(vector, length) {
  //console.log(">>> fix vector length ", vector);
  if (vector.length >= length) { // truncates
    return vector.slice(0, length);
  } else {
    return vector.concat(new Array(length - vector.length).fill(0n));
  }
}