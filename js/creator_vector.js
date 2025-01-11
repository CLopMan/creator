/**
 * Author: César López Mantecón
 * 
 * This file holds functionality to give support for Risc V V-extenssion 
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
    console.log(">>>", binValue);
    let value = parseInt(binValue, 2);
    writeRegister(value, vtype_obj.indexComp, vtype_obj.indexElem);
    return value;
}

// Read and write vectors; 

/**
 * This function transform an array to an hex number result of concatenation of every digit.
 * [3, 24, -1, 7] -> 0x00030018FFFF0007
 * @param {*} vec : array
 * @param {*} sew : selected element width
 * @param {*} vlen: vector length in bits
 * @param {*} start: vector index (lmul > 1)
 * @returns hexadecimal string with every digit
 */
function transformVectorToHex( vec, sew, vlen, start ) {
  let result = "";
  let n = vlen / sew; // vector size
  let hexDigits = sew / 4; // number of digits for hex representation
  let mask = BigInt(Math.pow(2, sew)) - BigInt(1); 
  console.log(">>> look here ",n, ">> ", mask, " >> ", hexDigits);
  let vecIndex = start * n;
  
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
  console.log(">>> hex vector:", result);
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
function updateTailAgnostic( vec, sew ) {
  for (let i = checkVl(); i < architecture.vlen/sew; ++i) {
    vec[i] = Math.pow(2, sew) - 1;
  }
}

// IDEA: leer varios vectores a la vez en readRegister y WriteREgister para tener un único array de golpe según lmul
// IDEA: tratamiento de agnostico o unchanged cuando generemos los valores a escribir en los vectores

/**
 * Reads a vector taking lmul into account
 * @param {*} indexElem 
 * @param {*} indexComp 
 * @param {*} lmulExp 
 * @param {*} sew 
 * @returns array representation of vector
 */
function readVector(indexComp, indexElem, lmulExp, sew) {
  let lmul = Math.pow(2, lmulExp);
  let vector = []
  if (lmul >= 1) {
    for (let i = 0; i < lmul; ++i) {
      let value = BigInt(architecture.components[indexComp].elements[indexElem].value);
      vector = vector.concat(valueToArray(value, sew))
    }
  } else {
    // TODO: lmul fraccionario
    return 
  }
  return vector
}

function writeVector(indexComp, indexElem, value, lmulExp, sew, vlen) {
  let lmul = Math.pow(2, lmulExp);
  if (lmul >= 1) {
    for (let i = 0; i < lmul; ++i) {
      let hexValue = transformVectorToHex(value, sew, vlen, i);
      architecture.components[indexComp].elements[indexElem + i].value = BigInt(hexValue);
      console.log(">>>", hexValue, " - ", i);

    }

  } else {
    // TODO: lmul fraccionario
    return 
  }

}
