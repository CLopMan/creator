# test vsoxei

.data
index: .byte 1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14
values8:  .byte 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 
values16: .half 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 
values32: .word 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
values64: .word 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

values: .byte 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16

.text

main: 
    la t0 values

    la t2 index
    la t4 values8
    la t5 values16
    la t6 values32
    la a1 values64

    vadd.vi v0 v0 13 # first, third and forth element

    vle8.v v2 0(t2) # indexes

    vle8.v v4 0(t0) 
    vle8.v v6 0(t0) 
    vle8.v v8 0(t0) 
    vle8.v v12 0(t0)


    vsoxei8.v v4 (t4) v2 v0.t
    vle8.v v4 0(t4)

    vsoxei16.v v8 (t5) v2 v0.t
    vle16.v v8 0(t5)

    vsoxei32.v v10 (t6) v2 v0.t
    vle32.v v10 0(t6)

    vsoxei64.v v12 (a1) v2 v0.t
    vle64.v v12 0(a1)