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

    vadc.vvm v3 v2 v1 v0
    vadc.vxm v4 v2 t0 v0
    vadc.vim v5 v2 2 v0

    vmadc.vvm v6 v9 v10 v0
    vmadc.vxm v7 v9 t1 v0
    vmadc.vim v8 v9 2 v0