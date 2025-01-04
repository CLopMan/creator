.text
main:
    li t0 1 
    li t1 2
    vadd.vx v1 v1 t1
    vsub.vx v2 v1 t0
    vsub.vv v3 v2 v1
#    vadd.vv v3 v4 v5
#    vsub.vv v1 v1 v5