# sew = 16 lmulexp <= 1
# test masked se and le
.data
result: .half -1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13, 14, -15, 16 
result2: .half 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
.text

main: 
    la t0 result
    la t2 result2
    addi t1 x0 7

    vadd.vi v0 v0 7 # mask 3 primeros valores

    vle16.v v2 0(t0) v0.t # load with mask
    vle16.v v4 0(t0) # load without mask

    vse16.v v2 0(t2)
    vle16.v v6 0(t2)

    vse16.v v4 0(t2) v0.t
    vle16.v v8 0(t2)

# v8 and v6 must be equal