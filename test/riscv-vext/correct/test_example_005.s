# masked operations
# sew = 64 lmulExp = 1
.text
main:
    vadd.vi v0 v0 7 # operar los primeros 3 elementos
    vadd.vi v2 v2 3
    vadd.vi v4 v4 2
    vadd.vv v6 v2 v4 v0.t
    vsub.vv v8 v2 v4 v0.t

    li t0 3
    vsub.vx v10 v10 t0 v0.t
    vadd.vx v12 v12 t0 v0.t
    vadd.vi v14 v14 -16 v0.t
    vsub.vi v16 v16 15 v0.t