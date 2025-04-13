.text
main:

    li t0 12

    vadd.vi v0 v0 12
    vadd.vi v1 v1 5

    vor.vv v2 v1 v0
    vor.vv v3 v1 v0 v0.t

    vor.vx v4 v1 t0
    vor.vx v5 v1 t0 v0.t

    vor.vi v6 v1 12
    vor.vi v7 v1 12 v0.t
