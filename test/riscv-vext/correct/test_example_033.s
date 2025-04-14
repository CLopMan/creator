.text
main:

    li t0 2

    vadd.vi v0 v0 7
    vadd.vi v30 v30 2
    vadd.vi v1 v1 -8

    vsra.vv v2 v1 v30
    vsra.vv v3 v1 v30 v0.t

    vsra.vx v4 v1 t0
    vsra.vx v5 v1 t0 v0.t

    vsra.vi v6 v1 2
    vsra.vi v7 v1 2 v0.t