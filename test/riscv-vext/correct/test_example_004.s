# masked operations
# lmulExp = 0

.text
main:
    vadd.vi v0 v0 7 # operar los primeros 3 elementos
    vadd.vi v1 v1 3
    vadd.vi v2 v2 2
    vadd.vv v3 v1 v2 v0.t
    vsub.vv v4 v1 v2 v0.t

    li t0 3
    vadd.vx v5 v5 t0 v0.t
    vsub.vx v6 v6 t0 v0.t
    vadd.vi v7 v7 -16 v0.t
    vsub.vi v8 v8 15 v0.t