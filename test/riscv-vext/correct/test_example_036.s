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

    vadc.vvm v3 v2 v1 v0
    vadc.vxm v4 v2 t0 v0
    vadc.vim v5 v2 2 v0