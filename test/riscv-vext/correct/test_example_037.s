.data 
mask: .byte 255, 255, 255, 255,
               255, 255, 255, 255,
               255, 255, 255, 255,
               255, 255, 255, 255 
.text
main:
    la a0 mask
    vl1re8.v v0 (a0)
    vadd.vi v2 v2 1
    vadd.vi v1 v1 2
    li t0 2
    li t1 255

    vadd.vx v9 v9 t1
    vadd.vx v10 v10 t1

#    vsbc.vvm v3 v2 v1 v0
#    vsbc.vxm v4 v2 t0 v0
#    vsbc.vim v5 v2 2 v0

    vmsbc.vvm v6 v9 v10 v0
    vmsbc.vxm v7 v9 t1 v0
    vmsbc.vim v8 v9 2 v0

    vadd.vi  v10 v10 -1
    vadd.vi  v11 v11 -1
    vadd.vi  v12 v12 -1

    vmsbc.vv v13 v10 v10
    vmsbc.vx v14 v11 t1
    vmsbc.vi v15 v12 -1