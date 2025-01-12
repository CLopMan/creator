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
    //console.log(">>>", binValue);
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
function transformVectorToHex( vec, sew, vlen, start, ta ) {
  let result = "";
  let n = vlen / sew; // vector size
  let hexDigits = sew / 4; // number of digits for hex representation
  let mask = BigInt(Math.pow(2, sew)) - BigInt(1); 
  //console.log(">>> look here ",n, ">> ", mask, " >> ", hexDigits);
  let vecIndex = start * n;

  // lmul fraccionario
  while (vec.length < n) {
    vec.push(0n);
  }
  const vl = checkVl();
  if (ta) { // TODO: change condition to if agnostic
    updateTailAgnostic(vec, vl, sew);
  }
  
  
  for (let i = vecIndex; i < n + vecIndex; ++i) {
    let hexNumber; 
    if (vec[i] < 0) {
      hexNumber = (mask + BigInt(1) + BigInt(vec[i])).toString(16);
    } else {
      hexNumber = vec[i].toString(16);
    }
    if (hexNumber.length < hexDigits) {
      hexNumber = hexNumber.padStart(hexDigits, '0')
    }
    //console.log(">>>", hexNumber)
    result += hexNumber;
  }
  //console.log(">>> hex vector:", result);
  return "0x"+result;
}

/**
 * Given a big int interprets it as a vector with sew witdth
 * @param {*} value BigInt readed from architecture
 * @param {*} sew : selected element width
 * @returns array from value
 */
function valueToArray (value, sew) {
    const bitMask = BigInt(Math.pow(2, sew)) - BigInt(1);
    const vlen = architecture.vlen;
    result = [];
    for (let i = 0; i < vlen/sew; ++i) {
      result.unshift(readTo2C(BigInt(value & bitMask), sew));
      value >>= BigInt(architecture.sew);
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


/**
 * search for the value of vl register
 * @returns vl value
 */
function checkVl() {
  let ret = crex_findReg("vl");
  const vl = readRegister(ret.indexComp, ret.indexElem); 
  return vl;
}

/**
 * Aplies the described agnostic behaivour described in the estandar. Tail elements = 1
 * @param {*} vec 
 */
function updateTailAgnostic( vec, vl, sew ) {
  for (let i = vl; i < architecture.vlen/sew; ++i) {
    vec[i] = Math.pow(2, sew) - 1;
  }
}

// IDEA: tratamiento de agnostico o unchanged cuando generemos los valores a escribir en los vectores

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
  if (lmul >= 1) {
    for (let i = 0; i < lmul; ++i) {
      vector = [];
      let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
      //console.log(">>> here is the problem - 195");
      vector = vector.concat(valueToArray(value, sew));
      //console.log(">>> here is the problem - 197");
    }
  } else {
    // acortar los arrays o ponerles una marca?
    let length = vlen/sew * lmul;
    console.log(">>>", length);
    let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
    vector = valueToArray(value, sew);
    return vector.slice(0, length);
  }
  console.log(">>> Readed:", vector);
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
  console.log(">>> trying to write (value, indexComp, indexElem):", value, indexComp, indexElem, architecture.components[indexComp].elements[indexElem].name);
  let lmul = Math.pow(2, lmulExp);
  //console.log(">>> lmul = ", lmul);
  let hexValue;
  for (let i = 0; i < lmul; ++i) {
    hexValue = transformVectorToHex(value, sew, vlen, i, ta);
    architecture.components[indexComp].elements[indexElem + i].value = BigInt(hexValue);
    //console.log(">>>", hexValue, " - ", i);
  }
  return hexValue;

}

/* Miscellaneous */

/**
 * Compare two arrays 
 * @param {*} vec1 
 * @param {*} vec2 
 * @returns False if any element of vec1 is diferent from vec2
 */
function vectorNotEq( vec1, vec2 ) {
  for (let i = 0; i < vec1.length; ++i) {
    if (vec1[i] !== vec2[i]) return true;
  }
  return false;

}