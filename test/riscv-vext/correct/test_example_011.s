# lmulexp <= 1
# Test vloxei unmasked
.data
index: .byte 1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14
values8: .byte 0, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
values16: .half 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
values32: .word 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
values64: .word 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

.text

main: 
    la t2 index
    la t4 values8
    la t5 values16
    la t6 values32
    la a1 values64

    vle8.v v2 0(t2) # indexes
    vadd.vi v0 v0 7

    vloxei8.v v4 (t4) v2
    vloxei16.v v8 (t5) v2
    vloxei16.v v6 (t4) v2
    vloxei32.v v12 (t6) v2
    vloxei64.v v16 (a1) v2