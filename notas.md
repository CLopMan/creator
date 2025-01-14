vsetivli t0, a0, e8, m2, ta, ma
vsetivli t0, a0, e32, mf1, tu, mu
vsetivli t0, a0, e64, m3, ta, mu

intRegVecOperation(vl, vd, rs1, vs1, operation);




vwaddu.vv vd vs1 vs2 # 
vnaddu.vv vd vs1 vs2 # 


Hablar con felix de la memoria (llevar el indice hecho)
hablar con felix de las instrucciones de ensanchar y reducir


Problemas: 
- la definición de algunas instrucciones vectoriales está siendo distinta según los operandos => estandarizar al formato función como argumento? 