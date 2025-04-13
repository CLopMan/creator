.text
main:

    li t0 9

    vadd.vi v0 v0 7
    vadd.vi v1 v1 -1

    vand.vv v2 v1 v0
    vand.vv v3 v1 v0 v0.t

    vand.vx v4 v1 t0
    vand.vx v5 v1 t0 v0.t

    vand.vi v6 v1 13
    vand.vi v7 v1 13 v0.t
