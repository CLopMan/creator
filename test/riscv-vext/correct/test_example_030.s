
.text
main:

    li t0 12

    vadd.vi v0 v0 12
    vadd.vi v1 v1 5

    vxor.vv v2 v1 v0
    vxor.vv v3 v1 v0 v0.t

    vxor.vx v4 v1 t0
    vxor.vx v5 v1 t0 v0.t

    vxor.vi v6 v1 12
    vxor.vi v7 v1 12 v0.t
