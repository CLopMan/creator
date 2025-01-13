# Example vadd.vv and vsub.vv

.text
main:
    li t0 65534
    vadd.vx v1 v1 t0
    vadd.vi v0 v0 1
    vadd.vv v2 v0 v1 # ffff...

    li t1 16 
    vadd.vx v3 v3 t1
    vadd.vi v4 v4 1
    vsub.vv v5 v3 v4