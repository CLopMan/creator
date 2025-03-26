# lmulexp <= 1
# Test vsssege
.data
values16: .half  0,  1,  2,  3,  4,  5,  6,  7, 
                 8,  9, 10, 11, 12, 13, 14, 15, 
                16, 17, 18, 19, 20, 21, 22, 23, 
                24, 25, 26, 27, 28, 29, 30, 31, 
                32, 33, 34, 35, 36, 37, 38, 39

store16: .half 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd,
               0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd,
               0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd, 0xdddd

store16mask: .half 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB,
                   0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB,
                   0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB, 0xBBBB

mask: .byte 242, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 

.text

main: 
    la t0 values16
    la t1 mask

    la a0 store16
    la a1 store16mask

    li t3 19
    li t6 4

    vle8.v v0 0(t1)

    # prepare data
    vadd.vx v8 v8 t3
    
    vadd.vx v2 v2 t3



    vlse16.v v2 (t0) t6
    vlse16.v v8 (t0) t6 v0.t

    vsse16.v v2 (a0) t6
    vsse16.v v8 (a1) t6 v0.t

    vle16.v v12 0(a0)
    vle16.v v16 0(a1)

    vse16.v v8 0(a1)
    vle16.v v17 0(a1)
