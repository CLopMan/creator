# sew = 16 lmulexp <= 1
# test masked le se byte sized
.data
result: .byte -1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13, 14, -15, 16 
.text

main: 
    la t0 result
    addi t1 x0 7

    vadd.vi v0 v0 7 # mask 3 primeros valores
    vadd.vi v2 v2 2 # mask 3 primeros valores
    vadd.vi v4 v4 4 # mask 3 primeros valores

    vle8.v v2 0(t0) v0.t # load with mask
    vle8.v v4 0(t0) # load without mask
