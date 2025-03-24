# test vluxseg1ei16

.data
index: .byte    3, 0, 9, 6, 15, 12, 21, 18, 27, 24, 33, 30, 39, 36, 45, 42

values1: .half 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
               2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
               3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48

.text

main:
    la t2 index
    la t4 values1

    addi a0 x0 2013
    vle8.v v2 0(t2)
    vadd.vx v12 v12 a0
    vadd.vi v4 v4 13

    vadd.vi v0 v0 14

    vluxseg3ei16.v v4 (t4) v2 
    vluxseg3ei16.v v12 (t4) v2 v0.t