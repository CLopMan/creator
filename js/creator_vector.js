/**
 * Author: César López Mantecón
 * 
 * This file holds functionality to give support for Risc V V-extenssion 
 */

/**
 * This function transform an array to an hex number result of concatenation of every digit.
 * [3, 24, -1, 7] -> 0x00030018FFFF0007
 * @param {*} vec : array
 * @param {*} sew : selected element width
 * @param {*} vlen: vector length in bits
 * @returns hexadecimal string with every digit
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
            console.log("WARN! Not valid value for sew, >>>", sew);
    }
    let lmulValues = [-3, -2, -1, 0, 1, 2, 3];
    if (vma !== 0 && vma !== 1) {
        vill = 1;
        console.log("WARN! Not valid value for vma, >>>", vma)
    }
    if (vta !== 0 && vta !== 1) {
        vill = 1;
        console.log("WARN! Not valid value for vta, >>>", vta)
    }
    if (lmulValues.includes(lmulexp) !== true) {
        vill = 1;
        console.log("WARN! Not valid value for lmulexp, >>>", lmulexp);
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

function transformVectorToHex( vec, sew, vlen ) {
  let result = "";
  let n = vlen / sew; // vector size
  let hexDigits = sew / 4; // number of digits for hex representation
  let mask = Math.pow(2, sew) - 1; 
  //console.log(">>> look here ",n, ">> ", mask, " >> ", hexDigits);
  
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
 * Given a big int interprets it as a vector with sew witdth
 * @param {*} value BigInt readed from architecture
 * @param {*} sew : selected element width
 * @returns value transformed into array
 */
function readVector (value, sew) {
    const bitMask = BigInt(Math.pow(2, sew) - 1);
    const vlen = architecture.vlen;
    result = [];
    for (let i = 0; i < vlen/sew; ++i) {
      result.unshift(Number(value & bitMask));
      value >>= BigInt(architecture.sew);
    }
    //console.log(">>> ", result);
    return result;
}

// end of read write vectors

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

