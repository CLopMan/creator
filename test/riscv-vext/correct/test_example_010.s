# sew = 16 lmulexp <= 1
# test masked le se 64bits sized
.data
result: .word 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
.text

main: 
    la t0 result
    addi t1 x0 7

    vadd.vi v0 v0 3 # mask 3 primeros valores
    vadd.vi v2 v2 2
    vadd.vi v4 v4 4

    vle64.v v2 0(t0) v0.t # load with mask
    vle64.v v4 0(t0) # load without mask
