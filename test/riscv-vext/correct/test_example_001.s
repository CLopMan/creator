# Example vadd.vx and vsub.vx
.text
main:
    li t0 1
    li t1 -1
    li t2 65535
    li t3 -32768
    vadd.vx v0 v0 t0
    vadd.vx v1 v1 t1
    vadd.vx v2 v2 t2
    vadd.vx v3 v3 t3

    vsub.vx v4 v4 t0
    vsub.vx v5 v5 t1
    vsub.vx v6 v6 t2
    vsub.vx v7 v7 t3