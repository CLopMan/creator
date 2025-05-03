.text
main:
    addi t0 t0 7
    vadd.vi v2 v2 6
    vadd.vi v4 v4 7

    addi t1 t1 -1

    vadd.vi v0 v0 7

    vwaddu.vv v8 v2 v4
    vwaddu.vx v12 v2 t0
    vwaddu.wv v16 v2 v4
    vwaddu.wx v20 v2 t0

    vwsubu.wx v26 v2 t1

    vwaddu.vv v24 v2 v4 v0.t
