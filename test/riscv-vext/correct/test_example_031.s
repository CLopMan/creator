
.text
main:

    li t0 3

    vadd.vi v0 v0 7
    vadd.vi v30 v30 3
    vadd.vi v1 v1 1

    vsll.vv v2 v1 v30
    vsll.vv v3 v1 v30 v0.t

    vsll.vx v4 v1 t0
    vsll.vx v5 v1 t0 v0.t

    vsll.vi v6 v1 3
    vsll.vi v7 v1 3 v0.t
