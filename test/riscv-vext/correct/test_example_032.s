.text
main:

    li t0 3

    vadd.vi v0 v0 7
    vadd.vi v30 v30 2
    vadd.vi v1 v1 -8

    vsrl.vv v2 v1 v30
    vsrl.vv v3 v1 v30 v0.t

    vsrl.vx v4 v1 t0
    vsrl.vx v5 v1 t0 v0.t

    vsrl.vi v6 v1 3
    vsrl.vi v7 v1 3 v0.t

