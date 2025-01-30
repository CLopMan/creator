# sew = 16 lmulexp <= 1
.data
result: .half -1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13, 14, -15, 16 
.text

main: 
    la t0 result
    addi t1 x0 7

    vadd.vi v0 v0 7
    vle16.v v2 0(t0) v0.t
    vse16.v v2 0(t0) v0.t
    ##vle16.v v4 0(t0)
