# lmulexp <= 1
# test masked le se 32bits sized
.data
result: .word -1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13, 14, -15, 16 
store: .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
store_masked: .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
.text

main: 
    la t0 result
    addi t1 x0 7

    vadd.vi v0 v0 7 # mask 3 primeros valores
    vadd.vi v2 v2 2
    vadd.vi v4 v4 4

    vle32.v v2 0(t0) v0.t # load with mask
    vle32.v v4 0(t0) # load without mask

    la t1 store
    la t2 store_masked

    vse8.v v4 0(t1)
    vse8.v v4 0(t2) v0.t

    vle8.v v6 0(t1)
    vle8.v v8 0(t2)
