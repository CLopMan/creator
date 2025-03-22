# lmulexp <= 1
# Test vlseg
.data
values16: .half 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31

.text

main: 
    la t0 values16

    vadd.vi v8 v8 13
    vadd.vi v0 v0 14



    vlseg3e16.v v2 (t0)
    vlseg3e16.v v8 (t0) v0.t
