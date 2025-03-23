# test vluxseg1ei16

.data
index: .byte 1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14
values16: .half 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20

.text

main:
    la t2 index
    la t4 values16

    addi a0 x0 2013
    vle8.v v2 0(t2)
    vadd.vx v12 v12 a0
    vadd.vi v4 v4 13

    vadd.vi v0 v0 14

    vluxseg3ei16.v v4 (t4) v2 
    vluxseg3ei16.v v12 (t4) v2 v0.t