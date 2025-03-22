# lmulexp <= 1
# Test vlsseg
.data
values16: .half 0, 1, 2, 3, 4, 5, 6,-1,-1, 7, 8, 9, 10, 11, 12, 13,-1,-1, 14, 15, 16, 17, 18, 19, 20,-1,-1, 21, 22, 23, 24, 25, 26, 27,-1,-1, 28, 29, 30, 31

.text

main: 
    la t0 values16

    li t1 4
    vadd.vi v8 v8 13
    vadd.vi v0 v0 14



    vlsseg3e16.v v2 (t0) t1
    vlsseg3e16.v v8 (t0) t1 v0.t
