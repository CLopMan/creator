.text
main:
    li t0 16
    li t1 2
    vadd.vx v1 v1 t0
    vadd.vx v2 v2 t1
    vsub.vv v3 v1 v2 
    vsub.vi v3 v3 1 
    vadd.vi v3 v3 7